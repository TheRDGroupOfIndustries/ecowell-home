import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Cart from "@/models/Cart";

export async function DELETE(request) {
  const { userId, cartItemId } = await request.json();

  try {
    await connectToMongoDB();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found", status: 404 });
    }

    const cartItem = cart.items.id(cartItemId);

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found", status: 404 });
    }

    const productName = cartItem.variant.flavor;

    // updating totalQuantity and totalPrice
    cart.totalQuantity -= cartItem.quantity;
    cart.totalPrice -= cartItem.quantity * cartItem.variant.price;

    cart.items.pull(cartItemId);

    const updatedCart = await cart.save();

    return NextResponse.json({
      message: `Cart ${productName} deleted successfully`,
      status: 200,
      updatedCart,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json({
      error: "Failed to delete cart item",
      status: 500,
    });
  }
}
