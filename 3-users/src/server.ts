import { Application } from "express";
import { config } from "./config";
import { log } from "./logger";
import { databaseConnection } from "./database";
import { Channel } from "amqplib";
import { createEventConnection } from "./events/connection";

const SERVER_PORT = config.PORT || 4002;
export let rabbitMQChannel: Channel;

function startServer(app: Application) {
  try {
    app.listen(SERVER_PORT, async () => {
      log.info(
        `Users service running on port ${SERVER_PORT}`,
        "server.ts/startServer()"
      );
      await databaseConnection();
      rabbitMQChannel = (await createEventConnection()) as Channel;
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
