import { checkAuthentication } from "@muhammadjalil8481/jobber-shared";
import {
  getBuyerByEmail,
  getCurrentBuyer,
} from "@users/controllers/buyer.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/api/v1/buyer/email/:email", checkAuthentication, getBuyerByEmail);
router.get("/api/v1/buyer/current-user", checkAuthentication, getCurrentBuyer);
router.get(
  "/api/v1/buyer/username/:username",
  checkAuthentication,
  getCurrentBuyer
);

export { router as buyerRouter };
