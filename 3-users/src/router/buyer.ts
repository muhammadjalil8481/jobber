import { getBuyerByEmail, getCurrentBuyer } from "@users/controllers/buyer.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/api/v1/buyer/email/:email", getBuyerByEmail);
router.get("/api/v1/buyer/current-user", getCurrentBuyer);
router.get("/api/v1/buyer/username/:username", getCurrentBuyer);

export { router as buyerRouter };
