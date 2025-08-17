import { createGig } from "@gigs/controllers/create";
import { createGigSchema } from "@gigs/schemas/createGig.schema";
import {
  checkAuthentication,
  validateRequest,
} from "@muhammadjalil8481/jobber-shared";
import { Router } from "express";

const router = Router();

router.post(
  "/gigs",
  checkAuthentication,
  validateRequest(createGigSchema),
  createGig
);

export { router as gighRouter };
