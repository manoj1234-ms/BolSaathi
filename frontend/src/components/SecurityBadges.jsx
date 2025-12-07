import { Shield, Lock, CheckCircle, Award } from "lucide-react";

export default function SecurityBadges() {
  const badges = [
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Your data is protected by European privacy standards",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Lock,
      title: "256-bit Encryption",
      description: "Military-grade security for all your information",
      color: "from-green-500 to-green-600",
    },
    {
      icon: CheckCircle,
      title: "100% Secure",
      description: "Enterprise-grade security infrastructure",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      title: "ISO Certified",
      description: "Certified for data security and privacy",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-16 relative z-10 bg-white/50 dark:bg-[#060818]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
            Trusted & Secure
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

