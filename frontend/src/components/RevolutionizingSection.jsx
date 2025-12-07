import { Check, Users, Globe, Target } from "lucide-react";

export default function RevolutionizingSection() {
  const features = [
    "Real-time pronunciation feedback",
    "Native dialect support",
    "Personalized learning paths",
    "Cultural context integration",
  ];

  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Content - Left and Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
          {/* LEFT SIDE - Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Revolutionizing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Language Learning
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              BolSaathi is India's first AI-powered language learning platform dedicated to preserving and promoting our rich linguistic heritage. We combine cutting-edge artificial intelligence with native linguistic expertise to help you speak confidently.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Stacked Cards */}
          <div className="flex-1 w-full lg:w-auto flex flex-col gap-4 items-center lg:items-end">
            {/* Top Card - Voice Analysis */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-5 w-full max-w-sm shadow-xl hover:border-purple-400 dark:hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">
                    Voice Analysis
                  </h3>
                  <p className="text-green-600 dark:text-green-400 text-sm">Perfect Score!</p>
                </div>
              </div>
            </div>

            {/* Middle Card - Practice Session */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-5 w-full max-w-sm shadow-xl hover:border-purple-400 dark:hover:border-white/10 transition-all duration-300 -mt-2 lg:-mt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-900 dark:text-white font-bold text-sm">You</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">
                    Practice Session
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Learning Hindi...</p>
                </div>
              </div>
            </div>

            {/* Bottom Card - Daily Progress */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-5 w-full max-w-sm shadow-xl hover:border-purple-400 dark:hover:border-white/10 transition-all duration-300 -mt-2 lg:-mt-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600 dark:text-white" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">
                    Daily Progress
                  </h3>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-8 border-t border-gray-200 dark:border-white/10">
          {/* Active Learners */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="w-6 h-6 text-purple-500 dark:text-purple-400" />
              <span className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                10K+
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Active Learners</p>
          </div>

          {/* Languages */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              <span className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                22
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Languages</p>
          </div>

          {/* AI Accuracy */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Target className="w-6 h-6 text-purple-500 dark:text-purple-400" />
              <span className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                98%
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">AI Accuracy</p>
          </div>
        </div>
      </div>
    </section>
  );
}

