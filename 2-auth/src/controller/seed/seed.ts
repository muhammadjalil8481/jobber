import { Request, Response } from "express";
import crypto from "crypto";
import { faker } from "@faker-js/faker";
import {
  BadRequestError,
  firstLetterUppercase,
  IAuthDocument,
  lowerCase,
} from "@muhammadjalil8481/jobber-shared";
import { sample } from "lodash";
import { createUser } from "@auth/services/auth.service";
import { StatusCodes } from "http-status-codes";
import { config } from "@auth/config";
import { RoleCreationAttributes } from "@auth/models/role.model";
import { createRole, getRoleByName } from "@auth/services/roles.service";
import {
  permissionList,
  rolePermissionList,
  seedRolesList,
} from "@auth/constants";
import {
  assignRolePermission,
  createPermission,
  getPermissionByName,
  getRolePermission,
} from "@auth/services/permission.service";
import { PermissionCreationAttributes } from "@auth/models/permission.model";

export async function seedUsers(req: Request, res: Response): Promise<void> {
  if (config.NODE_ENV !== "development") {
    throw new BadRequestError("Bad Request", "seed.ts/seedUsers()");
  }
  const { count } = req.params;

  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));

  for (let i = 0; i < Number(count); i++) {
    const authData: IAuthDocument = {
      username: firstLetterUppercase(faker.internet.username()),
      email: lowerCase(faker.internet.email()),
      password: "qwerty",
      country: faker.location.country(),
      emailVerificationToken: randomBytes.toString("hex"),
      emailVerified: sample([0, 1]),
    } as IAuthDocument;

    await createUser(authData);
  }

  res.status(StatusCodes.OK).json({ message: "users seeded successfully." });
}

export async function seedRoles(_req: Request, res: Response): Promise<void> {
  if (config.NODE_ENV !== "development")
    throw new BadRequestError("Bad Request", "seed.ts/seedRoles()");

  for (let role of seedRolesList) {
    const checkRoleExists = await getRoleByName(role);
    if (checkRoleExists) continue;
    const roleData: RoleCreationAttributes = {
      name: role,
    };
    await createRole(roleData);
  }

  res.status(StatusCodes.OK).json({ message: "roles seeded successfully." });
}

export async function seedPermissions(
  _req: Request,
  res: Response
): Promise<void> {
  if (config.NODE_ENV !== "development")
    throw new BadRequestError("Bad Request", "seed.ts/seedPermissions()");

  for (let permission of permissionList) {
    const checkPermissionExists = await getPermissionByName(permission);
    if (checkPermissionExists) continue;
    const permissionData: PermissionCreationAttributes = {
      name: permission,
    };
    await createPermission(permissionData);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "permissions seeded successfully." });
}

export async function seedRolePermissions(
  _req: Request,
  res: Response
): Promise<void> {
  if (config.NODE_ENV !== "development")
    throw new BadRequestError("Bad Request", "seed.ts/seedPermissions()");

  for (const [role, resources] of Object.entries(rolePermissionList)) {
    const roleData = await getRoleByName(role);
    if (!roleData) continue;
    for (const [resouce, actions] of Object.entries(resources)) {
      for (const action of actions) {
        const permissionName = resouce + action;
        const permission = await getPermissionByName(permissionName);
        if (!permission) continue;
        const checkRolePermissionExists = await getRolePermission(
          roleData.id,
          permission.id
        );
        if (checkRolePermissionExists) continue;
        await assignRolePermission({
          roleId: roleData.id,
          permissionId: permission.id,
        });
      }
    }
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "role permissions seeded successfully." });
}
