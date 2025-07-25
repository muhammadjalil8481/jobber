import { config } from "@gateway/config";
import { log } from "@gateway/logger";
import { IAuthPayload } from "@muhammadjalil8481/jobber-shared";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const verifyUser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.signedCookies?.accessToken;
    if (accessToken) {
      const payload: IAuthPayload = verify(
        accessToken,
        config.JWT_TOKEN_SECRET!
      ) as IAuthPayload;
      req.currentUser = payload;
    }
  } catch (error) {
    log.error(
      "Gateway service verify user middleware error:",
      "auth.middleware.ts/verifyUser",
      error as Error
    );
  }
  next();
};

export { verifyUser };
