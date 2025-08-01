import {
  createUser,
  getUserByUsernameOrEmail,
} from "@auth/services/auth.service";
import {
  BadRequestError,
  createFingerprint,
  IAuthDocument,
  isEmail,
  lowerCase,
} from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import crypto from "crypto";
import { sequelize } from "@auth/database/connection";
import { StatusCodes } from "http-status-codes";
import { AuthModel } from "@auth/models/authUser.model";
import {
  getAuthUserByEmail,
  getAuthUserByUsername,
} from "@auth/services/auth.service";
import { signToken } from "@auth/services/helpers";
import { omit } from "lodash";
import { publishUserCreationEvent } from "@auth/events/producer";

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

    const isUserCreationEventPublished = await publishUserCreationEvent(result);

    if (!isUserCreationEventPublished)
      throw new Error(
        `Error is publishing user creation event - email : ${email}`
      );

    await transaction.commit();

    res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  } finally {
    if (!(transaction as { finished?: string }).finished) {
      await transaction.rollback();
    }
  }
}

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
