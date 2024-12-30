import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import connectToMongoDB from "@/utils/db"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    await connectToMongoDB()

    const updatedUser = await User.findByIdAndUpdate(
      session.user._id,
      { $set: body },
      { new: true }
    ).select("-password")

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}