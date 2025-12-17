import express from "express";
import {
  getChatHistory,
  saveChatMessage,
  clearChatHistory,
} from "../controllers/chatController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, getChatHistory);
router.post("/", authRequired, saveChatMessage);
router.delete("/", authRequired, clearChatHistory);

export default router;

