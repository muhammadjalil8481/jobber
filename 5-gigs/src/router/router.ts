import { log } from "@gigs/logger";
import { gatewayRequestVerification } from "@muhammadjalil8481/jobber-shared";
import { Request, Response, Router } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { gighRouter } from "./gig-router";

const publicKey = fs.readFileSync("./public.pem", "utf-8");
const gatewayMiddleware = gatewayRequestVerification(publicKey);

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "ok" });
});

router.use(gatewayMiddleware, gighRouter);

router.all("*", (req: Request, res: Response) => {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  log.error(`${url} does not exist`, "routes.ts/*w");
  res.status(StatusCodes.NOT_FOUND).json({
    status: "error",
    message: "Url Not Found",
  });
});

export default router;
