import express from "express";
import {
  saveGameScore,
  getUserGameScores,
} from "../controllers/gameController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/score", authRequired, saveGameScore);
router.get("/scores", authRequired, getUserGameScores);

export default router;

