import { AuthModel } from "@auth/models/authUser.model";
import { IAuthDocument } from "@muhammadjalil8481/jobber-shared";
import { Op, Transaction } from "sequelize";
import { omit } from "lodash";

export async function createUser(
  data: IAuthDocument,
  transaction?: Transaction
): Promise<IAuthDocument> {
  const result = await AuthModel.create(data, { transaction });
  const authUser = result.dataValues;
  const userData: IAuthDocument = omit(authUser, ["password"]);
  return userData;
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
