import { gatewayRequestVerification } from "@muhammadjalil8481/jobber-shared";
import { log } from "@users/logger";
import { Request, Response, Router } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { buyerRouter } from "./buyer";
import { sellerRouter } from "./seller";

const publicKey = fs.readFileSync("./public.pem", "utf-8");
const gatewayMiddleware = gatewayRequestVerification(publicKey);

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "ok" });
});

router.use(gatewayMiddleware, buyerRouter);
router.use(gatewayMiddleware,sellerRouter)

router.all("*", (req: Request, res: Response) => {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  log.error(`${url} does not exist`, "routes.ts/*w");
  res.status(StatusCodes.NOT_FOUND).json({
    status: "error",
    message: "Url Not Found",
  });
});

export default router;
