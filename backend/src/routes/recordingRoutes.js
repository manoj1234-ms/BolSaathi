import express from "express";
import {
  getUserRecordings,
  saveRecording,
  deleteRecording,
} from "../controllers/recordingController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, getUserRecordings);
router.post("/", authRequired, saveRecording);
router.delete("/:recordingId", authRequired, deleteRecording);

export default router;

