import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";
import UserAchievement from "../models/UserAchievement.js";
import Achievement from "../models/Achievement.js";
import Language from "../models/Language.js";

// Get user progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    
    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = await Progress.create({ userId });
    }
    
    // Get weekly activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const weeklyActivities = await Activity.find({
      userId,
      createdAt: { $gte: sevenDaysAgo },
    }).sort({ createdAt: 1 });
    
    // Group by day
    const weeklyData = {};
    weeklyActivities.forEach(activity => {
      const date = activity.createdAt.toISOString().split('T')[0];
      if (!weeklyData[date]) {
        weeklyData[date] = { xp: 0, lessons: 0 };
      }
      weeklyData[date].xp += activity.xp || 0;
      if (activity.type === "Lesson") {
        weeklyData[date].lessons += 1;
      }
    });
    
    // Format for frontend - map actual data to days of week
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date();
    const weeklyChart = days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (today.getDay() - 1 - index + 7) % 7);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = weeklyData[dateStr] || { xp: 0, lessons: 0 };
      return {
        day,
        xp: dayData.xp,
        lessons: dayData.lessons,
      };
    });
    
    // Get language progress
    const languageProgress = await Progress.find({ userId })
      .populate("languageId", "name")
      .where("languageId").ne(null);
    
    const languageProgressData = languageProgress.map(lp => ({
      language: lp.languageId?.name || "Unknown",
      progress: lp.languageProgress || 0,
      level: lp.currentLevel || 1,
      lessons: lp.lessonsInLanguage || 0,
    }));
    
    // Get achievements
    const userAchievements = await UserAchievement.find({ userId })
      .populate("achievementId");
    
    const allAchievements = await Achievement.find({ isActive: true });
    const achievementsData = allAchievements.map(ach => {
      const earned = userAchievements.find(ua => 
        ua.achievementId._id.toString() === ach._id.toString()
      );
      return {
        id: ach._id,
        title: ach.title,
        description: ach.description,
        icon: ach.icon,
        earned: !!earned,
        date: earned?.earnedAt,
        xp: ach.xpReward,
      };
    });
    
    // AI Progress Prediction (mock)
    const progressPrediction = {
      currentLevel: progress.currentLevel,
      predictedLevel: progress.currentLevel + 2,
      weeksToNextLevel: 2,
      confidence: "High",
      recommendations: [
        "Practice daily for consistent progress",
        "Focus on weak areas",
        "Review completed lessons",
      ],
    };
    
    // AI Error Analysis (mock)
    const errorAnalysis = {
      commonMistakes: [
        { mistake: "Pronunciation of 'th'", frequency: 5, suggestion: "Practice tongue placement" },
        { mistake: "Word order", frequency: 3, suggestion: "Review sentence structure" },
      ],
      weakAreas: ["Pronunciation", "Grammar"],
      strongAreas: ["Vocabulary", "Reading"],
      improvementRate: 15,
      recommendations: [
        "Focus on pronunciation exercises",
        "Practice speaking more",
      ],
    };
    
    res.json({
      success: true,
      data: {
        stats: {
          totalXP: progress.totalXP || 0,
          currentLevel: progress.currentLevel || 1,
          streak: progress.streak || 0,
          lessonsCompleted: progress.lessonsCompleted || 0,
          accuracy: progress.accuracy || 0,
        },
        weeklyData: weeklyChart,
        languageProgress: languageProgressData,
        achievements: achievementsData,
        progressPrediction,
        errorAnalysis,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update progress after activity
export const updateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { lessonId, scores, xpEarned, languageId } = req.body;
    
    let progress = await Progress.findOne({ userId, languageId });
    if (!progress) {
      progress = await Progress.create({ userId, languageId });
    }
    
    progress.totalXP += xpEarned || 0;
    progress.currentLevel = Math.floor(progress.totalXP / 100) + 1;
    
    if (scores?.accuracy) {
      progress.accuracy = (progress.accuracy + scores.accuracy) / 2;
    }
    
    await progress.save();
    
    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

