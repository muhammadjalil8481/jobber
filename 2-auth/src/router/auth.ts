import { logIn } from "@auth/controller/auth/login";
import { signUp } from "@auth/controller/auth/signup";
import { loginSchema } from "@auth/schema/login.schema";
import { signupSchema } from "@auth/schema/signup.schema";
import { validateRequest } from "@muhammadjalil8481/jobber-shared";
import { Router } from "express";

const router: Router = Router();

router.post("/api/v1/signup", validateRequest(signupSchema), signUp);
router.post("/api/v1/login", validateRequest(loginSchema), logIn);
// router.get("/api/v1/current-user", checkAuthentication, getCurrentUser);

export { router as authRouter };
