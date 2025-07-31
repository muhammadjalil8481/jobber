import { Application } from "express";
import { config } from "./config";
import { log } from "./logger";
import { databaseConnection } from "./database";

const SERVER_PORT = config.PORT || 4003;

function startServer(app: Application) {
  try {
    app.listen(SERVER_PORT, () => {
      log.info(
        `Users service running on port ${SERVER_PORT}`,
        "server.ts/startServer()"
      );
      databaseConnection();
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
