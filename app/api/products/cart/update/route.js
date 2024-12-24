import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Cart from "@/models/Cart";

export async function PUT(request) {
  const { userId, cartItemId, action, quantity, variant } =
    await request.json();

  console.log("requested data", userId, cartItemId, action, quantity, variant);

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

    console.log("cart item", cartItem);

    // ensuring that the variant price is a valid number before performing calculations
    const itemPrice = parseFloat(cartItem.variant?.price);
    if (isNaN(itemPrice)) {
      return NextResponse.json({
        error: "Invalid item price",
        status: 400,
      });
    }

    // updating totals by subtracting the current item's impact
    cart.totalQuantity -= cartItem.quantity;
    cart.totalPrice -= cartItem.quantity * itemPrice;

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

    // ensuring that quantity is a valid number before recalculating totals
    const validQuantity = parseInt(quantity, 10);
    if (isNaN(validQuantity) || validQuantity <= 0) {
      return NextResponse.json({
        error: "Invalid quantity",
        status: 400,
      });
    }

    // recalculating totals based on the updated cart item
    cart.totalQuantity += cartItem.quantity;
    cart.totalPrice += cartItem.quantity * itemPrice;

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
