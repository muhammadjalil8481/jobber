import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "@auth/config";
import { IAuthPayload } from "@muhammadjalil8481/jobber-shared";
import { verify } from "jsonwebtoken";
import hpp from "hpp";


export function initializeGlobalMiddleware(app: Application) {
  // Only uncomment if you need clients real ip
  // app.set("trust proxy", true);
  app.use(hpp());
  // app.use(compression());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  app.use(helmet());

  // This middleware helps to prevent HTTP Parameter Pollution attacks
  app.use(
    hpp({
      whitelist: [],
    })
  )

  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    })
  );

  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")?.[1];
      const payload: IAuthPayload = verify(
        token,
        config.JWT_TOKEN_SECRET
      ) as IAuthPayload;
      req.currentUser = payload;
    }
    next();
  });
}
