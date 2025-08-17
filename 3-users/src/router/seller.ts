import {
  checkAuthentication,
  validateRequest,
  withPermission,
} from "@muhammadjalil8481/jobber-shared";
import {
  createSeller,
  getRandomSellers,
  getSellerById,
  getSellerByUsername,
  updateSeller,
} from "@users/controllers/sellers.controller";
import { createSellerSchema } from "@users/schemas/create-seller-schema";
import { updateSellerSchema } from "@users/schemas/update-seller-schema";
import { getRedisClient } from "@users/server";
import { Router } from "express";

const router: Router = Router();
router.get("/api/v1/seller/id/:id", checkAuthentication, getSellerById);
router.get("/api/v1/seller/username/:username", getSellerByUsername);
router.get("/api/v1/seller/random/:size", getRandomSellers);
router.post(
  "/api/v1/seller/create",
  checkAuthentication,
  withPermission("sellers/create", getRedisClient),
  validateRequest(createSellerSchema),
  createSeller
);
router.patch(
  "/api/v1/seller/update/:id",
  checkAuthentication,
  withPermission("sellers/update", getRedisClient),
  validateRequest(updateSellerSchema),
  updateSeller
);

export { router as sellerRouter };
