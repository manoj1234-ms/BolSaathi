import { useState, useRef } from "react";
import { Mic, Play, Pause, RotateCcw } from "lucide-react";

export default function PronunciationDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phrase, setPhrase] = useState("नमस्ते"); // Hello in Hindi
  const audioRef = useRef(null);

  const phrases = [
    { text: "नमस्ते", language: "Hindi", meaning: "Hello" },
    { text: "ধন্যবাদ", language: "Bengali", meaning: "Thank you" },
    { text: "வணக்கம்", language: "Tamil", meaning: "Hello" },
    { text: "नमस्कार", language: "Marathi", meaning: "Greetings" },
  ];

  const handleRecord = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setScore(null);
      // Simulate recording (in real app, this would use Web Audio API)
      setTimeout(() => {
        setIsRecording(false);
        setIsAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => {
          const randomScore = 85 + Math.floor(Math.random() * 13); // 85-98
          setScore(randomScore);
          setIsAnalyzing(false);
        }, 2000);
      }, 3000);
    }
  };

  const handleReset = () => {
    setIsRecording(false);
    setScore(null);
    setIsAnalyzing(false);
  };

  const selectPhrase = (selectedPhrase) => {
    setPhrase(selectedPhrase.text);
    handleReset();
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Try AI Pronunciation Feedback
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Speak the phrase and get instant feedback
        </p>
      </div>

      {/* Phrase Selector */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Choose a phrase to practice:
        </p>
        <div className="flex flex-wrap gap-2">
          {phrases.map((p, index) => (
            <button
              key={index}
              onClick={() => selectPhrase(p)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                phrase === p.text
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10"
              }`}
            >
              <div className="text-lg">{p.text}</div>
              <div className="text-xs opacity-80">{p.language}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Phrase */}
      <div className="bg-white/90 dark:bg-[#0C0F1D]/90 rounded-2xl p-6 mb-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pronounce:</p>
        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {phrase}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {phrases.find(p => p.text === phrase)?.meaning}
        </p>
      </div>

      {/* Recording Button */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <button
          onClick={handleRecord}
          disabled={isRecording || isAnalyzing}
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all touch-manipulation ${
            isRecording
              ? "bg-red-500 animate-pulse"
              : isAnalyzing
              ? "bg-yellow-500"
              : "bg-gradient-to-r from-blue-500 to-purple-500 active:scale-95"
          } shadow-2xl disabled:opacity-50`}
        >
          {isRecording ? (
            <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          ) : isAnalyzing ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          )}
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isRecording
            ? "Recording... Speak now!"
            : isAnalyzing
            ? "Analyzing your pronunciation..."
            : score
            ? "Click to try again"
            : "Click to start recording"}
        </p>
      </div>

      {/* Score Display */}
      {score !== null && (
        <div className="bg-white/90 dark:bg-[#0C0F1D]/90 rounded-2xl p-6 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Your Pronunciation Score
            </p>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={score >= 95 ? "url(#greenGradient)" : score >= 85 ? "url(#blueGradient)" : "url(#orangeGradient)"}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {score}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {score >= 95 ? "Excellent!" : score >= 85 ? "Good!" : "Practice more"}
                </span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

