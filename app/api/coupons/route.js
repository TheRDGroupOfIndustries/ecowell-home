import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Coupon from "@/models/Coupon";

export async function GET(request, { params }) {
  try {
    await connectToMongoDB();

    const coupons = await Coupon.find();
    if (coupons.length === 0) {
      return NextResponse.json({ error: "No coupons found." }, { status: 404 });
    }

    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    console.error("Error in product detail API:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
