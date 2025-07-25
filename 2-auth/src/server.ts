import { Application } from "express";
import { config } from "./config";
import { log } from "./logger";

const SERVER_PORT = config.PORT || 4002;

function startServer(app: Application) {
  try {
  } catch (error) {
    log.error("Error Starting Server", 'server.ts/startServer()', error as Error);
  }
}

export { startServer };
