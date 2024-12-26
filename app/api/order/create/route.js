import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Products from "@/models/Products";

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

  // console.log(
  //   "order_info",
  //   {
  //     payment_method,
  //     total_price,

  //     first_name,
  //     last_name,
  //     phone,
  //     email,
  //     address,
  //     country,
  //     state,
  //     city,
  //     pincode,

  //     order_date,
  //     delivery_date,
  //     shipping_date,
  //     cancelled_date,

  //     status,
  //   },
  //   user_id,
  //   products
  // );

  // Validate payment method
  if (!["online", "cod"].includes(payment_method)) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Invalid payment method. Must be 'online' or 'cod'.",
    });
  }

  // Validate status if provided
  const validStatus = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  if (status && !validStatus.includes(status)) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Invalid order status.",
    });
  }

  // Validate products structure
  if (!products.every((p) => p.variant_flavor && p.quantity && p.product_id)) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Each product must have product_id, variant_flavor, and quantity.",
    });
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
    return NextResponse.json({
      status: 400,
      success: false,
      error: "All fields are required.",
    });
  }

  try {
    await connectToMongoDB();

    // Validate product availability and get product details
    // for (const product of products) {
    //   const dbProduct = await Products.findById(product.product_id);
    //   if (!dbProduct) {
    //     return NextResponse.json({
    //       status: 404,
    //       success: false,
    //       error: `Product ${product.product_id} not found`,
    //     });
    //   }
    //   if (dbProduct.quantity < product.quantity) {
    //     return NextResponse.json({
    //       status: 400,
    //       success: false,
    //       error: `Insufficient stock for product ${dbProduct.name}`,
    //     });
    //   }
    // }

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
      return NextResponse.json({
        status: 404,
        success: false,
        error: "User doesn't exists.",
      });
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

    // Update product quantities
    for (const product of products) {
      await Products.findByIdAndUpdate(product.product_id, {
        $inc: { quantity: -product.quantity },
      });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: user_id },
      { $set: { items: [], totalQuantity: 0, totalPrice: 0 } },
      { new: true }
    );

    if (!cart) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Cart not found for this user.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Order placed successfully",
      orderId: order_id,
      updatedOrders,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    // Rollback product quantities if error occurs after quantity update
    if (products) {
      for (const product of products) {
        await Products.findByIdAndUpdate(product.product_id, {
          $inc: { quantity: product.quantity },
        });
      }
    }

    return NextResponse.json({
      status: 500,
      success: false,
      error: "Failed to place the order. Please try again later.",
      details: error.message,
    });
  }
}
