import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { FileText, Sparkles, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { analyzeWriting } from "../services/aiService";
import { useToast } from "../context/ToastContext";

const WritingAssistant = () => {
  const { user } = useContext(AuthContext);
  const { success, error } = useToast();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      error("Please enter some text to analyze");
      return;
    }

    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const result = analyzeWriting(text, language);
      setAnalysis(result);
      setAnalyzing(false);
      success("Writing analysis completed!");
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                AI Writing Assistant
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Get AI-powered feedback on your writing with grammar, vocabulary, and style suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Your Writing
                  </h2>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1 bg-white dark:bg-[#060818] border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="ta">Tamil</option>
                  </select>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your text here... The AI will analyze grammar, vocabulary, and style."
                  rows={15}
                  className="w-full px-4 py-3 bg-white dark:bg-[#060818] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400 resize-none font-mono text-sm"
                />

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {text.length} characters, {text.split(/\s+/).filter(Boolean).length} words
                  </span>
                  <button
                    onClick={handleAnalyze}
                    disabled={!text.trim() || analyzing}
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    {analyzing ? "Analyzing..." : "Analyze Writing"}
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              {/* Overall Score */}
              {analysis && (
                <>
                  <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Overall Score
                    </h3>
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        {analysis.score}%
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${analysis.score}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Grammar</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{analysis.grammar}%</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Vocabulary</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{analysis.vocabulary}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Corrections */}
                  {analysis.corrections && analysis.corrections.length > 0 && (
                    <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                        Corrections
                      </h3>
                      <div className="space-y-3">
                        {analysis.corrections.map((correction, index) => (
                          <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              <span className="line-through">{correction.original}</span>
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                              → {correction.corrected}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {correction.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Tips */}
              {!analysis && (
                <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">💡 Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Write at least 50 words for better analysis</li>
                    <li>• The AI checks grammar, vocabulary, and style</li>
                    <li>• Get suggestions for improvement</li>
                    <li>• Learn from corrections</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WritingAssistant;

