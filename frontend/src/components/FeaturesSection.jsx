import { ArrowRight, Mic, BarChart3, Globe, Users } from "lucide-react";
import PronunciationDemo from "./PronunciationDemo";

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "AI Voice Agent",
      description: "Elevate your learning experience with an intelligent AI assistant that listens and corrects you in real-time.",
      cta: "Try Demo",
      icon: Mic,
      graphic: (
        <div className="relative w-full h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="bg-purple-600/80 rounded-lg px-3 py-2 text-xs text-white">
              Hello!
            </div>
            <div className="bg-purple-600/80 rounded-lg px-3 py-2 text-xs text-white">
              How are you?
            </div>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2 shadow-lg">
              <Mic className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Pronunciation Score",
      description: "Get instant, accurate feedback on your pronunciation with detailed scoring metrics.",
      cta: "Smart Score",
      icon: BarChart3,
      graphic: (
        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="transform -rotate-90 w-24 h-24">
              <defs>
                <linearGradient id="pronunciationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="url(#pronunciationGradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - 0.98)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white text-xl font-bold">98%</span>
              <span className="text-gray-400 text-xs">Accuracy</span>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "22 Languages",
      description: "Comprehensive support for all 22 scheduled Indian languages with native nuances.",
      cta: "View All",
      icon: Globe,
      graphic: (
        <div className="relative w-full h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-4 flex flex-wrap gap-2 items-center justify-center">
          <div className="text-xs font-medium text-white bg-purple-600/60 px-2 py-1 rounded">हिंदी</div>
          <div className="text-xs font-medium text-white bg-blue-600/60 px-2 py-1 rounded">தமிழ்</div>
          <div className="text-xs font-medium text-white bg-purple-600/60 px-2 py-1 rounded">తెలుగు</div>
          <div className="text-xs font-medium text-white bg-blue-600/60 px-2 py-1 rounded">বাংলা</div>
          <div className="text-xs font-medium text-white bg-purple-600/60 px-2 py-1 rounded">ਪੰਜਾਬੀ</div>
          <div className="text-xs font-medium text-white bg-blue-600/60 px-2 py-1 rounded">മലയാളം</div>
          <button className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Native Support
          </button>
        </div>
      ),
    },
    {
      id: 4,
      title: "Community Hub",
      description: "Connect with fellow learners, share progress, and practice together in real-time.",
      cta: "Join Hub",
      icon: Users,
      graphic: (
        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              U1
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg -ml-3">
              U2
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold shadow-lg -ml-3">
              U3
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-lg -ml-3 border-2 border-white/20">
              +1k
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ✨ Powerful AI Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Intelligence Layer
            </span>{" "}
            of Your Learning
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Boutique AI tools designed for real language mastery. Choose from our crafted, specific learning applications.
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="mb-16">
          <PronunciationDemo />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-6 hover:border-purple-400 dark:hover:border-white/10 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Graphic */}
                <div className="mb-6">{feature.graphic}</div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* CTA Button */}
                <button className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                  <span className="font-medium">{feature.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

