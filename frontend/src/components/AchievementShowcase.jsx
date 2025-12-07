import { Trophy, Star, Flame, Target, Zap, Award } from "lucide-react";

export default function AchievementShowcase() {
  const achievements = [
    {
      icon: Trophy,
      name: "Language Master",
      description: "Complete all lessons in a language",
      rarity: "Legendary",
      color: "from-yellow-400 to-orange-500",
      users: "2.5K",
    },
    {
      icon: Flame,
      name: "Streak Champion",
      description: "Maintain a 30-day learning streak",
      rarity: "Rare",
      color: "from-red-400 to-orange-500",
      users: "5.8K",
    },
    {
      icon: Star,
      name: "Perfect Score",
      description: "Achieve 100% accuracy in 10 lessons",
      rarity: "Epic",
      color: "from-purple-400 to-pink-500",
      users: "3.2K",
    },
    {
      icon: Target,
      name: "Polyglot",
      description: "Learn 5 different languages",
      rarity: "Legendary",
      color: "from-blue-400 to-cyan-500",
      users: "1.2K",
    },
    {
      icon: Zap,
      name: "Speed Learner",
      description: "Complete 50 lessons in one week",
      rarity: "Rare",
      color: "from-yellow-400 to-green-500",
      users: "4.1K",
    },
    {
      icon: Award,
      name: "Pronunciation Pro",
      description: "Score 95%+ accuracy on 100 practices",
      rarity: "Epic",
      color: "from-indigo-400 to-purple-500",
      users: "2.9K",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              🏆 Unlock Achievements
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Earn{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Badges
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Achievements
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Gamify your learning journey and unlock rewards as you progress
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="group bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Rarity Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    achievement.rarity === "Legendary" 
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                      : achievement.rarity === "Epic"
                      ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
                      : "bg-gradient-to-r from-red-400 to-orange-500 text-white"
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {achievement.description}
                </p>

                {/* Users Earned */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-white/10">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{achievement.users} users earned this</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start earning achievements today!
          </p>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Start Your Journey →
          </button>
        </div>
      </div>
    </section>
  );
}

