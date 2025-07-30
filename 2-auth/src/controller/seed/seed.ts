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

  res
    .status(StatusCodes.OK)
    .json({ message: "Seed users created successfully." });
}
