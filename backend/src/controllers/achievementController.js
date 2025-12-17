import Achievement from "../models/Achievement.js";
import UserAchievement from "../models/UserAchievement.js";
import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";

// Get all achievements
export const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true }).sort({ xpReward: -1 });
    res.json({ success: true, data: achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user achievements
export const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const userAchievements = await UserAchievement.find({ userId })
      .populate("achievementId")
      .sort({ earnedAt: -1 });
    
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
    
    const earnedCount = achievementsData.filter(a => a.earned).length;
    const totalXP = achievementsData
      .filter(a => a.earned)
      .reduce((sum, a) => sum + a.xp, 0);
    
    res.json({
      success: true,
      data: {
        achievements: achievementsData,
        stats: {
          earnedCount,
          totalXP,
          completionRate: Math.round((earnedCount / achievementsData.length) * 100),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check and award achievements (called after activities)
export const checkAchievements = async (userId) => {
  try {
    const progress = await Progress.findOne({ userId });
    if (!progress) return;
    
    const allAchievements = await Achievement.find({ isActive: true });
    const userAchievements = await UserAchievement.find({ userId });
    const earnedIds = userAchievements.map(ua => ua.achievementId.toString());
    
    for (const achievement of allAchievements) {
      if (earnedIds.includes(achievement._id.toString())) continue;
      
      let shouldAward = false;
      
      switch (achievement.criteria.type) {
        case "lessons":
          shouldAward = progress.lessonsCompleted >= achievement.criteria.value;
          break;
        case "streak":
          shouldAward = progress.streak >= achievement.criteria.value;
          break;
        case "xp":
          shouldAward = progress.totalXP >= achievement.criteria.value;
          break;
        case "accuracy":
          shouldAward = progress.accuracy >= achievement.criteria.value;
          break;
        case "languages":
          const languagesCount = await Progress.distinct("languageId", { userId });
          shouldAward = languagesCount.length >= achievement.criteria.value;
          break;
      }
      
      if (shouldAward) {
        await UserAchievement.create({
          userId,
          achievementId: achievement._id,
          xpEarned: achievement.xpReward,
        });
        
        // Add XP to progress
        progress.totalXP += achievement.xpReward;
        await progress.save();
      }
    }
  } catch (error) {
    console.error("Error checking achievements:", error);
  }
};

