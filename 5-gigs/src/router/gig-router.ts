import { createGig } from "@gigs/controllers/create";
import { getGigById, getGigs, getGigsBySellerId, getRelatedGigs, getTopGigsByCategory } from "@gigs/controllers/get";
import { makeGigInactive } from "@gigs/controllers/inactive";
import { updateGig } from "@gigs/controllers/update";
import { createGigSchema } from "@gigs/schemas/createGig.schema";
import { updateGigSchema } from "@gigs/schemas/updateGigSchema";
import {
  checkAuthentication,
  validateRequest,
} from "@muhammadjalil8481/jobber-shared";
import { Router } from "express";

const router = Router();

router.post(
  "/api/v1/create",
  checkAuthentication,
  validateRequest(createGigSchema),
  createGig
);
router.patch(
  "/api/v1/update/:id",
  checkAuthentication,
  validateRequest(updateGigSchema),
  updateGig
);
router.patch("/api/v1/inactive/:id", checkAuthentication, makeGigInactive);
router.get(
  "/api/v1/related-gigs/:id",
  checkAuthentication,
  getRelatedGigs
);
router.get(
  "/api/v1/top-gigs/:category",
  checkAuthentication,
  getTopGigsByCategory
);
router.get(
  "/api/v1/seller/:sellerId",
  checkAuthentication,
  getGigsBySellerId
);
router.get(
  "/api/v1/:id",
  checkAuthentication,
  getGigById
);
router.get(
  "/api/v1/",
  checkAuthentication,
  getGigs
);



export { router as gighRouter };
