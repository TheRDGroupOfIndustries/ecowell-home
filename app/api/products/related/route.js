import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Products from "@/models/Products";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '3', 10);

  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  try {
    await connectToMongoDB();

    const relatedProducts = await Products.find({ 'category.title': category })
      .limit(limit)
      .select('title variants price salePrice discount ratings reviews_number');

    return NextResponse.json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}