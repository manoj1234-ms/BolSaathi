import mongoose from "mongoose";

const gameScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gameType: { type: String, enum: ["wordMatch", "fillBlank", "pronunciation"], required: true },
  language: { type: String, required: true },
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  xpEarned: { type: Number, default: 0 },
}, { timestamps: true });

gameScoreSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("GameScore", gameScoreSchema);

