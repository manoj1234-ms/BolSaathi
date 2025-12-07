import { useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { Trophy, Lock, Star, Target, Calendar, Award } from "lucide-react";

const Achievements = () => {
  const { user } = useContext(AuthContext);

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", icon: "🎯", earned: true, date: "2024-01-10", xp: 50 },
    { id: 2, title: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", earned: true, date: "2024-01-15", xp: 100 },
    { id: 3, title: "Language Explorer", description: "Learn 3 different languages", icon: "🌍", earned: true, date: "2024-01-20", xp: 150 },
    { id: 4, title: "Perfect Score", description: "Get 100% accuracy on a lesson", icon: "⭐", earned: false, xp: 200 },
    { id: 5, title: "Master Speaker", description: "Complete 50 practice sessions", icon: "🎤", earned: false, xp: 250 },
    { id: 6, title: "Language Master", description: "Complete 100 lessons", icon: "🏆", earned: false, xp: 500 },
    { id: 7, title: "Speed Learner", description: "Complete 5 lessons in one day", icon: "⚡", earned: false, xp: 150 },
    { id: 8, title: "Social Butterfly", description: "Share your progress 10 times", icon: "🦋", earned: false, xp: 100 },
  ];

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalXP = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.xp, 0);

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Achievements
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Unlock achievements and earn rewards
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{earnedCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Achievements Earned</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg text-center">
              <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalXP}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total XP Earned</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg text-center">
              <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {Math.round((earnedCount / achievements.length) * 100)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border rounded-xl p-6 shadow-lg transition-all duration-300 ${
                  achievement.earned
                    ? "border-yellow-400 hover:scale-105"
                    : "border-gray-200 dark:border-white/5 opacity-60"
                }`}
              >
                <div className="text-center mb-4">
                  <div className={`text-6xl mb-3 ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                    {achievement.icon}
                  </div>
                  {achievement.earned ? (
                    <div className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-semibold mb-2">
                      Earned
                    </div>
                  ) : (
                    <div className="inline-block px-3 py-1 bg-gray-300 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-xs rounded-full font-semibold mb-2 flex items-center gap-1 mx-auto w-fit">
                      <Lock className="w-3 h-3" />
                      Locked
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  {achievement.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{achievement.xp} XP</span>
                  </div>
                  {achievement.earned && achievement.date && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;

