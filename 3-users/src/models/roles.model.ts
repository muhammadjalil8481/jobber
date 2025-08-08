import { IBuyerDocument } from "@muhammadjalil8481/jobber-shared";
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

const RoleModel: Model<IBuyerDocument> = model<IBuyerDocument>(
  "Role",
  roleSchema
);
export { RoleModel };
