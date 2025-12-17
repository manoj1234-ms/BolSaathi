import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
  
  title: { type: String, required: true },
  audioUrl: { type: String, required: true },
  duration: { type: Number, default: 0 }, // in seconds
  
  // AI Analysis scores
  accuracy: { type: Number, default: 0 },
  pronunciation: { type: Number, default: 0 },
  fluency: { type: Number, default: 0 },
  
  // AI Feedback
  feedback: [String],
  mistakes: [{
    word: String,
    issue: String,
    suggestion: String,
  }],
}, { timestamps: true });

recordingSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Recording", recordingSchema);

