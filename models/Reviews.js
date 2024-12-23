import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    user_avatar: {
      type: String,
      required: true,
      default: "/assets/images/user.png",
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    review_descr: { type: String, required: true },
  },
  { timestamps: true }
);

const reviewsSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

reviewsSchema.index({ product_id: 1 });

const Review = models.Review || model("Review", reviewsSchema);

export default Review;
