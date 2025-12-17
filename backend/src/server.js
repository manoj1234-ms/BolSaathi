import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import recordingRoutes from "./routes/recordingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Basic middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "BolSaathi backend is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/recordings", recordingRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/games", gameRoutes);

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`BolSaathi backend listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to start server due to DB error:", err);
  process.exit(1);
});


