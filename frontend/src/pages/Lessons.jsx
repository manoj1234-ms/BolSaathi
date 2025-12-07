import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { BookOpen, Play, Lock, CheckCircle, Clock, Star } from "lucide-react";
import { LANGUAGES } from "../utils/constants";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Lessons = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Mock lessons data
  const allLessons = [
    { id: 1, title: "Basic Greetings", level: "Beginner", duration: "5 min", completed: true, locked: false, xp: 50 },
    { id: 2, title: "Numbers 1-100", level: "Beginner", duration: "8 min", completed: true, locked: false, xp: 50 },
    { id: 3, title: "Common Phrases", level: "Beginner", duration: "10 min", completed: false, locked: false, xp: 50 },
    { id: 4, title: "Family Members", level: "Intermediate", duration: "12 min", completed: false, locked: false, xp: 75 },
    { id: 5, title: "Daily Conversations", level: "Intermediate", duration: "15 min", completed: false, locked: true, xp: 75 },
    { id: 6, title: "Shopping & Markets", level: "Intermediate", duration: "15 min", completed: false, locked: true, xp: 75 },
  ];

  // Filter lessons based on search query
  const lessons = searchQuery
    ? allLessons.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.level.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allLessons;

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const selectedLang = LANGUAGES.find(lang => lang.id === selectedLanguage) || LANGUAGES[0];

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Language Lessons
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Choose a language and start learning
            </p>
          </div>

          {/* Language Selector */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Language</h2>
            <div className="flex flex-wrap gap-3">
              {LANGUAGES.slice(0, 6).map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedLanguage === lang.id
                      ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg scale-105"
                      : "bg-white dark:bg-[#0C0F1D] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-purple-400"
                  }`}
                >
                  {lang.english}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Language Info */}
          <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {selectedLang.native.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLang.english}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedLang.native}</p>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Found {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} for "{searchQuery}"
            </div>
          )}

          {/* Lessons Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LoadingSkeleton type="card" count={6} />
            </div>
          ) : lessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border rounded-xl p-6 shadow-lg transition-all duration-300 ${
                  lesson.locked
                    ? "border-gray-200 dark:border-white/5 opacity-60 cursor-not-allowed"
                    : "border-gray-200 dark:border-white/5 hover:scale-105 hover:shadow-xl cursor-pointer"
                }`}
                onClick={() => !lesson.locked && navigate(`/lesson/${lesson.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      lesson.completed
                        ? "bg-gradient-to-r from-green-400 to-teal-500"
                        : lesson.locked
                        ? "bg-gray-300 dark:bg-white/10"
                        : "bg-gradient-to-r from-blue-400 to-purple-500"
                    }`}>
                      {lesson.locked ? (
                        <Lock className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                      ) : lesson.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        lesson.level === "Beginner"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      }`}>
                        {lesson.level}
                      </span>
                    </div>
                  </div>
                  {lesson.completed && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lesson.title}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {lesson.xp} XP
                  </div>
                </div>

                {!lesson.locked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lesson/${lesson.id}`);
                    }}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {lesson.completed ? "Review" : "Start"} <Play className="w-4 h-4" />
                  </button>
                )}

                {lesson.locked && (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                    Complete previous lessons to unlock
                  </div>
                )}
              </div>
            ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? "No lessons found matching your search." : "No lessons available."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Lessons;

