import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Products from "@/models/Products";

export async function GET(request, context) {
  const { params } = context;

  try {
    await connectToMongoDB();

    const product = await Products.findById(params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in product detail API:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
