import { AuthModel } from "@auth/models/authUser.model";
import {
  getAuthUserByEmail,
  getAuthUserByUsername,
} from "@auth/services/auth.service";
import { createFingerprint, signToken } from "@auth/services/helpers";
import {
  BadRequestError,
  IAuthDocument,
  isEmail,
} from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";

export async function logIn(req: Request, res: Response) {
  const context = "login.ts/logIn()";
  const { username, password } = req.body;
  const isValidEmail: boolean = isEmail(username);

  const existingUser: IAuthDocument | null = isValidEmail
    ? await getAuthUserByEmail(username)
    : await getAuthUserByUsername(username);

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials", context);
  }

  const passwordsMatch: boolean = await AuthModel.prototype.comparePassword(
    password,
    `${existingUser.password}`
  );
  if (!passwordsMatch) {
    throw new BadRequestError("Invalid credentials", context);
  }

  const fingerprint = createFingerprint(req);

  const tokenPaylod = {
    id: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    fingerprint,
  };
  const accessToken: string = signToken(tokenPaylod, `15m`);
  const refreshToken: string = signToken(tokenPaylod, `7d`);

  const userData = omit(existingUser, ["password"]);

  res.status(StatusCodes.OK).json({
    data: userData,
    accessToken: accessToken,
    refreshToken: refreshToken,
    message: "User signed in successfully",
  });
}
