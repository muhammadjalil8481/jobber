import { Application } from "express";
import { log } from "./logger";
import { config } from "./config";

const SERVER_PORT = config.PORT || 4000;

function startServer(app: Application) {
  try {
    app.listen(SERVER_PORT, () => {
      log.info(`Gateway service running on port ${SERVER_PORT}`,'server.ts/startServer()');
    });
    
  } catch (error) {
    log.error(`Error starting server`,'server.ts/startServer()', error as Error);
    process.exit(1); // Exit the process if the server fails to start
  }
}

export { startServer };
