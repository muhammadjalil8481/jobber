import { config } from "@auth/config";
import { sign } from "jsonwebtoken";
import type { StringValue } from "ms";
import { Request } from "express";
import crypto from "crypto";

export function signToken(payload: object, maxAge: StringValue): string {
  return sign(payload, config.JWT_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
}

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
