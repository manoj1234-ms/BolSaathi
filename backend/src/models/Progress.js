import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  
  // Overall stats
  totalXP: { type: Number, default: 0 },
  currentLevel: { type: Number, default: 1 },
  streak: { type: Number, default: 0 }, // days
  lastActivityDate: { type: Date },
  
  // Lesson progress
  lessonsCompleted: { type: Number, default: 0 },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  accuracy: { type: Number, default: 0 }, // percentage
  
  // Language-specific progress
  languageProgress: { type: Number, default: 0 }, // percentage
  lessonsInLanguage: { type: Number, default: 0 },
  
  // Weekly activity (for charts)
  weeklyActivity: [{
    date: Date,
    xp: Number,
    lessons: Number,
  }],
}, { timestamps: true });

progressSchema.index({ userId: 1 });
progressSchema.index({ userId: 1, languageId: 1 });

export default mongoose.model("Progress", progressSchema);

