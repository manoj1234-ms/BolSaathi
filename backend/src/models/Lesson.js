import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: "Language", required: true },
  title: { type: String, required: true },
  description: { type: String },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  duration: { type: Number, default: 0 }, // in minutes
  xpReward: { type: Number, default: 50 },
  order: { type: Number, default: 0 }, // for ordering lessons
  content: {
    phrases: [{ text: String, translation: String, audioUrl: String }],
    vocabulary: [{ word: String, meaning: String, example: String }],
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

lessonSchema.index({ languageId: 1, order: 1 });

export default mongoose.model("Lesson", lessonSchema);

