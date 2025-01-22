import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToMongoDB from "@/utils/db";
import SpecialOfferProducts from "@/models/SpecialOfferProducts";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    await connectToMongoDB();

    const [specialOfferProducts, total] = await Promise.all([
      SpecialOfferProducts.find()
        .populate(
          "product",
          "_id sku title new category brand price salePrice discount variants ratings reviews_number isSingleVariantProduct"
        )
        .select("product index -_id")
        .sort({ index: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      SpecialOfferProducts.countDocuments(),
    ]);

    if (!specialOfferProducts.length) {
      return NextResponse.json(
        { message: "No special offer products found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      specialOfferProducts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore: page * limit < total,
      },
    });

    revalidatePath(request.url);

    return response;
  } catch (error) {
    console.error("Special offer products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch special offer products" },
      { status: 500 }
    );
  }
}
