import { Optional, ModelDefined, DataTypes } from "sequelize";
import { sequelize } from "@auth/database/connection";
import { IRoleDocument } from "@muhammadjalil8481/jobber-shared";

export type RoleCreationAttributes = Optional<
  IRoleDocument,
  "id" | "createdAt" | "updatedAt"
>;

const RoleModel: ModelDefined<IRoleDocument, RoleCreationAttributes> =
  sequelize.define(
    "roles",
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
  ) as ModelDefined<IRoleDocument, RoleCreationAttributes>;

export { RoleModel, IRoleDocument };
