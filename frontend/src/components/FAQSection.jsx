import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does BolSaathi's AI pronunciation feedback work?",
      answer:
        "Our advanced AI analyzes your pronunciation in real-time, comparing it with native speaker patterns. You get instant feedback on accuracy, fluency, and intonation, helping you improve faster than traditional methods.",
    },
    {
      question: "Which languages does BolSaathi support?",
      answer:
        "BolSaathi supports all 22 scheduled Indian languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, and more. Each language has native script support and cultural context integration.",
    },
    {
      question: "Is BolSaathi suitable for beginners?",
      answer:
        "Absolutely! BolSaathi is designed for learners of all levels, from complete beginners to advanced speakers. Our AI adapts to your level and creates a personalized learning path that matches your pace and goals.",
    },
    {
      question: "How much does BolSaathi cost?",
      answer:
        "We offer flexible pricing plans starting from ₹299/month. There's also a 7-day free trial with no credit card required, so you can explore all features risk-free before committing.",
    },
    {
      question: "Can I learn multiple languages at once?",
      answer:
        "Yes! BolSaathi allows you to learn multiple languages simultaneously. Each language has its own progress tracking, so you can switch between languages as you like without losing your progress.",
    },
    {
      question: "Do I need any special equipment?",
      answer:
        "Just a smartphone, tablet, or computer with a microphone. BolSaathi works on all modern browsers and we also have mobile apps for iOS and Android coming soon.",
    },
    {
      question: "How accurate is the AI pronunciation scoring?",
      answer:
        "Our AI achieves 98% accuracy in pronunciation analysis, matching industry-leading standards. The system uses advanced machine learning models trained on thousands of native speaker recordings for each language.",
    },
    {
      question: "Can I track my learning progress?",
      answer:
        "Yes! BolSaathi provides comprehensive progress tracking including XP points, learning streaks, accuracy scores, lesson completion, and detailed analytics. You can see exactly how you're improving over time.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely. We use enterprise-grade encryption, are GDPR compliant, and never share your data with third parties. Your audio recordings are securely stored and can be deleted anytime from your settings.",
    },
    {
      question: "What if I'm not satisfied with BolSaathi?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not happy within the first 30 days, contact our support team for a full refund - no questions asked.",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              ❓ Got Questions?
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Questions
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about BolSaathi
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-gray-900 dark:text-white text-lg pr-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions? We're here to help!
          </p>
          <button
            onClick={() => (window.location.href = "/contact")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Contact Support →
          </button>
        </div>
      </div>
    </section>
  );
}

