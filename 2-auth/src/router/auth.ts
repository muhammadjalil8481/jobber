import { logIn, signUp } from "@auth/controller/auth/authentication";
import { getCurrentUser } from "@auth/controller/auth/current-user";
import { changePassword, forgotPassword, resetPassword } from "@auth/controller/auth/password";
import { refreshToken } from "@auth/controller/auth/refresh-token";
import { resendVerificationEmail } from "@auth/controller/auth/resend-verification-email";
import { verifyEmail } from "@auth/controller/auth/verify-email";
import { changePasswordSchema } from "@auth/schema/change-password.schema";
import { forgetPasswordSchema } from "@auth/schema/forget-password.schema";
import { loginSchema } from "@auth/schema/login.schema";
import { resetPasswordSchema } from "@auth/schema/resetPasswordSchema";
import { signupSchema } from "@auth/schema/signup.schema";
import {
  checkAuthentication,
  validateRequest,
} from "@muhammadjalil8481/jobber-shared";
import { Router } from "express";

const router: Router = Router();

router.post("/api/v1/signup", validateRequest(signupSchema), signUp);
router.post("/api/v1/login", validateRequest(loginSchema), logIn);
router.get("/api/v1/current-user", checkAuthentication, getCurrentUser);
router.patch("/api/v1/verify-email", verifyEmail);
router.post(
  "/api/v1/resend-verification-email",
  checkAuthentication,
  resendVerificationEmail
);
router.post(
  "/api/v1/forget-password",
  validateRequest(forgetPasswordSchema),
  forgotPassword
);
router.patch(
  "/api/v1/reset-password",
  validateRequest(resetPasswordSchema),
  resetPassword
);
router.patch(
  "/api/v1/change-password",
  checkAuthentication,
  validateRequest(changePasswordSchema),
  changePassword
);
router.post("/api/v1/refresh-token", refreshToken);


export { router as authRouter };
