import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";


const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "ok" });
});

export default router;
