import { useState, useRef, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { Send, Bot, User as UserIcon, Mic, Sparkles, Settings } from "lucide-react";
import { generateAIResponse, AI_PERSONALITIES } from "../services/aiService";
import { useToast } from "../context/ToastContext";

const AIChat = () => {
  const { user } = useContext(AuthContext);
  const { info } = useToast();
  const [personality, setPersonality] = useState("friendly");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: AI_PERSONALITIES[personality].greeting,
      timestamp: new Date(),
      suggestions: ["Let's practice greetings", "Teach me numbers", "Help with pronunciation"]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPersonalityMenu, setShowPersonalityMenu] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Generate AI response with personality
    setTimeout(() => {
      const aiData = generateAIResponse(input, personality, { user });
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: aiData.message,
        timestamp: new Date(),
        suggestions: aiData.suggestions,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    info(`Try: "${suggestion}"`);
  };

  const handlePersonalityChange = (newPersonality) => {
    setPersonality(newPersonality);
    setShowPersonalityMenu(false);
    const newGreeting = {
      id: messages.length + 1,
      role: "assistant",
      content: AI_PERSONALITIES[newPersonality].greeting,
      timestamp: new Date(),
      suggestions: ["Let's start learning!", "What would you like to practice?"]
    };
    setMessages([...messages, newGreeting]);
    info(`Switched to ${AI_PERSONALITIES[newPersonality].name}`);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
                  AI Conversation Practice
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Practice conversations with your AI language tutor
                </p>
              </div>
              
              {/* Personality Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowPersonalityMenu(!showPersonalityMenu)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition"
                  title="Change AI Personality"
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                {showPersonalityMenu && (
                  <div className="absolute right-0 top-12 bg-white dark:bg-[#0C0F1D] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl p-2 z-50 min-w-[200px]">
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">AI Personality</p>
                    {Object.entries(AI_PERSONALITIES).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => handlePersonalityChange(key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          personality === key
                            ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className="mr-2">{value.emoji}</span>
                        {value.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Current Personality Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 rounded-full">
              <span>{AI_PERSONALITIES[personality].emoji}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {AI_PERSONALITIES[personality].name} - {AI_PERSONALITIES[personality].style}
              </span>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl shadow-lg h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                        : "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === "user" ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs px-2 py-1 bg-white/20 dark:bg-white/10 rounded-full hover:bg-white/30 transition"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-white/10 p-4">
              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white dark:bg-[#060818] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400"
                />
                <button
                  type="button"
                  className="p-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition"
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:scale-110 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIChat;

