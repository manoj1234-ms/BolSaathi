import { useState, useEffect } from "react";
import { Users } from "lucide-react";

export default function LiveUserCounter() {
  const [currentUsers, setCurrentUsers] = useState(8473);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate live user count (update every 5-10 seconds)
    const interval = setInterval(() => {
      setCurrentUsers(prev => {
        // Random variation between -5 and +10
        const change = Math.floor(Math.random() * 15) - 5;
        return Math.max(8400, prev + change);
      });
    }, 7000);

    // Fade in animation
    setIsVisible(true);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 bg-white/95 dark:bg-[#0C0F1D]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 shadow-xl z-50 flex items-center gap-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative">
        <Users className="w-5 h-5 text-green-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        <span className="text-green-500">{currentUsers.toLocaleString()}</span> learning now
      </span>
    </div>
  );
}

