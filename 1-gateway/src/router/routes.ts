import { log } from "@gateway/logger";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "ok" });
});

router.use("/*w", (req: Request, res: Response) => {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  log.error(`${url} does not exist`, "routes.ts/*w");
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Url Not Found",
  });
});

export default router;
