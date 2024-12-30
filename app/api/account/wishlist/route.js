import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import Product from "@/models/Products";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToMongoDB();

    const user = await User.findById(session.user._id).populate('wishlist_products');

    return NextResponse.json({ wishlist: user.wishlist_products });
  } catch (error) {
    console.error("Error in wishlist API:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    await connectToMongoDB();

    const user = await User.findById(session.user._id);
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!user.wishlist_products.includes(productId)) {
      user.wishlist_products.push(productId);
      await user.save();
    }

    return NextResponse.json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error in wishlist API:", error);
    return NextResponse.json({ error: "Failed to add product to wishlist" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    await connectToMongoDB();

    const user = await User.findById(session.user._id);

    user.wishlist_products = user.wishlist_products.filter(id => id.toString() !== productId);
    await user.save();

    return NextResponse.json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error in wishlist API:", error);
    return NextResponse.json({ error: "Failed to remove product from wishlist" }, { status: 500 });
  }
}