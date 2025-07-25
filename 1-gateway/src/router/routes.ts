import { log } from "@gateway/logger";
import { BadRequestError } from "@muhammadjalil8481/jobber-shared";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/health", (_req: Request, res: Response) => {
  // log.error("Test error", "routes.ts/health");
  throw new BadRequestError("This is a test error",'routes.ts/health');
  res.status(200).json({ status: "ok" });
});

router.use("/*w", (req: Request, res: Response) => {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  log.error(`Gateway service error: ${url} does not exist`, "routes.ts");
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Url Not Found",
  });
});

export default router;
