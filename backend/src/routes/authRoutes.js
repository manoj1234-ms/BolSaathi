import { Router } from "express";
import {
  signup,
  verifySignupOtp,
  resendSignupOtp,
  login,
  verifyLoginOtp,
  resendLoginOtp,
  getMe,
  logout,
} from "../controllers/authController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/auth/signup  -> start signup, send OTP
router.post("/signup", signup);

// POST /api/auth/resend-signup-otp -> resend signup OTP
router.post("/resend-signup-otp", resendSignupOtp);

// POST /api/auth/verify-signup  -> verify signup OTP and mark user verified
router.post("/verify-signup", verifySignupOtp);

// POST /api/auth/login  -> verify password, send login OTP
router.post("/login", login);

// POST /api/auth/resend-login-otp -> resend login OTP
router.post("/resend-login-otp", resendLoginOtp);

// POST /api/auth/verify-login -> verify login OTP and issue JWT
router.post("/verify-login", verifyLoginOtp);

// GET /api/auth/me -> get current user from token
router.get("/me", authRequired, getMe);

// POST /api/auth/logout -> stateless logout (client will clear token)
router.post("/logout", authRequired, logout);

export default router;


