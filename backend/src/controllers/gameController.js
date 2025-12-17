import GameScore from "../models/GameScore.js";
import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";
import { checkAchievements } from "./achievementController.js";

// Save game score
export const saveGameScore = async (req, res) => {
  try {
    const userId = req.user._id;
    const { gameType, language, difficulty, score, totalQuestions, correctAnswers } = req.body;
    
    // Calculate XP (10 XP per correct answer)
    const xpEarned = correctAnswers * 10;
    
    const gameScore = await GameScore.create({
      userId,
      gameType,
      language,
      difficulty,
      score,
      totalQuestions,
      correctAnswers,
      xpEarned,
    });
    
    // Update progress
    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = await Progress.create({ userId });
    }
    
    progress.totalXP = (progress.totalXP || 0) + xpEarned;
    progress.currentLevel = Math.floor(progress.totalXP / 100) + 1;
    await progress.save();
    
    // Check and award achievements
    await checkAchievements(userId);
    
    // Create activity
    await Activity.create({
      userId,
      type: "Quiz",
      title: `${gameType} - ${language}`,
      xp: xpEarned,
    });
    
    res.json({
      success: true,
      message: "Game score saved",
      data: {
        ...gameScore.toObject(),
        xpEarned,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user game scores
export const getUserGameScores = async (req, res) => {
  try {
    const userId = req.user._id;
    const { gameType, language } = req.query;
    
    const query = { userId };
    if (gameType) query.gameType = gameType;
    if (language) query.language = language;
    
    const scores = await GameScore.find(query)
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json({ success: true, data: scores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

