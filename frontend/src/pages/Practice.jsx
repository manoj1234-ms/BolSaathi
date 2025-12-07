import { useState, useContext, useRef } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { Mic, Play, Square, Upload, BarChart3, Volume2, Sparkles, AlertCircle } from "lucide-react";
import { analyzePronunciation } from "../services/aiService";

const Practice = () => {
  const { user } = useContext(AuthContext);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [score, setScore] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  // Mock practice phrases
  const phrases = [
    { id: 1, text: "नमस्ते, मैं कैसे आपकी मदद कर सकता हूं?", english: "Hello, how can I help you?", language: "Hindi" },
    { id: 2, text: "আপনি কেমন আছেন?", english: "How are you?", language: "Bengali" },
    { id: 3, text: "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?", english: "Hello, how are you?", language: "Tamil" },
  ];

  const [selectedPhrase, setSelectedPhrase] = useState(phrases[0]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        // Handle audio blob (upload to server, analyze, etc.)
        console.log("Recording stopped", blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      const timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      mediaRecorder.onstop = () => {
        clearInterval(timer);
        setIsRecording(false);
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to record");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // AI-powered pronunciation analysis
      setTimeout(() => {
        const analysis = analyzePronunciation(null, selectedPhrase.text);
        setScore({
          accuracy: analysis.accuracy,
          pronunciation: analysis.pronunciation,
          fluency: analysis.fluency,
          overall: analysis.accuracy,
          feedback: analysis.feedback,
          mistakes: analysis.mistakes,
        });
      }, 1500);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Practice Pronunciation
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Record yourself and get AI-powered feedback
            </p>
          </div>

          {/* Practice Phrase Card */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-8 shadow-lg mb-6">
            <div className="text-center mb-6">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm rounded-full font-semibold">
                {selectedPhrase.language}
              </span>
            </div>

            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedPhrase.text}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {selectedPhrase.english}
              </p>
            </div>

            <button
              onClick={() => {
                // Play pronunciation
                if (audioRef.current) {
                  audioRef.current.play();
                }
              }}
              className="mx-auto flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition"
            >
              <Volume2 className="w-5 h-5" />
              Listen to Pronunciation
            </button>
            <audio ref={audioRef} src="" style={{ display: "none" }} />
          </div>

          {/* Recording Section */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-8 shadow-lg mb-6">
            <div className="text-center">
              {!isRecording && !score && (
                <button
                  onClick={startRecording}
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center mx-auto mb-4"
                >
                  <Mic className="w-12 h-12" />
                </button>
              )}

              {isRecording && (
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full bg-red-500 text-white shadow-2xl animate-pulse flex items-center justify-center mx-auto mb-4">
                    <Square className="w-12 h-12" />
                  </div>
                  <p className="text-3xl font-bold text-red-500 mb-2">{formatTime(recordingTime)}</p>
                  <p className="text-gray-600 dark:text-gray-400">Recording...</p>
                  <button
                    onClick={stopRecording}
                    className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    Stop Recording
                  </button>
                </div>
              )}

              {score && !isRecording && (
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-12 h-12" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI Analysis</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accuracy</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{score.accuracy}%</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pronunciation</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{score.pronunciation}%</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fluency</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{score.fluency}%</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-4">
                      <p className="text-sm text-white mb-1">Overall</p>
                      <p className="text-2xl font-bold text-white">{score.overall}%</p>
                    </div>
                  </div>

                  {/* AI Feedback */}
                  {score.feedback && score.feedback.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        AI Feedback
                      </p>
                      <ul className="space-y-1">
                        {score.feedback.map((fb, idx) => (
                          <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{fb}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Mistakes */}
                  {score.mistakes && score.mistakes.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        Areas to Improve
                      </p>
                      <div className="space-y-2">
                        {score.mistakes.map((mistake, idx) => (
                          <div key={idx} className="text-sm">
                            <p className="font-semibold text-gray-900 dark:text-white">{mistake.word}</p>
                            <p className="text-gray-600 dark:text-gray-400">{mistake.issue}</p>
                            <p className="text-blue-600 dark:text-blue-400">{mistake.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setScore(null);
                        setRecordingTime(0);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => setSelectedPhrase(phrases[Math.floor(Math.random() * phrases.length)])}
                      className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-white/20 transition"
                    >
                      Next Phrase
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Practice Phrases List */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice Phrases</h3>
            <div className="space-y-3">
              {phrases.map((phrase) => (
                <button
                  key={phrase.id}
                  onClick={() => {
                    setSelectedPhrase(phrase);
                    setScore(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedPhrase.id === phrase.id
                      ? "border-purple-400 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-white/5 hover:border-purple-300"
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{phrase.text}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{phrase.english}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Practice;

