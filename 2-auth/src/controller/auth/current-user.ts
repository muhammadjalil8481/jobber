import { getAuthUserById } from "@auth/services/auth.service";
import { IAuthDocument } from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";

export async function getCurrentUser(
  req: Request,
  res: Response
): Promise<void> {
  let existingUser: IAuthDocument | null = await getAuthUserById(
    req.currentUser!.id
  );
  existingUser = omit(existingUser,["password"])
  res
    .status(StatusCodes.OK)
    .json({ message: "Authenticated user", data: existingUser });
}
