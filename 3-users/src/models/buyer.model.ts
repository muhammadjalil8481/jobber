import { IBuyerDocument } from "@muhammadjalil8481/jobber-shared";
import { model, Model, Schema } from "mongoose";

const buyerSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
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
    profilePicture: {
      type: String,
      required: false,
    },
    profilePublicId: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BuyerModel: Model<IBuyerDocument> = model<IBuyerDocument>(
  "Buyer",
  buyerSchema
);
export { BuyerModel };
