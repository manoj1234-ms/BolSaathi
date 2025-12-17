import mongoose from "mongoose";
import dotenv from "dotenv";
import Language from "../models/Language.js";
import Lesson from "../models/Lesson.js";
import Achievement from "../models/Achievement.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const seedLanguages = async () => {
  const languages = [
    { name: "Hindi", code: "hi", nativeName: "हिन्दी", flag: "🇮🇳" },
    { name: "Bengali", code: "bn", nativeName: "বাংলা", flag: "🇧🇩" },
    { name: "Tamil", code: "ta", nativeName: "தமிழ்", flag: "🇮🇳" },
    { name: "English", code: "en", nativeName: "English", flag: "🇬🇧" },
    { name: "Gujarati", code: "gu", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  ];
  
  for (const lang of languages) {
    await Language.findOneAndUpdate(
      { code: lang.code },
      lang,
      { upsert: true, new: true }
    );
  }
  
  console.log("✅ Languages seeded");
};

const seedLessons = async () => {
  const hindi = await Language.findOne({ code: "hi" });
  const bengali = await Language.findOne({ code: "bn" });
  const tamil = await Language.findOne({ code: "ta" });
  
  const lessons = [
    // Hindi lessons
    { languageId: hindi._id, title: "Basic Greetings", level: "Beginner", duration: 5, xpReward: 50, order: 1 },
    { languageId: hindi._id, title: "Numbers 1-100", level: "Beginner", duration: 8, xpReward: 50, order: 2 },
    { languageId: hindi._id, title: "Common Phrases", level: "Beginner", duration: 10, xpReward: 50, order: 3 },
    { languageId: hindi._id, title: "Family Members", level: "Intermediate", duration: 12, xpReward: 75, order: 4 },
    { languageId: hindi._id, title: "Daily Conversations", level: "Intermediate", duration: 15, xpReward: 75, order: 5 },
    { languageId: hindi._id, title: "Shopping & Markets", level: "Intermediate", duration: 15, xpReward: 75, order: 6 },
    
    // Bengali lessons
    { languageId: bengali._id, title: "Basic Greetings", level: "Beginner", duration: 5, xpReward: 50, order: 1 },
    { languageId: bengali._id, title: "Numbers 1-100", level: "Beginner", duration: 8, xpReward: 50, order: 2 },
    
    // Tamil lessons
    { languageId: tamil._id, title: "Basic Greetings", level: "Beginner", duration: 5, xpReward: 50, order: 1 },
    { languageId: tamil._id, title: "Numbers 1-100", level: "Beginner", duration: 8, xpReward: 50, order: 2 },
  ];
  
  for (const lesson of lessons) {
    await Lesson.findOneAndUpdate(
      { languageId: lesson.languageId, title: lesson.title },
      lesson,
      { upsert: true, new: true }
    );
  }
  
  console.log("✅ Lessons seeded");
};

const seedAchievements = async () => {
  const achievements = [
    { title: "First Steps", description: "Complete your first lesson", icon: "🎯", xpReward: 50, criteria: { type: "lessons", value: 1 } },
    { title: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", xpReward: 100, criteria: { type: "streak", value: 7 } },
    { title: "Language Explorer", description: "Learn 3 different languages", icon: "🌍", xpReward: 150, criteria: { type: "languages", value: 3 } },
    { title: "Perfect Score", description: "Get 100% accuracy on a lesson", icon: "⭐", xpReward: 200, criteria: { type: "accuracy", value: 100 } },
    { title: "Master Speaker", description: "Complete 50 practice sessions", icon: "🎤", xpReward: 250, criteria: { type: "lessons", value: 50 } },
    { title: "Language Master", description: "Complete 100 lessons", icon: "🏆", xpReward: 500, criteria: { type: "lessons", value: 100 } },
    { title: "Speed Learner", description: "Complete 5 lessons in one day", icon: "⚡", xpReward: 150, criteria: { type: "lessons", value: 5 } },
    { title: "Social Butterfly", description: "Share your progress 10 times", icon: "🦋", xpReward: 100, criteria: { type: "xp", value: 1000 } },
  ];
  
  for (const ach of achievements) {
    await Achievement.findOneAndUpdate(
      { title: ach.title },
      ach,
      { upsert: true, new: true }
    );
  }
  
  console.log("✅ Achievements seeded");
};

const seedAll = async () => {
  try {
    await connectDB();
    await seedLanguages();
    await seedLessons();
    await seedAchievements();
    console.log("✅ All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedAll();

