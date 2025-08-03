import { createClient, RedisClientType } from "redis";
import { log } from "../logger";

const redisClient = createClient({
  url: "redis://localhost:6379", // or your docker host/port
});

redisClient.on("error", (err) => {
  log.error("Error connecting to redis", "redis.ts/error-callback", err);
});

async function createRedisConnection(): Promise<RedisClientType> {
  const context = "redis.ts/createRedisConnection()";
  let retries = 1;
  const maxRetries = 3;

  if (redisClient.isOpen) return redisClient as RedisClientType;

  while (retries <= maxRetries) {
    try {
      await redisClient.connect();
      log.info("Redis client connected successfully", context);
      return redisClient as RedisClientType;
    } catch (error) {
      log.error(
        `Error connecting to redis - attempt ${retries} of ${maxRetries}`,
        context,
        error as Error
      );

      retries++;
      if (retries > maxRetries) {
        log.error("Max Redis connection attempts exceeded", context);
        process.exit(1);
      }

      await new Promise((res) => setTimeout(res, 1000)); // Optional delay before retry
    }
  }

  throw new Error("Unexpected Redis connection failure"); // Fallback (shouldn't be reached)
}



export { createRedisConnection };
