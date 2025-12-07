import { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { TrendingUp, Calendar, Target, Award, BarChart3, Activity, Sparkles, Lightbulb, AlertCircle } from "lucide-react";
import { predictProgress, analyzeErrors } from "../services/aiService";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Progress = () => {
  const { user } = useContext(AuthContext);
  const [progressPrediction, setProgressPrediction] = useState(null);
  const [errorAnalysis, setErrorAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock progress data
  const weeklyData = [
    { day: "Mon", xp: 120, lessons: 3 },
    { day: "Tue", xp: 150, lessons: 4 },
    { day: "Wed", xp: 80, lessons: 2 },
    { day: "Thu", xp: 200, lessons: 5 },
    { day: "Fri", xp: 180, lessons: 4 },
    { day: "Sat", xp: 100, lessons: 3 },
    { day: "Sun", xp: 140, lessons: 3 },
  ];

  const languageProgress = [
    { language: "Hindi", progress: 75, level: 5, lessons: 15 },
    { language: "Bengali", progress: 45, level: 3, lessons: 9 },
    { language: "Tamil", progress: 30, level: 2, lessons: 6 },
  ];

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", earned: true, icon: "🎯" },
    { id: 2, title: "Week Warrior", description: "7 day streak", earned: true, icon: "🔥" },
    { id: 3, title: "Language Master", description: "Complete 50 lessons", earned: false, icon: "🏆" },
    { id: 4, title: "Perfect Score", description: "Get 100% accuracy", earned: false, icon: "⭐" },
  ];

  useEffect(() => {
    // Load AI predictions and analysis
    const loadAI = () => {
      setLoading(true);
      setTimeout(() => {
        const prediction = predictProgress(5, 1.5, 0.8); // currentLevel, studyHours, consistency
        const errors = analyzeErrors({});
        setProgressPrediction(prediction);
        setErrorAnalysis(errors);
        setLoading(false);
      }, 1000);
    };
    loadAI();
  }, []);

  const maxXP = Math.max(...weeklyData.map(d => d.xp));

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Your Progress
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your learning journey and achievements
            </p>
          </div>

          {/* AI Progress Prediction */}
          {loading ? (
            <div className="mb-8">
              <LoadingSkeleton type="card" count={1} />
            </div>
          ) : progressPrediction && (
            <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6 shadow-lg mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Progress Prediction</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/50 dark:bg-[#0C0F1D]/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Level</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Level {progressPrediction.currentLevel}</p>
                </div>
                <div className="bg-white/50 dark:bg-[#0C0F1D]/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Predicted Level</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Level {Math.round(progressPrediction.predictedLevel)}
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-[#0C0F1D]/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time to Next Level</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {progressPrediction.weeksToNextLevel} weeks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Confidence:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  progressPrediction.confidence === "High"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : progressPrediction.confidence === "Medium"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                }`}>
                  {progressPrediction.confidence}
                </span>
              </div>

              <div className="border-t border-blue-400/20 pt-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  AI Recommendations
                </p>
                <ul className="space-y-1">
                  {progressPrediction.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* AI Error Analysis */}
          {errorAnalysis && (
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg mb-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Error Analysis</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Common Mistakes</p>
                  <div className="space-y-3">
                    {errorAnalysis.commonMistakes.map((mistake, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{mistake.mistake}</p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{mistake.frequency}x</span>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">{mistake.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Areas to Focus</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Weak Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {errorAnalysis.weakAreas.map((area, idx) => (
                          <span key={idx} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Strong Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {errorAnalysis.strongAreas.map((area, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Improvement Rate</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">+{errorAnalysis.improvementRate}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">AI Recommendations</p>
                <ul className="space-y-1">
                  {errorAnalysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Total XP</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">2,450</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Streak</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">12 🔥</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-purple-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">47</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Achievements</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">8/15</p>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Weekly Activity
            </h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full h-40 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-400 to-purple-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(data.xp / maxXP) * 100}%` }}
                      title={`${data.xp} XP`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">{data.day}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">{data.lessons} lessons</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Language Progress */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Language Progress
              </h2>
              <div className="space-y-6">
                {languageProgress.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{lang.language}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Level {lang.level} • {lang.lessons} lessons</p>
                      </div>
                      <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        {lang.progress}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${lang.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.earned
                        ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                        : "border-gray-200 dark:border-white/5 opacity-60"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full font-semibold">
                        Earned
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;

