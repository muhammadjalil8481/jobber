import { Schema } from "mongoose";

const sellerSchema: Schema = new Schema({
  username: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  profilePicture: { type: String },
  profilePublicId: { type: String },
  description: { type: String, required: true },
  oneliner: { type: String, default: "" },
  country: { type: String, required: true },
  languages: [
    {
      language: { type: String, required: true },
      level: { type: String, required: true },
    },
  ],
  skills: [{ type: String, required: true }],
  ratingsCount: { type: Number, default: 0 },
});
