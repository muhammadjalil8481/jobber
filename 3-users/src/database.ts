import mongoose from "mongoose";
import { log } from "./logger";
import { config } from "./config";

async function databaseConnection(): Promise<void> {
  const context = "database.ts/databaseConnection()";
  try {
    await mongoose.connect(config.DATABASE_URL);
    log.info("Database connected successfully", context);
  } catch (err) {
    log.error(
      "Users Service databaseConnection() method error",
      context,
      err as Error
    );
  }
}

export { databaseConnection };
