import Lesson from "../models/Lesson.js";
import Language from "../models/Language.js";
import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";
import { checkAchievements } from "./achievementController.js";

// Get all languages
export const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: languages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get lessons by language
export const getLessonsByLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;
    const userId = req.user._id;
    
    // Get user progress to determine which lessons are completed/locked
    const userProgress = await Progress.findOne({ userId, languageId });
    const completedLessonIds = userProgress?.completedLessons || [];
    
    const lessons = await Lesson.find({ languageId, isActive: true })
      .sort({ order: 1 })
      .select("-content");
    
    // Mark lessons as completed/locked
    const lessonsWithStatus = lessons.map((lesson, index) => {
      const isCompleted = completedLessonIds.includes(lesson._id.toString());
      const isLocked = index > 0 && !completedLessonIds.includes(lessons[index - 1]._id.toString());
      
      return {
        id: lesson._id,
        title: lesson.title,
        level: lesson.level,
        duration: `${lesson.duration} min`,
        completed: isCompleted,
        locked: isLocked,
        xp: lesson.xpReward,
      };
    });
    
    res.json({ success: true, data: lessonsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get lesson details
export const getLessonDetails = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId).populate("languageId", "name code");
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }
    
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Complete a lesson
export const completeLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user._id;
    const { scores, xpEarned } = req.body;
    
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }
    
    // Update progress
    let progress = await Progress.findOne({ userId, languageId: lesson.languageId });
    if (!progress) {
      progress = await Progress.create({ userId, languageId: lesson.languageId });
    }
    
    // Mark lesson as completed
    if (!progress.completedLessons) {
      progress.completedLessons = [];
    }
    // Check if lesson already completed
    const lessonIdStr = lessonId.toString();
    const alreadyCompleted = progress.completedLessons.some(id => id.toString() === lessonIdStr);
    
    if (!alreadyCompleted) {
      progress.completedLessons.push(lessonId);
      progress.lessonsCompleted = (progress.lessonsCompleted || 0) + 1;
      progress.totalXP = (progress.totalXP || 0) + (xpEarned || lesson.xpReward);
      
      // Update level (simple calculation: 100 XP per level)
      progress.currentLevel = Math.floor(progress.totalXP / 100) + 1;
      
      // Update accuracy
      if (scores?.accuracy) {
        const currentAccuracy = progress.accuracy || 0;
        progress.accuracy = currentAccuracy === 0 
          ? scores.accuracy 
          : (currentAccuracy + scores.accuracy) / 2;
      }
      
      // Update language progress
      const totalLessons = await Lesson.countDocuments({ languageId: lesson.languageId, isActive: true });
      progress.lessonsInLanguage = progress.completedLessons.length;
      progress.languageProgress = totalLessons > 0 
        ? Math.round((progress.lessonsInLanguage / totalLessons) * 100) 
        : 0;
      
      await progress.save();
      
      // Check and award achievements
      await checkAchievements(userId);
    }
    
    // Create activity
    await Activity.create({
      userId,
      type: "Lesson",
      title: lesson.title,
      xp: xpEarned || lesson.xpReward,
      lessonId,
      languageId: lesson.languageId,
    });
    
    res.json({
      success: true,
      message: "Lesson completed successfully",
      data: { progress },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

