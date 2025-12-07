import { Check, X } from "lucide-react";

export default function ComparisonTable() {
  const features = [
    {
      feature: "AI-Powered Pronunciation Feedback",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "Real-Time Voice Analysis",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "Personalized Learning Path",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "22 Indian Languages",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "Learn at Your Own Pace",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "Instant Feedback & Scoring",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "24/7 Availability",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "Progress Tracking & Analytics",
      bolsaathi: true,
      traditional: "Limited",
    },
    {
      feature: "Cultural Context Integration",
      bolsaathi: true,
      traditional: false,
    },
    {
      feature: "Cost Per Month",
      bolsaathi: "₹299/month",
      traditional: "₹2000-5000/month",
    },
    {
      feature: "Time to Fluency",
      bolsaathi: "2-3 months",
      traditional: "6-12 months",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10 bg-gray-50/50 dark:bg-[#060818]/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
              ⚡ Why Choose BolSaathi?
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            BolSaathi vs{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Traditional Learning
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how AI-powered learning compares to traditional methods
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-200 dark:border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1">
                        BolSaathi
                      </div>
                      <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-semibold">
                        Recommended
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-400">
                    Traditional Classes
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.bolsaathi === true ? (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-500" />
                          </div>
                        </div>
                      ) : item.bolsaathi === false ? (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        </div>
                      ) : (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold">
                          {item.bolsaathi}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                      {item.traditional === true ? (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-500" />
                          </div>
                        </div>
                      ) : item.traditional === false ? (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        </div>
                      ) : (
                        <span>{item.traditional}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Footer */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-lg">
                Ready to Start Learning?
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Join thousands of successful learners today
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Start Free Trial →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

