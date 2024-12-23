import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/utils/db";
import Products from "@/models/Products";

export const GET = async (request) => {
  try {
    await connectToMongoDB();

    const products = await Products.find({});

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
