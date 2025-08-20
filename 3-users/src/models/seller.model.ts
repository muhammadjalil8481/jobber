import { ISellerDocument } from "@muhammadjalil8481/jobber-shared";
import { model, Model, Schema } from "mongoose";

const sellerSchema: Schema = new Schema(
  {
    userId: { type: String, required: true,unique: true },
    buyerId: { type: String, required: true,unique: true },
    username: { type: String, required: true, index: true,unique: true },
    email: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, index: true },
    profilePicture: { type: String },
    profilePublicId: { type: String },
    description: { type: String, required: true },
    oneliner: { type: String, default: "" },
    country: { type: String, required: true },
    roles: {
      type: [Number],
      required: true,
      validate: {
        validator: function (arr: number[]) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: "At least one number is required in the scores array",
      },
    },
    languages: [
      {
        language: { type: String, required: true },
        level: { type: String, required: true },
      },
    ],
    skills: [
      {
        skill: { type: String, required: true },
        level: { type: String, required: true },
      },
    ],
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
    responseTime: { type: Number, default: 0 },
    recentDelivery: { type: Date, default: "" },
    experience: [
      {
        company: { type: String, default: "" },
        title: { type: String, default: "" },
        startDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
        description: { type: String, default: "" },
        currentlyWorkingHere: { type: Boolean, default: false },
      },
    ],
    education: [
      {
        country: { type: String, default: "" },
        university: { type: String, default: "" },
        title: { type: String, default: "" },
        major: { type: String, default: "" },
        year: { type: String, default: "" },
      },
    ],
    socialLinks: [{ type: String, default: "" }],
    certificates: [
      {
        name: { type: String },
        from: { type: String },
        year: { type: Number },
      },
    ],
    ongoingJobs: { type: Number, default: 0 },
    completedJobs: { type: Number, default: 0 },
    cancelledJobs: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    totalGigs: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SellerModel: Model<ISellerDocument> = model<ISellerDocument>(
  "Seller",
  sellerSchema
);
export { SellerModel };
