import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "@chat/config";
import hpp from "hpp";

export function initializeGlobalMiddleware(app: Application) {
  // Only uncomment if you need clients real ip
  // app.set("trust proxy", true);
  // app.use(compression());
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
