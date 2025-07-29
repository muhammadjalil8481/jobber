import {
  getAuthUserByVerificationToken,
  updateVerifyEmailField,
} from "@auth/services/auth.service";
import {
  BadRequestError,
  IAuthDocument,
} from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function verifyEmail(req: Request, res: Response): Promise<void> {
  const { token } = req.body;
  const checkIfUserExist: IAuthDocument | null =
    await getAuthUserByVerificationToken(token);

  if (!checkIfUserExist) {
    throw new BadRequestError(
      "Verification token is either invalid or is already used.",
      "verify-email.ts/verifyEmail()"
    );
  }

  await updateVerifyEmailField(checkIfUserExist.id!, 1, "");

  res.status(StatusCodes.OK).json({ message: "Email verified successfully." });
}
