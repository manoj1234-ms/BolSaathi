import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import FeaturesSection from '../components/FeaturesSection'
import SupportedLanguages from '../components/SupportedLanguages'
import RevolutionizingSection from '../components/RevolutionizingSection'
import ContactSection from '../components/ContactSection'
import { AuthContext } from '../context/AuthContext'
import { TrendingUp, BookOpen, Mic, Award, Calendar, Target, Play, ArrowRight, BarChart3 } from 'lucide-react'

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  // Mock data - replace with real data from API
  const stats = {
    totalXP: 1250,
    currentLevel: 5,
    streak: 7,
    lessonsCompleted: 23,
    languagesLearning: 3,
    accuracy: 87,
  }

  const recentLessons = [
    { id: 1, title: "Hindi - Basic Greetings", language: "Hindi", progress: 100, completed: true },
    { id: 2, title: "Bengali - Numbers", language: "Bengali", progress: 75, completed: false },
    { id: 3, title: "Tamil - Common Phrases", language: "Tamil", progress: 50, completed: false },
  ]

  const recentActivity = [
    { id: 1, type: "Lesson", title: "Hindi - Basic Greetings", time: "2 hours ago", xp: 50 },
    { id: 2, type: "Practice", title: "Bengali Pronunciation", time: "1 day ago", xp: 30 },
  ]

  const quickActions = [
    { icon: BookOpen, label: "Continue Learning", path: "/lessons", color: "from-blue-400 to-purple-500" },
    { icon: Mic, label: "Practice Speaking", path: "/practice", color: "from-purple-400 to-pink-500" },
    { icon: Target, label: "View Progress", path: "/progress", color: "from-green-400 to-teal-500" },
  ]

  return (
    <Layout>
      <Hero/>
      
      {/* User Dashboard Section - Only show if logged in */}
      {isAuthenticated && user && (
        <div className="w-full px-4 sm:px-6 lg:px-16 py-12 bg-gray-50 dark:bg-[#060818]">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.name || "Learner"}! 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Continue your language learning journey
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalXP}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total XP</p>
              </div>

              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Lv.{stats.currentLevel}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Level</p>
              </div>

              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.streak} 🔥</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Streak</p>
              </div>

              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.lessonsCompleted}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Lessons</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Lessons */}
              <div className="lg:col-span-2 bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Recent Lessons
                  </h3>
                  <button
                    onClick={() => navigate("/lessons")}
                    className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer"
                      onClick={() => navigate("/lessons")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs rounded-full font-semibold">
                            {lesson.language}
                          </span>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{lesson.title}</p>
                        </div>
                        {lesson.completed && (
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${lesson.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions & Progress */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon
                      return (
                        <button
                          key={index}
                          onClick={() => navigate(action.path)}
                          className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition group"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">{action.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Overall Accuracy</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{stats.accuracy}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${stats.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/progress")}
                      className="w-full text-center text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold hover:gap-2 transition-all flex items-center justify-center gap-1"
                    >
                      View Detailed Progress <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>
        </div>
      )}

      {/* Regular Sections - Always show */}
      <FeaturesSection/>
      <SupportedLanguages/>
      <RevolutionizingSection/>
      <ContactSection/>
    </Layout>
  )
}

export default Home
