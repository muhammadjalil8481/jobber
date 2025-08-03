import { Optional, ModelDefined, DataTypes } from "sequelize";
import { sequelize } from "@auth/database/connection";
import {
  IRolePermissionDocument,
} from "@muhammadjalil8481/jobber-shared";

export type RolePermissionCreationAttributes = Optional<
  IRolePermissionDocument,
  "id" | "createdAt" | "updatedAt"
>;

const RolePermissionModel: ModelDefined<
  IRolePermissionDocument,
  RolePermissionCreationAttributes
> = sequelize.define(
  "role-permissions",
  {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
) as ModelDefined<IRolePermissionDocument, RolePermissionCreationAttributes>;

export { RolePermissionModel };
