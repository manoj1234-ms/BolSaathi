import { useState } from "react";
import { Quote, Star, TrendingUp, Clock, Award } from "lucide-react";

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState(0);

  const stories = [
    {
      name: "Priya Patel",
      role: "Software Engineer",
      image: "P",
      location: "Mumbai",
      language: "Gujarati",
      timeToFluency: "2 months",
      achievement: "Can now have fluent conversations with grandparents",
      before: "Complete beginner, no knowledge of Gujarati",
      after: "Confident speaker, achieved Level 8 proficiency",
      quote: "BolSaathi transformed my relationship with my heritage. I went from zero to fluent in just 2 months! The AI pronunciation feedback was incredible - it caught mistakes I didn't even know I was making.",
      stats: {
        lessonsCompleted: 156,
        accuracy: 94,
        streak: 45,
        xp: 12450,
      },
      gradient: "from-blue-400 to-purple-500",
    },
    {
      name: "Arjun Singh",
      role: "MBA Student",
      image: "A",
      location: "Delhi",
      language: "Hindi",
      timeToFluency: "6 weeks",
      achievement: "Learned business Hindi for career advancement",
      before: "Basic Hindi, needed professional fluency",
      after: "Business-level proficiency, got job promotion",
      quote: "As someone moving to a Hindi-speaking region, I needed quick results. BolSaathi delivered! The personalized learning path adapted perfectly to my busy schedule.",
      stats: {
        lessonsCompleted: 89,
        accuracy: 91,
        streak: 42,
        xp: 8920,
      },
      gradient: "from-purple-400 to-pink-500",
    },
    {
      name: "Meera Krishnan",
      role: "Content Creator",
      image: "M",
      location: "Chennai",
      language: "Tamil",
      timeToFluency: "3 months",
      achievement: "Created Tamil content with native-level pronunciation",
      before: "Could understand but couldn't speak fluently",
      after: "Native-level pronunciation, creating viral content",
      quote: "The real-time voice analysis feature is mind-blowing! It helped me perfect my Tamil pronunciation to a level I never thought possible. My content engagement doubled!",
      stats: {
        lessonsCompleted: 203,
        accuracy: 96,
        streak: 67,
        xp: 20340,
      },
      gradient: "from-green-400 to-teal-500",
    },
  ];

  const currentStory = stories[selectedStory];

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10 bg-gray-50/50 dark:bg-[#060818]/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
              Real Success Stories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            From{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Beginner
            </span>{" "}
            to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Fluent
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how real learners achieved fluency with BolSaathi
          </p>
        </div>

        {/* Main Story Card */}
        <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl mb-8">
          <Quote className="w-12 h-12 text-purple-400/30 mb-6" />

          {/* User Info */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${currentStory.gradient} flex items-center justify-center text-white text-4xl font-bold shadow-lg flex-shrink-0`}>
              {currentStory.image}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {currentStory.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                {currentStory.role} • {currentStory.location}
              </p>
              <span className={`inline-block px-4 py-2 bg-gradient-to-r ${currentStory.gradient} text-white rounded-full font-semibold`}>
                Mastered {currentStory.language}
              </span>
            </div>
          </div>

          {/* Quote */}
          <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">
            "{currentStory.quote}"
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pt-8 border-t border-gray-200 dark:border-white/10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStory.stats.accuracy}%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStory.stats.lessonsCompleted}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lessons</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStory.stats.streak} days
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStory.stats.xp.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total XP</p>
            </div>
          </div>

          {/* Before/After */}
          <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-gray-200 dark:border-white/10">
            <div>
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Before</p>
              <p className="text-gray-700 dark:text-gray-300">{currentStory.before}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">After</p>
              <p className="text-gray-700 dark:text-gray-300">{currentStory.after}</p>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <Award className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Achieved fluency in just {currentStory.timeToFluency}!
              </span>
            </div>
          </div>
        </div>

        {/* Story Selector */}
        <div className="flex justify-center gap-4">
          {stories.map((story, index) => (
            <button
              key={index}
              onClick={() => setSelectedStory(index)}
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${story.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg transition-all duration-300 ${
                selectedStory === index
                  ? "scale-110 ring-4 ring-purple-300 dark:ring-purple-700"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              {story.image}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

