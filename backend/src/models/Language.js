import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Hindi"
  code: { type: String, required: true, unique: true }, // e.g., "hi"
  nativeName: { type: String, required: true }, // e.g., "हिन्दी"
  flag: { type: String }, // emoji or image URL
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Language", languageSchema);

