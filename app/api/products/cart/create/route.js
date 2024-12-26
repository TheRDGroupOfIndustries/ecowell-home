import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Cart from "@/models/Cart";
import Product from "@/models/Products";

export async function POST(request) {
  try {
    const { userId, productId, variant, quantity } = await request.json();

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
        totalPrice: 0,
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, variant });
      }
    }

    // calculating total quantity
    cart.totalQuantity = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    await cart.save();

    // calculating total price
    const newTotalPrice =
      product.salePrice * quantity || product.price * quantity || 0;
    cart.totalPrice += newTotalPrice;

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "_id title salePrice price"
    );

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
