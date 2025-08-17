import { redisClient } from "@auth/server";
import { getAuthUserById } from "@auth/services/auth.service";
import { IAuthDocument } from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";

export async function getCurrentUser(
  req: Request,
  res: Response
): Promise<void> {
  let userId = req.currentUser!.id;
  const cacheKey = `auth_user:${userId}`;
  let existingUser: IAuthDocument | null;
  const checkUserInCache: string | null = await redisClient.get(cacheKey);
  if (checkUserInCache) {
    existingUser = JSON.parse(checkUserInCache);
  } else {
    existingUser = await getAuthUserById(userId);

    if (existingUser) {
      // Remove password
      existingUser = omit(existingUser, ["password"]);
      // 3. Store in Redis with TTL (e.g. 15 mins)
      await redisClient.setEx(cacheKey, 900, JSON.stringify(existingUser));
    }
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Authenticated user", data: existingUser });
}
