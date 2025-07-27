import { Application } from "express";
import { config } from "./config";
import { log } from "./logger";
import { checkDatabaseConnection } from "./database/connection";

const SERVER_PORT = config.PORT || 4002;

function startServer(app: Application) {
  try {
    app.listen(SERVER_PORT, () => {
      log.info(
        `Auth service running on port ${SERVER_PORT}`,
        "server.ts/startServer()"
      );
      checkDatabaseConnection();
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
