import { config } from "@auth/config";
import { sign } from "jsonwebtoken";
import type { StringValue } from "ms";


export function signToken(payload: object, maxAge: StringValue): string {
  return sign(payload, config.JWT_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
}

