import { validateRequest } from "@muhammadjalil8481/jobber-shared";
import {
  createSeller,
  getRandomSellers,
  getSellerById,
  getSellerByUsername,
  updateSeller,
} from "@users/controllers/sellers.controller";
import { createSellerSchema } from "@users/schemas/create-seller-schema";
import { updateSellerSchema } from "@users/schemas/update-seller-schema";
import { Router } from "express";

const router: Router = Router();

router.get("/api/v1/seller/id/:id", getSellerById);
router.get("/api/v1/seller/username/:username", getSellerByUsername);
router.get("/api/v1/seller/random/:size", getRandomSellers);
router.post(
  "/api/v1/seller/create",
  validateRequest(createSellerSchema),
  createSeller
);
router.patch(
  "/api/v1/seller/update/:id",
  validateRequest(updateSellerSchema),
  updateSeller
);

export { router as sellerRouter };
