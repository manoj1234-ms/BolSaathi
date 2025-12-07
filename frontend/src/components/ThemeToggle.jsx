import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-white/10 border border-white/20 flex items-center transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#060818]"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div
        className={`absolute w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 flex items-center justify-center ${
          isDark ? "left-0.5" : "left-6"
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-white" />
        ) : (
          <Sun className="w-3 h-3 text-white" />
        )}
      </div>
      <div className="flex items-center justify-between w-full px-1.5">
        <Sun
          className={`w-3 h-3 transition-opacity duration-300 ${
            isDark ? "opacity-40" : "opacity-100"
          } text-yellow-400`}
        />
        <Moon
          className={`w-3 h-3 transition-opacity duration-300 ${
            isDark ? "opacity-100" : "opacity-40"
          } text-blue-400`}
        />
      </div>
    </button>
  );
}

