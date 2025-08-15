import { AuthModel } from "@auth/models/authUser.model";
import { IAuthDocument } from "@muhammadjalil8481/jobber-shared";
import { Op, Transaction } from "sequelize";
import { omit } from "lodash";
import { hash } from "bcrypt";
import { getRoleById } from "./roles.service";
import { UserRoleModel } from "@auth/models/userRole.model";

export async function createUser(
  data: IAuthDocument,
  transaction?: Transaction
): Promise<IAuthDocument> {
  const result = await AuthModel.create(data, { transaction });

  const authUser = result.dataValues;
  const userData: IAuthDocument = omit(authUser, ["password"]);
  return userData;
}

export async function getAuthUserById(
  id: number
): Promise<IAuthDocument | null> {
  const user = await AuthModel.findOne({
    where: {
      id,
    },
  });
  return user?.dataValues || null;
}

export async function getUserByUsernameOrEmail(
  username: string,
  email: string
): Promise<IAuthDocument | null> {
  const user = await AuthModel.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
  return user?.dataValues || null;
}

export async function getAuthUserByUsername(
  username: string
): Promise<IAuthDocument | null> {
  const user = await AuthModel.findOne({
    where: {
      username,
    },
  });
  return user?.dataValues || null;
}

export async function getAuthUserByEmail(
  email: string
): Promise<IAuthDocument | null> {
  const user = await AuthModel.findOne({
    where: {
      email,
    },
  });
  return user?.dataValues || null;
}

export async function getAuthUserByVerificationToken(
  token: string
): Promise<IAuthDocument | null> {
  const user = await AuthModel.findOne({
    where: {
      emailVerificationToken: token,
    },
  });
  return user?.dataValues || null;
}

export async function getAuthUserByPasswordToken(
  token: string
): Promise<IAuthDocument | null> {
  const user = await AuthModel.findOne({
    where: {
      passwordResetToken: token,
    },
  });
  return user?.dataValues || null;
}

export async function updateAuthUserRole(email: string, roleIds: number[]) {
  const context = `auth.service.ts/updateAuthUserRole()`;
  const user = await getAuthUserByEmail(email);
  if (!user)
    throw new Error(`User not found - email ${email} context ${context}`);

  for (let roleId of roleIds) {
    const role = await getRoleById(roleId);
    if (!role)
      throw new Error(`Role not found - id ${roleId} context ${context}`);

    const userRoleExists = await UserRoleModel.findOne({
      where: {
        userId: user.id,
        roleId,
      },
    });
    if (userRoleExists) continue;

    await UserRoleModel.create({
      userId: user.id!,
      roleId,
    });
  }
}

export async function updateVerifyEmailField(
  id: number,
  emailVerified: number,
  emailVerificationToken: string,
  transaction?: Transaction
) {
  await AuthModel.update(
    { emailVerificationToken, emailVerified },
    {
      where: {
        id,
      },
      transaction,
    }
  );
}

export async function updatePasswordToken(
  id: number,
  token: string,
  tokenExpiration: Date
): Promise<void> {
  await AuthModel.update(
    { passwordResetToken: token, passwordResetExpires: tokenExpiration },
    {
      where: {
        id,
      },
    }
  );
}

export async function updatePassword(
  id: number,
  password: string
): Promise<void> {
  const hashedPassword = await hash(password, 10);
  await AuthModel.update(
    {
      password: hashedPassword,
      passwordResetToken: "",
      passwordResetExpires: null,
    },
    {
      where: {
        id,
      },
    }
  );
}
