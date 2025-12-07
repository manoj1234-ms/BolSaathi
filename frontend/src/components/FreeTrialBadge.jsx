import { Gift, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FreeTrialBadge() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-4 animate-bounce-in">
      <div className="flex items-center gap-2">
        <Gift className="w-5 h-5" />
        <span className="font-bold text-sm sm:text-base">
          🎉 7-Day Free Trial - No Credit Card Required!
        </span>
      </div>
      <button
        onClick={() => navigate("/signup")}
        className="bg-white text-purple-600 px-4 py-1.5 rounded-full font-bold text-sm hover:scale-105 transition-transform"
      >
        Start Now
      </button>
      <button
        onClick={() => setIsVisible(false)}
        className="hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

