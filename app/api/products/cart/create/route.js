import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import connectToMongoDB from "@/utils/db";
import Cart from "@/models/Cart";
import Product from "@/models/Products";

export async function POST(request) {
  try {
    const { userId, productId, variant, quantity } = await request.json();
    // console.log("userId", userId, productId, variant, quantity);

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

    // Calculate both totalQuantity and totalPrice in one go
    cart.totalQuantity = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    await cart.save();

    // recalculating entire cart total price
    cart.totalPrice +=
      product?.salePrice * quantity || product?.price * quantity || 0;

    // cart.totalPrice = cart.items.reduce((total, item) => {
    //   const itemProduct = item.productId._id ? item.productId : product;

    //   // Get variant price if applicable
    //   let itemPrice = itemProduct.price || 0;
    //   if (item.variant && itemProduct.variants) {
    //     const variantData = itemProduct.variants.find(
    //       (v) => v.name === item.variant
    //     );
    //     if (variantData && variantData.price) {
    //       itemPrice = variantData.price;
    //     }
    //   }

    //   // Apply sale price if available
    //   if (itemProduct.salePrice && itemProduct.salePrice < itemPrice) {
    //     itemPrice = itemProduct.salePrice;
    //   }

    //   // Round to 2 decimal places to avoid floating-point issues
    //   return total + Number((itemPrice * item.quantity).toFixed(2));
    // }, 0);

    await cart.save();

    // cart.totalPrice = cart.items.reduce((total, item) => {
    //   const itemProduct = item.productId._id ? item.productId : product;

    //   const itemPrice = itemProduct.salePrice || itemProduct.price || 0;
    //   return total + itemPrice * item.quantity;
    // }, 0);

    await cart.save();

    const updatedCart = await Cart.findOne({ userId })
      .populate({
        path: "items.productId",
        select: "_id title sku salePrice price variants",
      })
      .sort({ ["createdAt"]: "desc" })
      .lean();

    revalidatePath(request.url);
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
