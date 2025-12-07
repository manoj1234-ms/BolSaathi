import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { Languages, ArrowLeftRight, Copy, Volume2, Sparkles } from "lucide-react";
import { translateText } from "../services/aiService";
import { useToast } from "../context/ToastContext";
import { LANGUAGES } from "../utils/constants";

const Translation = () => {
  const { user } = useContext(AuthContext);
  const { success } = useToast();
  const [text, setText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");
  const [translation, setTranslation] = useState("");
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    setTranslating(true);
    // Simulate AI translation
    setTimeout(() => {
      const result = translateText(text, fromLang, toLang);
      setTranslation(result);
      setTranslating(false);
      success("Translation completed!");
    }, 1000);
  };

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    success("Copied to clipboard!");
  };

  const handleSwap = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
    setText(translation);
    setTranslation(text);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                AI Translation Assistant
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Translate text with AI-powered accuracy and context understanding
            </p>
          </div>

          {/* Language Selectors */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  From Language
                </label>
                <select
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-[#060818] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bengali</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>

              <button
                onClick={handleSwap}
                className="mt-6 p-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition"
                title="Swap languages"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  To Language
                </label>
                <select
                  value={toLang}
                  onChange={(e) => setToLang(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-[#060818] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bengali</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>
            </div>

            {/* Input Area */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Enter Text to Translate
              </label>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste text here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-[#060818] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400 resize-none"
                />
                {text && (
                  <button
                    onClick={() => handleCopy(text)}
                    className="absolute top-2 right-2 p-2 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={!text.trim() || translating}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Languages className="w-5 h-5" />
              {translating ? "Translating..." : "Translate"}
            </button>
          </div>

          {/* Translation Result */}
          {translation && (
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Translation</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Text to speech
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(translation);
                        utterance.lang = toLang === 'hi' ? 'hi-IN' : toLang === 'bn' ? 'bn-IN' : 'en-US';
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="p-2 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition"
                    title="Listen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(translation)}
                    className="p-2 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                <p className="text-gray-900 dark:text-white text-lg leading-relaxed">{translation}</p>
              </div>
            </div>
          )}

          {/* AI Features Info */}
          <div className="mt-6 bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI-Powered Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Context-aware translations</li>
              <li>✓ Cultural nuance understanding</li>
              <li>✓ Multiple translation options</li>
              <li>✓ Pronunciation guide</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Translation;

