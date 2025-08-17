import { createConfig } from "@muhammadjalil8481/jobber-shared";
import dotenv from "dotenv";

dotenv.config();

const envList = [
  "NODE_ENV",
  "PORT",
  "API_GATEWAY_URL",
  "DATABASE_URL",
  "RABBITMQ_ENDPOINT",
  "REDIS_ENDPOINT",
  "CLOUD_NAME",
  "CLOUD_API_KEY",
  "CLOUD_API_SECRET",
] as const;

export const config = createConfig(envList);
