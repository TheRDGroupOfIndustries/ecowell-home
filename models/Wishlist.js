import { Schema, model, models } from "mongoose";

const wishlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
});

module.exports = models.Wishlist || model("Wishlist", wishlistSchema);
