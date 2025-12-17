import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  personality: { type: String, default: "friendly" },
  language: { type: String, default: "en" },
  suggestions: [String],
}, { timestamps: true });

chatMessageSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("ChatMessage", chatMessageSchema);

