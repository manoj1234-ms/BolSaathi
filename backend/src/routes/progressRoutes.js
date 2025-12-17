import express from "express";
import {
  getUserProgress,
  updateProgress,
} from "../controllers/progressController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, getUserProgress);
router.post("/update", authRequired, updateProgress);

export default router;

