import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import { config } from "@gigs/config";
import cloudinary from "cloudinary";


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

   cloudinary.v2.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET,
  });
}
