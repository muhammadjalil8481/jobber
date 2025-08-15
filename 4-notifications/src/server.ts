import { Application } from "express";
import { config } from "./config";
import { log } from "./logger";
import { Channel } from "amqplib";
import { createEventConnection } from "./events/connection";

const SERVER_PORT = config.PORT || 4003;
export let rabbitMQChannel: Channel;

function startServer(app: Application) {
  try {
    app.listen(SERVER_PORT, async () => {
      rabbitMQChannel = (await createEventConnection()) as Channel;
      log.info(
        `Notification service running on port ${SERVER_PORT}`,
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
