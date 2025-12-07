import { Play, Sparkles } from "lucide-react";
import { useState } from "react";

export default function VideoDemoSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              See It In Action
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Watch{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              BolSaathi
            </span>{" "}
            in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how easy it is to master any Indian language with AI-powered learning
          </p>
        </div>

        {/* Video Container */}
        <div className="relative bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {!showVideo ? (
            <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
              {/* Placeholder Content */}
              <div className="text-center z-10">
                <button
                  onClick={() => setShowVideo(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform mb-4 sm:mb-6 group touch-manipulation"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
                </button>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold">
                  Click to watch demo
                </p>
              </div>

              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="BolSaathi Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-3xl"
              ></iframe>
            </div>
          )}

          {/* Video Features Overlay (when not playing) */}
          {!showVideo && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-white">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold">98%</p>
                  <p className="text-xs sm:text-sm opacity-90">AI Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold">22</p>
                  <p className="text-xs sm:text-sm opacity-90">Languages</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold">2-3</p>
                  <p className="text-xs sm:text-sm opacity-90">Months to Fluency</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Interactive Lessons</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn through engaging, interactive content
            </p>
          </div>
          <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">AI-Powered Feedback</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get instant pronunciation corrections
            </p>
          </div>
          <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Track Progress</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Watch your fluency improve daily
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

