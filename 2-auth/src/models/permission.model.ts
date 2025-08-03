import { Optional, ModelDefined, DataTypes } from "sequelize";
import { sequelize } from "@auth/database/connection";
import { IPermissionDocument } from "@muhammadjalil8481/jobber-shared";



export type PermissionCreationAttributes = Optional<
  IPermissionDocument,
  "id" | "createdAt" | "updatedAt"
>;

const PermissionModel: ModelDefined<
  IPermissionDocument,
  PermissionCreationAttributes
> = sequelize.define(
  "permissions",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
) as ModelDefined<IPermissionDocument, PermissionCreationAttributes>;

export { PermissionModel };
