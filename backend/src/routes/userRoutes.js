import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { updateMe } from "../controllers/userController.js";

const router = Router();

// PUT /api/users/me -> update profile data (name, email, phone)
router.put("/me", authRequired, updateMe);

export default router;


