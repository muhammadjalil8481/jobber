import { IRoleDocument } from "@muhammadjalil8481/jobber-shared";
import { RoleModel } from "@users/models/roles.model";

export const createRoleService = async (
  roleData: Partial<IRoleDocument>
): Promise<void> => {
  const checkIfRoleExist = await RoleModel.findOne({
    roleId: roleData.id,
  });
  if (!checkIfRoleExist) {
    await RoleModel.create({
      name: roleData.name,
      roleId: roleData.roleId,
    });
  }
};

export const getRoleByNameService = async (
  name: string
): Promise<IRoleDocument | null> => {
  const role: IRoleDocument | null = (await RoleModel.findOne({
    name,
  }).exec()) as IRoleDocument;
  return role;
};

export const getRoleByRoleIdService = async (
  roleId: number
): Promise<IRoleDocument | null> => {
  const role: IRoleDocument | null = (await RoleModel.findOne({
    roleId,
  }).exec()) as IRoleDocument;
  return role
};
