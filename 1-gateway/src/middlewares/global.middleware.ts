import { Application, Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import { config } from "@gateway/config";
import cookieParser from "cookie-parser";

function initializeGlobalMiddleware(app: Application) {
  // Compress response bodies for all requests
  app.use(
    compression({
      level: 6, // Set the compression level (0-9), where 0 is no compression and 9 is maximum compression,
      threshold: 1024, // Compress responses larger than 1KB,
      filter: (req: Request, res: Response) => {
        // Custom filter function to determine if a response should be compressed
        if (req.headers["x-no-compression"]) {
          // Don't compress responses if this header is present
          return false;
        }
        return compression.filter(req, res);
      },
    })
  );

  app.set("trust proxy", true); // Trust the first proxy (useful if your app is behind a reverse proxy like Nginx)

  app.use(cookieParser([config.SECRET_KEY_ONE, config.SECRET_KEY_TWO])); // <-- this is required

  // This middleware helps to prevent HTTP Parameter Pollution attacks
  app.use(
    hpp({
      whitelist: [],
    })
  );

  app.use(helmet());

  app.use(
    cors({
      origin: "",
      credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    })
  );
}

export { initializeGlobalMiddleware };
