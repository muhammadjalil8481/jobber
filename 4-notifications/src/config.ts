import { createConfig } from "@muhammadjalil8481/jobber-shared";
import dotenv from "dotenv";

dotenv.config();

const envList = [
  "NODE_ENV",
  "PORT",
  "RABBITMQ_ENDPOINT",
  "CLIENT_URL",
  "SENDER_EMAIL_NAME",
  "SENDER_EMAIL",
  "SENDER_EMAIL_PASSWORD",
  "SMTP_HOST",
  "SMTP_PORT",
] as const;

export const config = createConfig(envList);
