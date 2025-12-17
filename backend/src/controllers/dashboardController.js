import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";
import UserAchievement from "../models/UserAchievement.js";
import Achievement from "../models/Achievement.js";
import Lesson from "../models/Lesson.js";

// Get dashboard stats
// Helper to update streak
const updateStreak = async (progress) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActivity = progress.lastActivityDate 
    ? new Date(progress.lastActivityDate)
    : null;
  
  if (lastActivity) {
    lastActivity.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day, no change
      return;
    } else if (daysDiff === 1) {
      // Consecutive day
      progress.streak = (progress.streak || 0) + 1;
    } else {
      // Streak broken
      progress.streak = 1;
    }
  } else {
    // First activity
    progress.streak = 1;
  }
  
  progress.lastActivityDate = today;
  await progress.save();
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user progress
    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = await Progress.create({ userId });
    }
    
    // Update streak if needed
    await updateStreak(progress);
    
    // Get recent activities (last 10)
    const recentActivities = await Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("lessonId", "title")
      .populate("languageId", "name");
    
    // Get languages learning count
    const languagesLearning = await Progress.distinct("languageId", { userId }).where("languageId").ne(null);
    
    // Get AI recommendations (mock for now - can be enhanced with real AI)
    const aiRecommendations = {
      nextLesson: "Hindi - Daily Conversations",
      practiceAreas: ["Pronunciation", "Vocabulary"],
      suggestedContent: [
        { title: "Hindi Greetings", type: "Lesson", reason: "Based on your progress" },
        { title: "Practice Speaking", type: "Practice", reason: "Improve fluency" },
      ],
      tips: [
        "Practice daily for better retention",
        "Focus on pronunciation",
        "Review previous lessons",
      ],
    };
    
    // Learning path (mock)
    const learningPath = {
      estimatedCompletion: "8 weeks",
      dailyGoal: "30 minutes",
      weeklyGoal: "5 lessons",
      path: [
        { focus: "Basic Greetings", lessons: 5, xp: 250 },
        { focus: "Numbers & Time", lessons: 4, xp: 200 },
        { focus: "Daily Conversations", lessons: 6, xp: 300 },
      ],
    };
    
    res.json({
      success: true,
      data: {
        stats: {
          totalXP: progress.totalXP,
          currentLevel: progress.currentLevel,
          streak: progress.streak,
          lessonsCompleted: progress.lessonsCompleted,
          languagesLearning: languagesLearning.length,
          accuracy: progress.accuracy,
        },
        recentActivity: recentActivities.map(a => ({
          id: a._id,
          type: a.type,
          title: a.title || `${a.type} Activity`,
          time: a.createdAt,
          xp: a.xp || 0,
        })),
        aiRecommendations,
        learningPath,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

