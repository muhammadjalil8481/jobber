import {
  createUser,
  getUserByUsernameOrEmail,
} from "@auth/services/auth.service";
import {
  BadRequestError,
  IAuthDocument,
  lowerCase,
} from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import crypto from "crypto";
import { sequelize } from "@auth/database/connection";
import { StatusCodes } from "http-status-codes";

export async function signUp(req: Request, res: Response) {
  const context = "signup.ts/signUp()";
  const transaction = await sequelize.transaction();
  try {
    const { username, email, password, country } = req.body;

    const checkIfUserExist: IAuthDocument | null =
      await getUserByUsernameOrEmail(lowerCase(username), lowerCase(email));

    if (checkIfUserExist) {
      throw new BadRequestError(
        "Invalid credentials. Email or Username already exists.",
        context
      );
    }

    // Generate a 20 character random string for verifiction token and convert it to hexa decimal
    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString("hex");

    const authData: IAuthDocument = {
      username: lowerCase(username),
      email: email,
      password,
      country,
      emailVerificationToken: randomCharacters,
    } as IAuthDocument;

    const result: IAuthDocument = await createUser(authData, transaction);

    await transaction.commit();

    res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      data: result,
    });

    res.send("ok");
  } catch (error) {
    await transaction.rollback();
    throw error;
  } finally {
    if (!(transaction as { finished?: string }).finished) {
      await transaction.rollback();
    }
  }
}
