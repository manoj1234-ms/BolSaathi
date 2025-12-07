import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { User, Edit, Award, Calendar, Globe } from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Mock user stats
  const stats = {
    memberSince: "January 2024",
    totalXP: 2450,
    level: 5,
    languagesLearning: 3,
    lessonsCompleted: 47,
    achievements: 8,
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-8 shadow-lg mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-[#060818] rounded-full border-2 border-gray-200 dark:border-white/10 shadow-lg hover:scale-110 transition">
                  <Edit className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user?.name || "User"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email || "user@example.com"}</p>

                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Member since {stats.memberSince}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Globe className="w-4 h-4" />
                    Learning {stats.languagesLearning} languages
                  </div>
                </div>

                <button
                  onClick={() => navigate("/settings")}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1">
                {stats.totalXP}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total XP</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
                Level {stats.level}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Level</p>
            </div>

            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg text-center col-span-2 sm:col-span-1">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-1">
                {stats.lessonsCompleted}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lessons</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition text-center"
              >
                <User className="w-6 h-6 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Dashboard</p>
              </button>
              <button
                onClick={() => navigate("/lessons")}
                className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition text-center"
              >
                <Globe className="w-6 h-6 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Lessons</p>
              </button>
              <button
                onClick={() => navigate("/progress")}
                className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition text-center"
              >
                <Award className="w-6 h-6 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Progress</p>
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition text-center"
              >
                <Edit className="w-6 h-6 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

