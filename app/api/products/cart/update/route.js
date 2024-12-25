import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Cart from "@/models/Cart";

export async function PUT(request) {
  const { userId, cartItemId, action, quantity, variant } =
    await request.json();

  // console.log("requested data", userId, cartItemId, action, quantity, variant);

  try {
    await connectToMongoDB();

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "_id title sku salePrice price variants",
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found", status: 404 });
    }

    const cartItem = cart.items.id(cartItemId);

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found", status: 404 });
    }

    console.log("cart item", cartItem);

    let message = "";

    // performing the requested action
    switch (action) {
      case "increment-quantity":
        cartItem.quantity += 1;
        message = `Quantity for "${cartItem.variant.flavor}" incremented successfully.`;
        break;

      case "decrement-quantity":
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          message = `Quantity for "${cartItem.variant.flavor}" decremented successfully.`;
        } else {
          return NextResponse.json({
            error: "Quantity cannot be less than 1",
            status: 400,
          });
        }
        break;

      case "update-variant":
        if (!variant) {
          return NextResponse.json({
            error: "Variant data is required for updating variant",
            status: 400,
          });
        }
        cartItem.variant = variant;
        message = `Variant for "${cartItem.variant.flavor}" updated successfully.`;
        break;

      default:
        return NextResponse.json({
          error: "Invalid action",
          status: 400,
        });
    }

    const totals = cart.items.reduce(
      (acc, item) => {
        const price = item.productId.salePrice || item.productId.price;
        return {
          totalQuantity: acc.totalQuantity + item.quantity,
          totalPrice: acc.totalPrice + price * item.quantity,
        };
      },
      { totalQuantity: 0, totalPrice: 0 }
    );

    cart.totalQuantity = totals.totalQuantity;
    cart.totalPrice = totals.totalPrice;

    const updatedCart = await cart.save();

    return NextResponse.json({
      status: 200,
      message,
      updatedCart,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json({
      error: "Failed to update cart item",
      status: 500,
    });
  }
}