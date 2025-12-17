import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "🏆" },
  xpReward: { type: Number, default: 0 },
  criteria: {
    type: { type: String, enum: ["lessons", "streak", "xp", "accuracy", "languages"], required: true },
    value: { type: Number, required: true }, // e.g., 50 lessons, 7 day streak
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Achievement", achievementSchema);

