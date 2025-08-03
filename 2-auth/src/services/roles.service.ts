import {
  IRoleDocument,
  RoleCreationAttributes,
  RoleModel,
} from "@auth/models/role.model";
import {
  UserRoleCreationAttributes,
  UserRoleModel,
} from "@auth/models/userRole.model";
import { Transaction } from "sequelize";

export async function createRole(
  data: RoleCreationAttributes,
  transaction?: Transaction
): Promise<IRoleDocument> {
  const result = await RoleModel.create(data, { transaction });
  const role = result.dataValues;
  return role;
}

export async function getRoleByName(
  name: string
): Promise<IRoleDocument | null> {
  const role = await RoleModel.findOne({
    where: {
      name,
    },
  });
  return role?.dataValues || null;
}

export async function assignUserRole(
  data: UserRoleCreationAttributes,
  transaction: Transaction
) {
  const userRole = await UserRoleModel.create(
    {
      userId: data.userId,
      roleId: data.roleId,
    },
    {
      transaction,
    }
  );
  return userRole?.dataValues;
}

export async function getUserRole(userId: number) {
  const userRoles = await UserRoleModel.findAll({
    where: {
      userId,
    },
  });
  return userRoles?.map((userRole) => userRole.dataValues);
}
