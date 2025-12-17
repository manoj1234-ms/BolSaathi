import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  achievementId: { type: mongoose.Schema.Types.ObjectId, ref: "Achievement", required: true },
  earnedAt: { type: Date, default: Date.now },
  xpEarned: { type: Number, default: 0 },
}, { timestamps: true });

userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

export default mongoose.model("UserAchievement", userAchievementSchema);

