import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Users, Award, Zap, Star } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({ users: 0, accuracy: 0, languages: 0 });

  useEffect(() => {
    // Animate counters
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedStats({
        users: Math.floor(10000 * easeOut),
        accuracy: Math.floor(98 * easeOut),
        languages: 22
      });
      
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center px-4 sm:px-6 lg:px-16 pb-16 lg:pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-7xl z-10">
        {/* LEFT TEXT */}
        <div className="max-w-5xl text-left mt-16 lg:mt-0 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              India's #1 AI Language Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Master Any{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
              Indian Language
            </span>
            <br />
            With AI-Powered Learning
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
            Join <span className="font-bold text-gray-900 dark:text-white">{animatedStats.users.toLocaleString()}+</span> learners mastering 22 languages with real-time pronunciation feedback and personalized AI coaching.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">4.9/5</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">(2.5K+ reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Users className="w-5 h-5" />
              <span className="text-sm">{animatedStats.users.toLocaleString()}+ Active Learners</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => navigate("/lessons")}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Learning Free
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <button 
              onClick={() => navigate("/features")}
              className="px-8 py-4 rounded-full bg-white/90 dark:bg-white/5 backdrop-blur-xl text-gray-900 dark:text-white border-2 border-gray-300 dark:border-white/20 font-semibold text-lg hover:border-purple-400 dark:hover:border-purple-400 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Watch Demo →
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{animatedStats.accuracy}%</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">AI Accuracy</p>
            </div>
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{animatedStats.languages}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Languages</p>
            </div>
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">10K+</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Users</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Enhanced Cards */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-auto mt-8 lg:mt-0">
          {/* Main Feature Card */}
          <div className="relative bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl px-8 py-8 shadow-2xl w-full max-w-md lg:w-[500px] transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/20">
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
              <Star className="w-4 h-4 fill-white" />
              Best AI Score
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white dark:border-[#0C0F1D]">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Pronunciation Analysis
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                  98% Accuracy Match
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Real-time feedback</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Pronunciation</span>
                <span className="font-bold text-gray-900 dark:text-white">98%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-shimmer"
                  style={{ width: "98%" }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fluency</span>
                <span className="font-bold text-gray-900 dark:text-white">95%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Floating Testimonial Card - Hidden on mobile to save space */}
          <div className="hidden lg:block bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl px-6 py-4 w-full max-w-md lg:w-[450px] transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                R
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Rahul Sharma</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Best language learning app! The AI feedback is incredible. I learned Hindi in just 2 months!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
