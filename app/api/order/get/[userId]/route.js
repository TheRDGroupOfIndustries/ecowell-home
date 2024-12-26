import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";

export async function GET(request, { params }) {
  const { userId } = params;

  try {
    await connectToMongoDB();

    const userOrders = await Order.findOne({ user_id: userId }).populate({
      path: "orders.products.product_id",
      model: "Products",
      select: "_id title sku salePrice price variants",
    });

    if (!userOrders) {
      return NextResponse.json(
        { error: "No user orders found." },
        { status: 404 }
      );
    }

    return NextResponse.json(userOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to retrieve orders, please refresh the page!" },
      { status: 500 }
    );
  }
}
