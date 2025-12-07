import { Gift, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FreeTrialBadge() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 sm:gap-4 max-w-[95vw] animate-bounce-in">
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink">
        <Gift className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
          🎉 7-Day Free Trial!
        </span>
      </div>
      <button
        onClick={() => navigate("/signup")}
        className="bg-white text-purple-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-transform whitespace-nowrap flex-shrink-0 touch-manipulation"
      >
        Start Now
      </button>
      <button
        onClick={() => setIsVisible(false)}
        className="hover:bg-white/20 active:bg-white/30 rounded-full p-1 transition-colors flex-shrink-0 touch-manipulation"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

