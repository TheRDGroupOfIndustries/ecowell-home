import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Products";

class OrderError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

async function validateProducts(products) {
  if (!products?.every((p) => p.variant_flavor && p.quantity && p.product_id)) {
    throw new OrderError(
      "Each product must have product_id, variant_flavor, and quantity."
    );
  }

  for (const product of products) {
    const dbProduct = await Product.findById(product.product_id);
    if (!dbProduct) {
      throw new OrderError(`Product ${product.product_id} not found`, 404);
    }

    const variant = dbProduct.variants.find(
      (v) => v.flavor === product.variant_flavor
    );
    if (!variant) {
      throw new OrderError(
        `Flavor ${product.variant_flavor} not found for product ${dbProduct.title}`,
        404
      );
    }

    if (variant.stock < product.quantity) {
      throw new OrderError(
        `Insufficient stock for ${dbProduct.title} of this ${variant.flavor} flavor`
      );
    }
  }
}

async function validateOrderData(data) {
  const {
    payment_method,
    user_id,
    total_price,
    order_date,
    first_name,
    last_name,
    phone,
    email,
    address,
    country,
    state,
    city,
    pincode,
    products,
  } = data;

  if (!["online", "cod"].includes(payment_method)) {
    throw new OrderError("Invalid payment method. Must be 'online' or 'cod'.");
  }

  if (
    !user_id ||
    !payment_method ||
    !total_price ||
    !order_date ||
    !first_name ||
    !last_name ||
    !phone ||
    !email ||
    !address ||
    !country ||
    !state ||
    !city ||
    !pincode ||
    !products ||
    products.length === 0
  ) {
    throw new OrderError("All fields are required.");
  }
}

export async function POST(request) {
  const {
    user_id,
    order_info: {
      payment_method,
      total_price,

      first_name,
      last_name,
      phone,
      email,
      address,
      country,
      state,
      city,
      pincode,

      order_date,
      delivery_date,
      shipping_date,
      cancelled_date,

      status,
    },
    products,
  } = await request.json();

  console.log(
    "order_info",
    {
      payment_method,
      total_price,

      first_name,
      last_name,
      phone,
      email,
      address,
      country,
      state,
      city,
      pincode,

      order_date,
      delivery_date,
      shipping_date,
      cancelled_date,

      status,
    },
    user_id,
    products
  );

  try {
    await connectToMongoDB();

    await validateOrderData({
      payment_method,
      user_id,
      total_price,
      order_date,
      first_name,
      last_name,
      phone,
      email,
      address,
      country,
      state,
      city,
      pincode,
      products,
    });

    await validateProducts(products);

    // Check if cart exists and has items
    const userCart = await Cart.findOne({ userId: user_id });
    if (!userCart || !userCart.items || userCart.items.length === 0) {
      throw new OrderError(
        "Your cart is empty. Please add items before placing an order."
      );
    }

    let order_id;
    let isUnique = false;

    while (!isUnique) {
      order_id = `ORD-${Date.now()}`;
      const existingOrder = await Order.findOne({
        "order_info.order_id": order_id,
      });
      if (!existingOrder) isUnique = true;
    }

    const newOrder = {
      order_info: {
        order_id,
        payment_method,
        first_name,
        last_name,
        total_price,
        order_date: new Date(order_date),
        delivery_date: delivery_date ? new Date(delivery_date) : undefined,
        shipping_date: shipping_date ? new Date(shipping_date) : undefined,
        cancelled_date: cancelled_date ? new Date(cancelled_date) : undefined,
        phone,
        email,
        address,
        city,
        state,
        country,
        pincode,
        status: status || "pending",
      },
      products: products.map((p) => ({
        product_id: p.product_id,
        variant_flavor: p.variant_flavor,
        quantity: p.quantity,
      })),
    };
    const userExists = await User.findOne({ _id: user_id });
    if (!userExists) {
      throw new OrderError("User doesn't exist.", 404);
    }

    let userOrder = await Order.findOne({ user_id });

    if (userOrder) {
      userOrder.orders.push(newOrder);
    } else {
      const user_name = userExists.first_name + " " + userExists.last_name;
      userOrder = new Order({
        user_id,
        user_name,
        orders: [newOrder],
      });
    }

    const updatedOrders = await userOrder.save();

    // updating variant-specific stock
    for (const product of products) {
      await Product.findOneAndUpdate(
        {
          _id: product.product_id,
          "variants.flavor": product.variant_flavor,
        },
        {
          $inc: {
            "variants.$.stock": -product.quantity,
            sell_on_google_quantity: -product.quantity,
          },
        }
      );
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: user_id },
      { $set: { items: [], totalQuantity: 0, totalPrice: 0 } },
      { new: true }
    );

    if (!cart) {
      throw new OrderError("Cart not found for this user.", 404);
    }

    revalidatePath(request.url);
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Order placed successfully",
      orderId: order_id,
      updatedOrders,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    // Rollback variant-specific stock if error occurs after quantity update
    if (products) {
      for (const product of products) {
        await Product.findOneAndUpdate(
          {
            _id: product.product_id,
            "variants.flavor": product.variant_flavor,
          },
          {
            $inc: {
              "variants.$.stock": product.quantity,
              sell_on_google_quantity: product.quantity,
            },
          }
        );
      }
    }

    return NextResponse.json({
      status: error.status || 500,
      success: false,
      error:
        error.message || "Failed to place the order. Please try again later.",
      details: error.message,
    });
  }
}
