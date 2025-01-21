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

    const productName = cartItem?.productId?.title;
    const productVariantFlavor = cartItem?.variant?.flavor;
    // console.log("cart item", cartItem);

    let message = "";

    // performing the requested action
    switch (action) {
      case "increment-quantity":
        if (cartItem.quantity >= cartItem.variant.stock) {
          return NextResponse.json({
            error: `Cannot add more items. Only ${cartItem.variant.stock} units available in stock.`,
            status: 400,
          });
        }
        cartItem.quantity += 1;
        message =
          productVariantFlavor === "none"
            ? `Quantity for "${productName}" incremented successfully.`
            : `Quantity for "${productVariantFlavor}" incremented successfully.`;
        break;

      case "decrement-quantity":
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          productVariantFlavor === "none"
            ? `Quantity for "${productName}" decremented successfully.`
            : `Quantity for "${productVariantFlavor}" decremented successfully.`;

          // message = `Quantity for "${cartItem.variant.flavor}" decremented successfully.`;
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

    await cart.save();
    const updatedCart = await Cart.findOne({ userId })
      .populate({
        path: "items.productId",
        select: "_id title sku salePrice price variants",
      })
      .sort({ ["createdAt"]: "desc" })
      .lean();

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
