import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Order from "@/models/Order";
import Products from "@/models/Products";

export async function PUT(request) {
  const { user_id, order_id, updatedStatus } = await request.json();

  try {
    await connectToMongoDB();

    const userOrders = await Order.findOne({ user_id }).populate({
      path: "orders.products.product_id",
      select: "_id title sku salePrice price variants",
      // model: "Products",
    });

    if (!userOrders) {
      return NextResponse.json(
        { error: "No user orders found.", status: 404 },
        { status: 404 }
      );
    }

    const orderToUpdate = userOrders.orders.find(
      (order) => order.order_info.order_id === order_id
    );

    if (!orderToUpdate) {
      return NextResponse.json(
        { error: "Order not found.", status: 404 },
        { status: 404 }
      );
    }

    orderToUpdate.order_info.status = updatedStatus || "cancelled";
    orderToUpdate.order_info.cancelled_date = new Date();

    await userOrders.save();

    const updatedOrders = await Order.findOne({ user_id }).populate({
      path: "orders.products.product_id",
      select: "_id title sku salePrice price variants",
      // model: "Products",
    });

    return NextResponse.json(
      {
        updatedOrders,
        status: 200,
        success: true,
        message: "Order cancelled successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status. Please try again." },
      { status: 500 }
    );
  }
}
