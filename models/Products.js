import { Schema, model, models } from "mongoose";

const VariantSchema = new Schema({
  flavor: { type: String, required: true },
  images: { type: [String], required: true },
  stock: { type: Number, required: true },
  form: { type: String, enum: ["tablet", "powder", "liquid"], required: true },
  netQuantity: { type: String, required: true },
  nutritionFacts: { type: [String], required: true }, // E.g., ["Calories: 150", "Protein: 30g"]
  allergens: { type: [String], required: false }, // E.g., ["Peanuts", "Soy"]
  servingSize: { type: String, required: true }, // E.g., "30g scoop"
  // Add pack size options
  packSizes: [{
    size: { type: String, required: true }, // e.g., "PACK OF 2", "PACK OF 5"
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true }
  }]
});

const FaqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const AdditionalInfoSchema = new Schema({
  manufacturedBy: { type: String, required: true },
  countryOfOrigin: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  // Add certification information
  certifications: [{
    name: { type: String, required: true }, // e.g., "FSSAI", "GMP", "HACCP"
    image: { type: String, required: true }
  }]
});

const ProductSchema = new Schema(
  {
    sku: { type: String, required: true },
    title: { type: String, required: true },
    new: { type: Boolean, default: false },
    description: { type: String, required: true },
    category: {
      title: { type: String, required: true },
      slug: { type: String, required: true },
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    discount: { type: Number, required: false },
    sell_on_google_quantity: { type: Number, required: true },
    variants: [VariantSchema],
    // bestBefore: { type: Date, required: true },
    directions: { type: [String], required: true },
    ingredients: { type: [String], required: true },
    benefits: { type: [String], required: true },
    faqs: [FaqSchema],
    additionalInfo: AdditionalInfoSchema,
    ratings: { type: Number, default: 0 },
    reviews_number: { type: Number, default: 0 },

    // New fields based on the images
    ecoCoins: { type: Number, required: false }, // Reward points
    shippingOptions: {
      emiAvailable: { type: Boolean, default: false },
      cashOnDelivery: { type: Boolean, default: false },
      freeShippingMinAmount: { type: Number, required: false }
    },
    relatedProducts: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Products' },
      sortOrder: { type: Number, default: 0 }
    }],
    frequentlyBoughtTogether: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Products' },
      sortOrder: { type: Number, default: 0 }
    }],
    productFeatures: [{
      title: { type: String, required: true },
      icon: { type: String, required: true }
    }]
  },
  { timestamps: true }
);

const Product = models.Products || model("Products", ProductSchema);

export default Product;
