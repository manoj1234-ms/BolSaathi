import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Patel",
      role: "Software Engineer",
      image: "P",
      rating: 5,
      text: "BolSaathi helped me reconnect with my roots! The AI pronunciation feedback is incredibly accurate. I can now speak Gujarati confidently with my grandparents.",
      language: "Gujarati",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      id: 2,
      name: "Arjun Singh",
      role: "MBA Student",
      image: "A",
      rating: 5,
      text: "Best investment for language learning! The personalized learning path adapted to my pace perfectly. Learned Hindi in just 6 weeks with 30 minutes daily practice.",
      language: "Hindi",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 3,
      name: "Meera Krishnan",
      role: "Content Creator",
      image: "M",
      rating: 5,
      text: "The real-time voice analysis feature is mind-blowing! It catches even subtle pronunciation mistakes. My Tamil fluency improved dramatically in 2 months.",
      language: "Tamil",
      gradient: "from-green-400 to-teal-500"
    },
    {
      id: 4,
      name: "Ravi Kumar",
      role: "Business Owner",
      image: "R",
      rating: 5,
      text: "As someone who moved to Bangalore, learning Kannada was essential. BolSaathi made it fun and easy. The AI chat practice helped me gain confidence for real conversations.",
      language: "Kannada",
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 5,
      name: "Sneha Desai",
      role: "Teacher",
      image: "S",
      rating: 5,
      text: "I use BolSaathi to teach my students Marathi. The interactive lessons and games keep them engaged. The progress tracking feature helps me monitor their improvement.",
      language: "Marathi",
      gradient: "from-indigo-400 to-blue-500"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#060818]/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Loved by 10,000+ Learners
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Learners Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from real people mastering Indian languages with BolSaathi
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl transform transition-all duration-500">
            <Quote className="w-12 h-12 text-purple-400/30 mb-6" />
            
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${current.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0`}>
                {current.image}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {current.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{current.role}</p>
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${current.gradient} text-white text-sm rounded-full font-semibold`}>
                  Learning {current.language}
                </span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "{current.text}"
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 md:-translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#0C0F1D] border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center active:bg-purple-500 active:text-white transition-all duration-300 group touch-manipulation"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 group-active:text-white" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 md:translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#0C0F1D] border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center active:bg-purple-500 active:text-white transition-all duration-300 group touch-manipulation"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 group-active:text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-500 w-8"
                    : "bg-gray-300 dark:bg-white/20 hover:bg-purple-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-200 dark:border-white/10">
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              4.9/5
            </div>
            <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
              2.5K+
            </div>
            <p className="text-gray-600 dark:text-gray-400">Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-2">
              98%
            </div>
            <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
              10K+
            </div>
            <p className="text-gray-600 dark:text-gray-400">Happy Learners</p>
          </div>
        </div>
      </div>
    </section>
  );
}

