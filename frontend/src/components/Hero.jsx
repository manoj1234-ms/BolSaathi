import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center px-4 sm:px-6 lg:px-16 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-5 w-full max-w-7xl z-10">
        {/* LEFT TEXT */}
        <div className="max-w-5xl text-left mt-16 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Learn Any <br />
            Language With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              AI
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-4 sm:mt-6">
            22 Indian Languages • Real-Time Voice Feedback • AI Pronunciation Scoring
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-10">
            <button 
              onClick={() => navigate("/lessons")}
              className="bg-gradient-to-r from-blue-400 to-purple-500 px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition"
            >
              Start Learning →
            </button>

            <button 
              onClick={() => navigate("/features")}
              className="px-8 py-3 rounded-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 hover:bg-gray-300 dark:hover:bg-white/20 transition"
            >
              Explore Features →
            </button>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="flex justify-center items-center w-full lg:w-auto mt-8 lg:mt-0">
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-6 sm:px-8 sm:py-6 shadow-xl w-full max-w-sm lg:w-[480px]">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" opacity="0.9">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" opacity="0.8" />
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Pronunciation Analysis
                </h3>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  98% Accuracy Match
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                  style={{ width: "98%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
