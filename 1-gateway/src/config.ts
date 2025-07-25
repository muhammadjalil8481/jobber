import { createConfig } from "@muhammadjalil8481/jobber-shared";
import dotenv from "dotenv";

// The keys defined in the array must be passes or else error will be thrown

const envList = ["NODE_ENV", "PORT", "JWT_TOKEN_SECRET"] as const;

dotenv.config({ quiet: true });

export const config = createConfig(envList);
