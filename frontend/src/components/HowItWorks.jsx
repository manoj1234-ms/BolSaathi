import { UserPlus, Languages, Mic, Trophy, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Sign Up Free",
      description: "Create your account in 30 seconds. No credit card required. Start your 7-day free trial immediately.",
      color: "from-blue-400 to-blue-600",
    },
    {
      number: 2,
      icon: Languages,
      title: "Choose Your Language",
      description: "Select from 22 Indian languages. Our AI will assess your current level and create a personalized learning path.",
      color: "from-purple-400 to-purple-600",
    },
    {
      number: 3,
      icon: Mic,
      title: "Practice & Learn",
      description: "Engage with interactive lessons, practice pronunciation with real-time AI feedback, and chat with our AI tutor.",
      color: "from-pink-400 to-pink-600",
    },
    {
      number: 4,
      icon: Trophy,
      title: "Track & Master",
      description: "Monitor your progress, earn XP, unlock achievements, and watch your fluency improve day by day.",
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#060818]/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              🚀 Getting Started
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              BolSaathi
            </span>{" "}
            Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master any Indian language in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-green-500 opacity-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Step Card */}
                  <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative z-10">
                    {/* Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (Desktop, not last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-3 z-20">
                      <ArrowRight className="w-6 h-6 text-purple-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => (window.location.href = "/signup")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl inline-flex items-center gap-2"
          >
            Start Learning Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

