import { createConfig } from "@muhammadjalil8481/jobber-shared";
import dotenv from "dotenv";

dotenv.config();

const envList = ["NODE_ENV", "PORT"] as const;

export const config = createConfig(envList);
