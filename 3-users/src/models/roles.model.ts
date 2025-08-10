import { IRoleDocument } from "@muhammadjalil8481/jobber-shared";
import { model, Model, Schema } from "mongoose";

const roleSchema: Schema = new Schema(
  {
    roleId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RoleModel: Model<IRoleDocument> = model<IRoleDocument>(
  "Role",
  roleSchema
);
export { RoleModel };
