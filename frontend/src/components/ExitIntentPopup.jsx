import { useState, useEffect } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has seen popup before
    const hasSeenPopup = localStorage.getItem("exitIntentShown");
    if (hasSeenPopup) return;

    const handleMouseLeave = (e) => {
      // Only trigger when mouse leaves from top of page
      if (e.clientY <= 0 && !showPopup) {
        setShowPopup(true);
        localStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#0C0F1D] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-white/10 relative animate-scale-in">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Wait! Don't Miss Out! 🎁
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Get <span className="font-bold text-purple-600 dark:text-purple-400">20% OFF</span> your first month when you sign up today!
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                navigate("/signup");
                setShowPopup(false);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Claim My Discount →
            </button>
            
            <button
              onClick={() => setShowPopup(false)}
              className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
            >
              No thanks, I'll pass
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span>Limited time offer - Expires in 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}

