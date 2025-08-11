import { getRoleByName, getUserRole } from "@auth/services/roles.service";
import {
  BadRequestError,
  IAuthDocument,
} from "@muhammadjalil8481/jobber-shared";

export async function getUserRoleId(user: IAuthDocument, roleName: string) {
  const context = `getUserRoleId.ts/getUserRoleId()`;
  const userRoles = await getUserRole(user.id!);
  const userRole = await getRoleByName(roleName);
  if (!userRole) throw new BadRequestError(`Invalid Role ${userRole}`, context);
  const roleId = userRoles
    .map((userRole) => userRole.roleId)
    .find((id) => id === userRole!.id);
  return roleId;
}
