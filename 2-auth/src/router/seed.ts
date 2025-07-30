import { seedUsers } from "@auth/controller/seed/seed";
import { Router } from "express";

const router: Router = Router();

router.post("/api/v1/seed/:count", seedUsers);

export { router as seedRouter };
