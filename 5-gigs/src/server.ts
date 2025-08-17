import { Application } from "express";
import { config } from "./config";
import { log } from "./logger";
import { databaseConnection } from "./database";
import { createEventConnection } from "./events/connection";
import { Channel } from "amqplib";
import { RedisClientType } from "redis";
import { Redis } from "@muhammadjalil8481/jobber-shared";

const SERVER_PORT = config.PORT || 4002;
export let rabbitMQChannel: Channel;
let redisClient: RedisClientType;
export let getRedisClient = () => redisClient;

function startServer(app: Application) {
  try {
    app.listen(SERVER_PORT, async () => {
      await databaseConnection();
      rabbitMQChannel = (await createEventConnection()) as Channel;
      const redisInstance = new Redis(config.REDIS_ENDPOINT, log);
      redisClient =
        (await redisInstance.createRedisConnection()) as RedisClientType;
      log.info(
        `gigs service running on port ${SERVER_PORT}`,
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

export { startServer };
