import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { Gamepad2, Sparkles, Trophy, RotateCcw, CheckCircle, X } from "lucide-react";
import { generateLanguageGame } from "../services/aiService";
import { useToast } from "../context/ToastContext";

const AIGames = () => {
  const { user } = useContext(AuthContext);
  const { success, error } = useToast();
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [gameComplete, setGameComplete] = useState(false);

  const gameTypes = [
    { id: "wordMatch", name: "Word Match", description: "Match words with translations", icon: "🔤", color: "from-blue-400 to-purple-500" },
    { id: "fillBlank", name: "Fill in the Blank", description: "Complete sentences", icon: "📝", color: "from-purple-400 to-pink-500" },
    { id: "pronunciation", name: "Pronunciation Challenge", description: "Practice pronunciation", icon: "🎤", color: "from-green-400 to-teal-500" },
  ];

  const startGame = (gameType) => {
    const game = generateLanguageGame(gameType, "beginner", "Hindi");
    setSelectedGame(gameType);
    setGameData(game);
    setScore(0);
    setSelectedAnswers({});
    setGameComplete(false);
    success(`Started ${gameTypes.find(g => g.id === gameType)?.name}!`);
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    if (gameComplete) return;
    
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answerIndex });
    
    if (selectedGame === "wordMatch") {
      // Check if pair is correct
      const pair = gameData.pairs[questionIndex];
      const isCorrect = answerIndex === questionIndex;
      if (isCorrect) {
        setScore(score + 10);
        success("Correct match!");
      } else {
        error("Wrong match! Try again.");
      }
    } else if (selectedGame === "fillBlank") {
      const sentence = gameData.sentences[questionIndex];
      const isCorrect = answerIndex === sentence.correct;
      if (isCorrect) {
        setScore(score + 10);
        success("Correct answer!");
      } else {
        error("Wrong answer! Try again.");
      }
    }

    // Check if all questions answered
    const totalQuestions = selectedGame === "wordMatch" ? gameData.pairs.length : gameData.sentences.length;
    if (Object.keys(selectedAnswers).length + 1 >= totalQuestions) {
      setGameComplete(true);
      success(`Game complete! Your score: ${score + (selectedAnswers[questionIndex] === answerIndex ? 10 : 0)}`);
    }
  };

  const resetGame = () => {
    startGame(selectedGame);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                AI Language Games
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Learn languages through fun AI-generated games
            </p>
          </div>

          {!selectedGame ? (
            /* Game Selection */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gameTypes.map((game) => (
                <div
                  key={game.id}
                  className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg hover:scale-105 transition-all cursor-pointer"
                  onClick={() => startGame(game.id)}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center text-3xl mb-4 mx-auto`}>
                    {game.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                    {game.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    {game.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-2 rounded-lg hover:scale-105 transition">
                    Play Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Game Play Area */
            <div className="space-y-6">
              {/* Game Header */}
              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Gamepad2 className="w-6 h-6" />
                      {gameTypes.find(g => g.id === selectedGame)?.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {gameData?.instructions}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{score}</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedGame(null);
                        setGameData(null);
                      }}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      Back to Games
                    </button>
                  </div>
                </div>
              </div>

              {/* Word Match Game */}
              {selectedGame === "wordMatch" && gameData && (
                <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gameData.pairs.map((pair, index) => (
                      <div key={index} className="space-y-3">
                        <div className="p-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg text-center font-semibold">
                          {pair.word}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {gameData.pairs.map((p, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(index, idx)}
                              disabled={gameComplete || selectedAnswers[index] !== undefined}
                              className={`p-3 rounded-lg border-2 transition ${
                                selectedAnswers[index] === idx
                                  ? idx === index
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                    : "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-200 dark:border-white/10 hover:border-purple-400"
                              } ${gameComplete || selectedAnswers[index] !== undefined ? "opacity-60" : ""}`}
                            >
                              {p.translation}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fill in the Blank Game */}
              {selectedGame === "fillBlank" && gameData && (
                <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                  <div className="space-y-6">
                    {gameData.sentences.map((sentence, index) => {
                      const parts = sentence.text.split("___");
                      return (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                          <p className="text-lg text-gray-900 dark:text-white mb-4">
                            {parts[0]} <span className="font-bold text-purple-500">___</span> {parts[1]}
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {sentence.options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => handleAnswer(index, optIdx)}
                                disabled={gameComplete || selectedAnswers[index] !== undefined}
                                className={`p-3 rounded-lg border-2 transition ${
                                  selectedAnswers[index] === optIdx
                                    ? optIdx === sentence.correct
                                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                      : "border-red-500 bg-red-50 dark:bg-red-900/20"
                                    : "border-gray-200 dark:border-white/10 hover:border-purple-400"
                                } ${gameComplete || selectedAnswers[index] !== undefined ? "opacity-60" : ""}`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pronunciation Challenge */}
              {selectedGame === "pronunciation" && gameData && (
                <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                  <div className="space-y-4">
                    {gameData.phrases.map((phrase, index) => (
                      <div key={index} className="p-6 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                          {phrase}
                        </p>
                        <div className="flex justify-center gap-4">
                          <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition">
                            Record
                          </button>
                          <button className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-white/20 transition">
                            Listen
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Game Complete */}
              {gameComplete && (
                <div className="bg-gradient-to-r from-green-400/10 to-teal-500/10 border border-green-400/20 rounded-xl p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Game Complete! 🎉
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Your Score: <span className="font-bold text-green-500">{score}</span>
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={resetGame}
                      className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition flex items-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Play Again
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGame(null);
                        setGameData(null);
                      }}
                      className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-white/20 transition"
                    >
                      Back to Games
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AIGames;

