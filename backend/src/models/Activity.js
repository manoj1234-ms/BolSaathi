import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["Lesson", "Practice", "Quiz", "Achievement"], required: true },
  title: { type: String, required: true },
  xp: { type: Number, default: 0 },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
}, { timestamps: true });

activitySchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Activity", activitySchema);

