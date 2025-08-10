import mongoose from "mongoose";
import { log } from "./logger";
import { config } from "./config";

async function databaseConnection(): Promise<void> {
  const context = "database.ts/databaseConnection()";
  try {
    log.info(`Connecting to database. Url=${config.DATABASE_URL}`, context);
    await mongoose.connect(config.DATABASE_URL,{
      serverSelectionTimeoutMS: 5000,
      readPreference: 'primaryPreferred'
    });
    log.info("Database connected successfully", context);
  } catch (err) {
    log.error(
      "Users Service databaseConnection() method error",
      context,
      err as Error
    );
    process.exit(1)
  }
}

export { databaseConnection };
