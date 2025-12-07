import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { HelpCircle, MessageCircle, Send, Bot, Search, Book, Video, Mail, Phone, Sparkles } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { generateAIResponse } from "../services/aiService";

const Help = () => {
  const { user } = useContext(AuthContext);
  const { success } = useToast();
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI support assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        { q: "How do I start learning?", a: "Click on 'Lessons' in the navigation, select a language, and start with the first lesson." },
        { q: "How does AI pronunciation work?", a: "Record yourself speaking, and our AI analyzes your pronunciation in real-time." },
        { q: "Can I learn multiple languages?", a: "Yes! You can learn multiple languages simultaneously." },
      ],
    },
    {
      category: "Features",
      questions: [
        { q: "What is AI Chat?", a: "AI Chat lets you practice conversations with an AI tutor in your target language." },
        { q: "How does translation work?", a: "Use the Translation tool to translate text between 22 Indian languages with AI accuracy." },
        { q: "What are AI Games?", a: "AI Games are fun, interactive games that help you learn vocabulary and grammar." },
      ],
    },
    {
      category: "Account",
      questions: [
        { q: "How do I change my password?", a: "Go to Settings > Account to change your password." },
        { q: "Can I delete my account?", a: "Yes, contact support or go to Settings > Account > Delete Account." },
        { q: "How do I update my profile?", a: "Go to Profile or Settings to update your information." },
      ],
    },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    // AI response
    setTimeout(() => {
      const aiData = generateAIResponse(input, "friendly", { context: "support" });
      const aiResponse = {
        id: chatMessages.length + 2,
        role: "assistant",
        content: aiData.message || "I understand your question. Let me help you with that. Can you provide more details?",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "How do I start learning?",
    "How does pronunciation practice work?",
    "Can I use this on mobile?",
    "How do I change my language?",
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HelpCircle className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Help & Support
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Get help from our AI assistant or browse FAQs
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-white/10">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === "chat"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 border-b-2 border-purple-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              AI Chat Support
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === "faq"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 border-b-2 border-purple-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Book className="w-5 h-5 inline mr-2" />
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === "contact"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 border-b-2 border-purple-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Mail className="w-5 h-5 inline mr-2" />
              Contact Us
            </button>
          </div>

          {/* AI Chat Support */}
          {activeTab === "chat" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl shadow-lg h-[600px] flex flex-col">
                  <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">AI Support Assistant</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Online • Usually replies instantly</p>
                    </div>
                    <div className="ml-auto">
                      <Sparkles className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
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
                        </div>

                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                              {user?.name?.charAt(0) || "U"}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
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
                  </div>

                  <div className="border-t border-gray-200 dark:border-white/10 p-4">
                    <form onSubmit={handleSend} className="flex gap-3">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 px-4 py-2 bg-white dark:bg-[#060818] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:scale-110 transition"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Quick Questions */}
              <div className="space-y-4">
                <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Questions</h3>
                  <div className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question)}
                        className="w-full text-left p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition text-sm text-gray-700 dark:text-gray-300"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Features
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ 24/7 available</li>
                    <li>✓ Instant responses</li>
                    <li>✓ Context-aware answers</li>
                    <li>✓ Learning guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-6">
              {faqs.map((category, catIdx) => (
                <div key={catIdx} className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIdx) => (
                      <div key={faqIdx} className="border-b border-gray-200 dark:border-white/10 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact Us */}
          {activeTab === "contact" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                <Mail className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                <a href="mailto:support@bolsaathi.com" className="text-blue-500 hover:underline">
                  support@bolsaathi.com
                </a>
              </div>

              <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg">
                <Phone className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Phone Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Call us for immediate assistance.</p>
                <a href="tel:+911234567890" className="text-blue-500 hover:underline">
                  +91 123 456 7890
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Help;

