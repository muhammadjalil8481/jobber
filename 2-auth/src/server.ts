import { Application } from "express";
import { config } from "./config";
import { log } from "./logger";
import { checkDatabaseConnection } from "./database/connection";
import { Channel } from "amqplib";
import { createEventConnection } from "./events/connection";
import { cacheRolePermissions } from "./redis/cacheRolePermissions";
import { RedisClientType } from "redis";
import { Redis } from "@muhammadjalil8481/jobber-shared";

const SERVER_PORT = config.PORT || 4002;
export let rabbitMQChannel: Channel;
export let redisClient: RedisClientType;

function startServer(app: Application) {
  try {
    app.listen(SERVER_PORT, async () => {
      await checkDatabaseConnection();
      rabbitMQChannel = (await createEventConnection()) as Channel;
      const redisInstance = new Redis(config.REDIS_ENDPOINT, log);
      redisClient =
        (await redisInstance.createRedisConnection()) as RedisClientType;
      await cacheRolePermissions();
      log.info(
        `Auth service running on port ${SERVER_PORT}`,
        "server.ts/startServer()"
      );
    });
  } catch (error) {
    log.error(
      "Error Starting Server",
      "server.ts/startServer()",
      error as Error
    );
    process.exit(1); // Exit the process if the server fails to start
  }
}

function getRedisClient() {
  if (!redisClient) {
    throw new Error("Redis client not initialized yet.");
  }
  return redisClient;
}

export { startServer, getRedisClient };
