import express, { Application} from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import { config } from "@users/config";

export function initializeGlobalMiddleware(app: Application) {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  app.use(helmet());

  // This middleware helps to prevent HTTP Parameter Pollution attacks
  app.use(
    hpp({
      whitelist: [],
    })
  );

  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    })
  );
}
