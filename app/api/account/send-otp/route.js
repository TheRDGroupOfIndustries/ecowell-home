import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { sendOtpToPhone } from "@/app/api/core";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { phone_number } = await req.json();

    const verification = await sendOtpToPhone(phone_number);

    if (verification) {
      return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
    }
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}