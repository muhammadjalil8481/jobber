import {
  getAuthUserById,
  updateVerifyEmailField,
} from "@auth/services/auth.service";
import {
  BadRequestError,
  IAuthDocument,
} from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "@auth/database/connection";
import { publishUserCreationNotificationEvent } from "@auth/events/producer";

export async function resendVerificationEmail(
  req: Request,
  res: Response
): Promise<void> {
  const transaction = await sequelize.transaction();
  try {
    const { email } = req.body;
    const userId = req.currentUser!.id;
    const checkIfUserExist: IAuthDocument | null = await getAuthUserById(
      userId
    );
    if (!checkIfUserExist || email !== checkIfUserExist.email) {
      throw new BadRequestError(
        "Email is invalid",
        "resend-verification-email.ts/resendVerificationEmail()"
      );
    }

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString("hex");

    await updateVerifyEmailField(userId, 0, randomCharacters, transaction);

    const isUserCreationNotificationEventPublished =
      await publishUserCreationNotificationEvent(checkIfUserExist);

    if (!isUserCreationNotificationEventPublished)
      throw new Error(
        `Error is publishing user creation notification event - email : ${email}`
      );

    await transaction.commit();

    res.status(StatusCodes.OK).json({ message: "Email verification sent" });
  } catch (error) {
    await transaction.rollback();
    throw error;
  } finally {
    if (!(transaction as { finished?: string }).finished) {
      await transaction.rollback();
    }
  }
}
