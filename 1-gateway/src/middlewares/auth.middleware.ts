import { config } from "@gateway/config";
import { log } from "@gateway/logger";
import { IAuthPayload } from "@muhammadjalil8481/jobber-shared";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import crypto from "crypto";

const verifyUser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.signedCookies?.accessToken;
    if (accessToken) {
      const payload: IAuthPayload = verify(
        accessToken,
        config.JWT_TOKEN_SECRET
      ) as IAuthPayload;
      const fingerprint = createFingerprint(req);
      if ((payload as any).fingerprint === fingerprint) {
        req.currentUser = payload;
      }
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

export function createFingerprint(req: Request): string {
  // Collect fingerprint components
  const components = {
    ua: req.headers["user-agent"] || "", // Browser/OS information
    // ip: req.ip, // Client IP address
    lang: req.headers["accept-language"] || "", // Language preferences
    enc: req.headers["accept-encoding"] || "", // Compression support
    dnt: req.headers["dnt"] || "", // Do Not Track status
  };

  // Create a stable string representation
  const fingerprintString = JSON.stringify(components);

  // Generate SHA-256 hash
  return crypto.createHash("sha512").update(fingerprintString).digest("hex");
}

export { verifyUser };
