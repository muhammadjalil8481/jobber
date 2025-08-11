import { config } from "@auth/config";
import { getAuthUserByEmail } from "@auth/services/auth.service";
import { signToken } from "@auth/services/helpers";
import {
  createFingerprint,
  IAuthDocument,
  IAuthPayload,
  NotAuthorizedError,
} from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";

export async function refreshToken(req: Request, res: Response) {
  const context = "refresh-token.ts/refreshToken()";
  const refreshToken = req.headers["x-refresh-token"] as string;
  if (!refreshToken) {
    console.log('no refreshtoken')
    throw new NotAuthorizedError("Unauthorized.", context);
  }

  const payload: IAuthPayload = verify(
    refreshToken,
    config.JWT_TOKEN_SECRET
  ) as IAuthPayload;

  const fingerprint = createFingerprint(req);
  console.log('fingerprints', fingerprint, payload.fingerprint)
  if (fingerprint !== payload.fingerprint) {
    throw new NotAuthorizedError("Unauthorized.", context);
  }

  const { email } = payload;
  if (!email) {
    throw new NotAuthorizedError("Unauthorized.", context);
  }

  const existingUser: IAuthDocument | null = await getAuthUserByEmail(email);
  
  if (!existingUser) {
    throw new NotAuthorizedError("Unauthorized.", context);
  }

  const tokenPaylod = {
    id: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    roleId: payload.roleId,
    fingerprint,
  };

  const newAccessToken: string = signToken(tokenPaylod, `15m`);
  const newRefreshToken: string = signToken(tokenPaylod, `7d`);

  res.status(StatusCodes.OK).json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    message: "Refresh token successful",
  });
}
