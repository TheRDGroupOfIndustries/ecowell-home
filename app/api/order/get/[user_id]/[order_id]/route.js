import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Order from "@/models/Order";
import Products from "@/models/Products";

export async function GET(request, { params }) {
  const { user_id, order_id } = params;

  console.log("user_id", user_id, order_id);

  try {
    await connectToMongoDB();

    const userOrders = await Order.findOne({ user_id }).populate({
      path: "orders.products.product_id",
      select: "_id title sku salePrice price variants",
      // model: "Products",
    });

    if (!userOrders) {
      return NextResponse.json(
        { error: "No user orders found." },
        { status: 404 }
      );
    }

    // finding the specific order from the orders array
    const specificOrder = userOrders.orders.find(
      (order) => order.order_info.order_id === order_id
    );

    if (!specificOrder) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json(specificOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to retrieve order, please refresh the page!" },
      { status: 500 }
    );
  }
}
