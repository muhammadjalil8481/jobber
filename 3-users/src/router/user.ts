import { checkAuthentication } from "@muhammadjalil8481/jobber-shared";
import { getCurrentUser, updateProfilePicture } from "@users/controllers/users.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/api/v1/current-user", checkAuthentication, getCurrentUser);
router.post("/api/v1/profile-photo/:buyerId", checkAuthentication, updateProfilePicture);

export { router as userRouter };
