import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Review from "@/models/Reviews";
import Product from "@/models/Products";

export async function GET(request, { params }) {
  const { productId } = params;

  try {
    await connectToMongoDB();

    const reviews = await Review.findOne({ product_id: productId });

    if (!reviews) {
      return NextResponse.json(
        { error: "No product reviews not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error in product detail API:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const { productId } = params;
  const { rating, review_descr, username, user_avatar, user_id } =
    await request.json();

  try {
    if (!rating || !review_descr || !username || !user_avatar || !user_id) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const newReviewData = {
      user_id,
      username,
      user_avatar,
      rating,
      review_descr,
    };

    let reviewDoc = await Review.findOne({ product_id: productId });

    if (!reviewDoc) {
      reviewDoc = new Review({
        product_id: productId,
        reviews: [newReviewData],
      });
    } else {
      reviewDoc.reviews.push(newReviewData);
    }

    const updatedProductReview = await reviewDoc.save();

    // Calculate new average rating
    const allReviews = updatedProductReview.reviews;
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;

    // Update product with new rating and increment reviews_number
    await Product.findByIdAndUpdate(productId, {
      $set: { ratings: averageRating.toFixed(1) },
      $inc: { reviews_number: 1 }
    });

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Review written successfully!",
        reviews: updatedProductReview?.reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in product review API:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { productId } = params;
  const { rating, review_descr, user_id } = await request.json();

  try {
    if (!rating || !review_descr || !user_id) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    // finding the review document and update the specific review in the reviews array
    const updatedReview = await Review.findOneAndUpdate(
      {
        product_id: productId,
        "reviews.user_id": user_id,
      },
      {
        $set: {
          "reviews.$.rating": rating,
          "reviews.$.review_descr": review_descr,
        },
      },
      { new: true }
    );

    if (!updatedReview) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Review not found",
        },
        { status: 404 }
      );
    }

    // Recalculate average rating after update
    const allReviews = updatedReview.reviews;
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;

    // Update product with new rating
    await Product.findByIdAndUpdate(productId, {
      $set: { ratings: averageRating.toFixed(1) }
    });

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Review updated successfully!",
        reviews: updatedReview.reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update review API:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { productId } = params;
  const { reviewId } = await request.json();

  try {
    if (!reviewId) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Review ID is required",
        },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const reviewDoc = await Review.findOne({ product_id: productId });
    if (!reviewDoc) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Review not found",
        },
        { status: 404 }
      );
    }

    // Remove the review
    reviewDoc.reviews = reviewDoc.reviews.filter(
      review => review._id.toString() !== reviewId
    );

    if (reviewDoc.reviews.length === 0) {
      // If no reviews left, delete the document and update product
      await Review.findOneAndDelete({ product_id: productId });
      await Product.findByIdAndUpdate(productId, {
        $set: { ratings: 0 },
        $inc: { reviews_number: -1 }
      });

      return NextResponse.json(
        {
          status: 200,
          success: true,
          message: "Review deleted successfully!",
          reviews: [],
        },
        { status: 200 }
      );
    }

    // Save updated reviews and recalculate average
    const updatedReview = await reviewDoc.save();
    const allReviews = updatedReview.reviews;
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;

    // Update product with new rating and decrement reviews_number
    await Product.findByIdAndUpdate(productId, {
      $set: { ratings: averageRating.toFixed(1) },
      $inc: { reviews_number: -1 }
    });

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Review deleted successfully!",
        reviews: updatedReview.reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in delete review API:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}