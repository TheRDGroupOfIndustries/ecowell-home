import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { verifyOtpFromPhone } from "@/app/api/core";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { phone_number, otp } = await req.json();

    const isOtpValid = await verifyOtpFromPhone(phone_number, otp);

    if (isOtpValid) {
      await connectToMongoDB();
      await User.findByIdAndUpdate(
        session.user._id,
        { $set: { is_phone_verified: true } }
      );

      return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}