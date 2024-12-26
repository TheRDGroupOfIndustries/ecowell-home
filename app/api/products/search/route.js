import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Product from "@/models/Products";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    await connectToMongoDB();

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'category.title': { $regex: query, $options: 'i' } }
      ]
    }).select({
      _id: 1,
      sku: 1,
      title: 1,
      description: 1,
      category: 1,
      price: 1,
      salePrice: 1,
      variants: { $slice: 1 } // Only get the first variant
    }).limit(20); // Limit to 20 results for performance

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in products search API:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}