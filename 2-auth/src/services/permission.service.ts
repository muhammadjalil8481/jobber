import {
  PermissionCreationAttributes,
  PermissionModel,
} from "@auth/models/permission.model";
import {
  RolePermissionCreationAttributes,
  RolePermissionModel,
} from "@auth/models/rolePermission.model";
import {
  IPermissionDocument,
  IRolePermissionDocument,
} from "@muhammadjalil8481/jobber-shared";
import { QueryTypes, Transaction } from "sequelize";

export async function getPermissionByName(
  name: string
): Promise<IPermissionDocument | null> {
  const permission = await PermissionModel.findOne({
    where: {
      name,
    },
  });
  return permission?.dataValues || null;
}

export async function createPermission(
  data: PermissionCreationAttributes,
  transaction?: Transaction
): Promise<IPermissionDocument> {
  const result = await PermissionModel.create(data, { transaction });
  return result.dataValues;
}

export async function getRolePermission(
  roleId: number,
  permissionId: number
): Promise<IRolePermissionDocument | null> {
  const rolePermission = await RolePermissionModel.findOne({
    where: {
      roleId,
      permissionId,
    },
  });
  return rolePermission?.dataValues || null;
}

export async function assignRolePermission(
  data: RolePermissionCreationAttributes,
  transaction?: Transaction
) {
  const rolePermission = await RolePermissionModel.create(
    {
      permissionId: data.permissionId,
      roleId: data.roleId,
    },
    {
      transaction,
    }
  );
  return rolePermission?.dataValues;
}

export async function getRolePermissions() {
  const rolePermissions = await RolePermissionModel.sequelize?.query(
    `
    SELECT
        roleId,
        JSON_ARRAYAGG(p.name) AS permissions
    FROM
        \`role-permissions\` rp
    JOIN permissions p ON p.id = rp.permissionId
    GROUP BY
        roleId
    ORDER BY
        roleId ASC;
`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return rolePermissions || [];
}
