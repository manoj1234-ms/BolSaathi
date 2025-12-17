import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, getDashboardStats);

export default router;

