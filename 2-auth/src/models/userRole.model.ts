import { Optional, ModelDefined, DataTypes } from "sequelize";
import { sequelize } from "@auth/database/connection";
import { IUserRoleDocument } from "@muhammadjalil8481/jobber-shared";

export type UserRoleCreationAttributes = Optional<
  IUserRoleDocument,
  "id" | "createdAt" | "updatedAt"
>;

const UserRoleModel: ModelDefined<
  IUserRoleDocument,
  UserRoleCreationAttributes
> = sequelize.define(
  "user-roles",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
) as ModelDefined<IUserRoleDocument, UserRoleCreationAttributes>;

export { UserRoleModel };
