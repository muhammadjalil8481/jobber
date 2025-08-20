import { ISellerGig } from "@muhammadjalil8481/jobber-shared/dist/types/interfaces/gig.interface";
import mongoose, { model, Model, Schema } from "mongoose";

const gigSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    basicTitle: { type: String, required: true },
    basicDescription: { type: String, required: true },
    categories: { type: String, required: true },
    subCategories: [{ type: String, required: true }],
    tags: [{ type: String }],
    active: { type: Boolean, default: true },
    expectedDelivery: { type: String, default: "" },
    expectedDeliveryInMinutes: { type: Number },
    ratingsCount: { type: Number, default: 0 },
    ratingSum: { type: Number, default: 0 },
    ratingCategories: {
      five: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      four: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      three: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      two: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      one: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
    },
    price: { type: Number, required: true},
    coverImage: { type: String, required: true },
    coverImageId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const GigModel: Model<ISellerGig> = model<ISellerGig>("Gig", gigSchema, "Gig");
export { GigModel };
