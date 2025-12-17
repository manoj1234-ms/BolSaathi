import express from "express";
import {
  getAllAchievements,
  getUserAchievements,
} from "../controllers/achievementController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, getAllAchievements);
router.get("/user", authRequired, getUserAchievements);

export default router;

