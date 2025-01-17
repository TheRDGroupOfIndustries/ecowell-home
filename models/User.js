import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      default: "user",
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: false,
    },
    phone_number: {
      type: String,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
      },
      required: false,
    },
    is_phone_verified: {
      type: Boolean,
      default: false,
    },
    first_name: {
      type: String,
      trim: true,
      required: false,
    },
    last_name: {
      type: String,
      trim: true,
      required: false,
    },
    profile_image: {
      type: String,
      required: true,
      default: "/public/pfp.png",
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: false,
    },
    flat_plot: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
      default: "India",
    },
    region_state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    zip_code: {
      type: String,
      required: false,
    },
    wishlist_products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;