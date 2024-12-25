import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Cart from "@/models/Cart";
import Product from "@/models/Products";

export async function POST(request) {
  try {
    const { userId, productId, variant, quantity } = await request.json();
    // console.log(userId, productId, variant, quantity);

    if (!userId || !productId || !quantity) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields",
        status: 400,
      });
    }

    if (quantity <= 0) {
      return NextResponse.json({
        success: false,
        message: "Quantity must be greater than 0",
        status: 400,
      });
    }

    await connectToMongoDB();

    // // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
        status: 404,
      });
    }

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "_id title sku salePrice price variants",
    });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, variant }],
        totalQuantity: quantity,
        totalPrice: 0, // this will be calculated later
      });
    } else {
      // checking if the product already exists in the cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        // product exists, update the quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // product does not exist, add to cart
        cart.items.push({ productId, quantity, variant });
      }
    }

    // console.log("cart.items: ", cart.items);

    // calculating total quantity and total price
    cart.totalQuantity = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    // console.log("cart.items: ", cart.items);
    cart.totalPrice = await calculateTotalPrice(cart.items); // calling the function to calculate total price

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "_id title salePrice price sku variants"
    );

    console.log("updatedCart: ", updatedCart);

    return NextResponse.json({
      success: true,
      message: "Product added to cart successfully",
      status: 200,
      updatedCart,
    });
  } catch (error) {
    console.error("Error in cart operation:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
      status: error.status || 500,
    });
  }
}

const calculateTotalPrice = async (items) => {
  try {
    if (!items || !Array.isArray(items)) {
      throw new Error("Invalid items format");
    }

    let total = 0;
    for (const item of items) {
      let product;

      // Check if productId is already populated
      if (typeof item.productId === "object" && item.productId._id) {
        product = item.productId;
      } else {
        // Fetch product if not populated
        product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
      }

      // Ensure we have valid price values
      const price = Number(product.salePrice || product.price || 0);
      const quantity = Number(item.quantity || 0);

      if (isNaN(price) || isNaN(quantity)) {
        console.error("Invalid price or quantity:", {
          price,
          quantity,
          product,
        });
        throw new Error("Invalid price or quantity values");
      }

      total += price * quantity;
    }

    // Ensure the final total is a valid number
    if (isNaN(total) || !isFinite(total)) {
      throw new Error("Invalid total price calculation");
    }

    return Number(total.toFixed(2)); // Round to 2 decimal places
  } catch (error) {
    console.error("Error calculating total price:", error);
    throw error;
  }
};
