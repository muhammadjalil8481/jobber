import {
  getRandomSellers,
  getSellerById,
  getSellerByUsername,
} from "@users/controllers/sellers.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/api/v1/seller/id/:id", getSellerById);
router.get("/api/v1/seller/username/:username", getSellerByUsername);
router.get("/api/v1/seller/random/:size", getRandomSellers);
// router.post("/api/v1/seller/create", createSeller);
// router.patch("/api/v1/seller/update/:sellerId", updateSeller);

export { router as sellerRouter };
