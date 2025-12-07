import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import { TrendingUp, BookOpen, Mic, Award, Calendar, Target, Sparkles, Lightbulb, ArrowRight } from "lucide-react";
import { getAIRecommendations, generateLearningPath } from "../services/aiService";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real data from API
  const stats = {
    totalXP: 1250,
    currentLevel: 5,
    streak: 7,
    lessonsCompleted: 23,
    languagesLearning: 3,
    accuracy: 87,
  };

  const recentActivity = [
    { id: 1, type: "Lesson", title: "Hindi - Basic Greetings", time: "2 hours ago", xp: 50 },
    { id: 2, type: "Practice", title: "Bengali Pronunciation", time: "1 day ago", xp: 30 },
    { id: 3, type: "Quiz", title: "Tamil Vocabulary", time: "2 days ago", xp: 40 },
  ];

  const quickActions = [
    { icon: BookOpen, label: "Continue Learning", path: "/lessons", color: "from-blue-400 to-purple-500" },
    { icon: Mic, label: "Practice Speaking", path: "/practice", color: "from-purple-400 to-pink-500" },
    { icon: Target, label: "View Progress", path: "/progress", color: "from-green-400 to-teal-500" },
    { icon: Award, label: "Achievements", path: "/achievements", color: "from-yellow-400 to-orange-500" },
  ];

  useEffect(() => {
    // Load AI recommendations
    const loadAI = () => {
      setLoading(true);
      setTimeout(() => {
        const recommendations = getAIRecommendations(stats, {});
        const path = generateLearningPath(stats.currentLevel, [], []);
        setAiRecommendations(recommendations);
        setLearningPath(path);
        setLoading(false);
      }, 1000);
    };
    loadAI();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name || "Learner"}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Continue your language learning journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalXP}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total XP</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Level {stats.currentLevel}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Current Level</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-400 to-teal-500">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.streak} 🔥</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Day Streak</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lessonsCompleted}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Lessons Completed</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg hover:scale-105 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm text-center">{action.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Recommendations */}
          {loading ? (
            <div className="mb-8">
              <LoadingSkeleton type="card" count={1} />
            </div>
          ) : aiRecommendations && (
            <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6 shadow-lg mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Recommendations</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white/50 dark:bg-[#0C0F1D]/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Lesson</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{aiRecommendations.nextLesson}</p>
                </div>
                <div className="bg-white/50 dark:bg-[#0C0F1D]/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Focus Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {aiRecommendations.practiceAreas.map((area, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Suggested Content</p>
                <div className="space-y-2">
                  {aiRecommendations.suggestedContent.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/50 dark:bg-[#0C0F1D]/50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{item.reason}</p>
                      </div>
                      <button
                        onClick={() => navigate(item.type === "Lesson" ? "/lessons" : "/practice")}
                        className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:scale-110 transition"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-blue-400/20 pt-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  AI Tips
                </p>
                <ul className="space-y-1">
                  {aiRecommendations.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Learning Path */}
          {learningPath && (
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Learning Path</h2>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {learningPath.estimatedCompletion}
                </span>
              </div>
              
              <div className="space-y-3">
                {learningPath.path.map((week, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{week.focus}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {week.lessons} lessons • {week.xp} XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Daily Goal</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{learningPath.dailyGoal}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Weekly Goal</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{learningPath.weeklyGoal}</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity & Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        +{activity.xp} XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Learning Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Overall Accuracy</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{stats.accuracy}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${stats.accuracy}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Languages Learning</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{stats.languagesLearning}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs rounded-full">Hindi</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs rounded-full">Bengali</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-teal-500 text-white text-xs rounded-full">Tamil</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                  <button
                    onClick={() => navigate("/progress")}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    View Detailed Progress →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

