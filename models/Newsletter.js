import { Schema, model, models } from "mongoose";

// Define the Newsletter Schema
const NewsletterSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User ", // Reference to the User model
            required: true,
        },
        emails: {
            type: [String], // Array of email addresses
            required: true,
        },
    },
    { timestamps: true } // This will add `createdAt` and `updatedAt` fields automatically
);

// Create the Newsletter model
const Newsletter = models.Newsletter || model("Newsletter", NewsletterSchema);

export default Newsletter;