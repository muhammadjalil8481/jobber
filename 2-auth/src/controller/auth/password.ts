import {
  getAuthUserByPasswordToken,
  getAuthUserByUsername,
  getUserByUsernameOrEmail,
  updatePassword,
  updatePasswordToken,
} from "@auth/services/auth.service";
import {
  BadRequestError,
  IAuthDocument,
} from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { AuthModel } from "@auth/models/authUser.model";

export async function forgotPassword(
  req: Request,
  res: Response
): Promise<void> {
  const { username } = req.body;
  const existingUser: IAuthDocument | null = await getUserByUsernameOrEmail(
    username,
    username
  );
  if (!existingUser) {
    throw new BadRequestError(
      "Invalid credentials",
      "password.ts/forgotPassword()"
    );
  }

  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString("hex");

  const date: Date = new Date();
  date.setHours(date.getHours() + 1);
  await updatePasswordToken(existingUser.id!, randomCharacters, date);

  res.status(StatusCodes.OK).json({ message: "Password reset email sent." });
}

export async function resetPassword(
  req: Request,
  res: Response
): Promise<void> {
  const context = "password.ts/resetPassword()";
  const { newPassword, confirmPassword, token } = req.body;
  if (newPassword !== confirmPassword) {
    throw new BadRequestError("Passwords do not match", context);
  }

  const existingUser: IAuthDocument | null = await getAuthUserByPasswordToken(
    token as string
  );
  if (!existingUser) {
    throw new BadRequestError(
      "Password reset token is either invlid or has expired",
      context
    );
  }

  const compareWithCurrentPassword = await AuthModel.prototype.comparePassword(
    newPassword,
    existingUser.password!
  );

  if (compareWithCurrentPassword) {
    throw new BadRequestError(
      "New password cannot be the same as the current password",
      context
    );
  }

  await updatePassword(existingUser.id!, newPassword);

  res
    .status(StatusCodes.OK)
    .json({ message: "Password successfully updated." });
}

export async function changePassword(
  req: Request,
  res: Response
): Promise<void> {
  const context = "password.ts/changePassword()";
  const { currentPassword, newPassword } = req.body;

  const existingUser: IAuthDocument | null = await getAuthUserByUsername(
    `${req.currentUser?.username}`
  );
  if (!existingUser) {
    throw new BadRequestError("Invalid password", context);
  }

  const currentPasswordMatch = await AuthModel.prototype.comparePassword(
    currentPassword,
    existingUser.password!
  );

  if (!currentPasswordMatch) {
    throw new BadRequestError("Invalid password", context);
  }

  const compareWithCurrentPassword = await AuthModel.prototype.comparePassword(
    newPassword,
    existingUser.password!
  );

  if (compareWithCurrentPassword) {
    throw new BadRequestError(
      "New password cannot be the same as the current password",
      context
    );
  }

  await updatePassword(existingUser.id!, newPassword);

  res
    .status(StatusCodes.OK)
    .json({ message: "Password successfully updated." });
}
