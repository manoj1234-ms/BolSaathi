import express from "express";
import {
  getAllLanguages,
  getLessonsByLanguage,
  getLessonDetails,
  completeLesson,
} from "../controllers/lessonController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/languages", authRequired, getAllLanguages);
router.get("/language/:languageId", authRequired, getLessonsByLanguage);
router.get("/:lessonId", authRequired, getLessonDetails);
router.post("/:lessonId/complete", authRequired, completeLesson);

export default router;

