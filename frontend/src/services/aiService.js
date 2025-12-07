// AI Service - Mock AI functions for language learning
// In production, these would call actual AI APIs

// AI Personality Types
export const AI_PERSONALITIES = {
  friendly: {
    name: "Friendly Tutor",
    greeting: "Hi! I'm here to help you learn! 😊",
    style: "casual and encouraging",
    emoji: "😊"
  },
  professional: {
    name: "Professional Tutor",
    greeting: "Hello. I'm your language tutor. Let's begin.",
    style: "formal and structured",
    emoji: "👔"
  },
  enthusiastic: {
    name: "Enthusiastic Tutor",
    greeting: "Hey there! Ready to learn something amazing today? 🚀",
    style: "energetic and motivational",
    emoji: "🚀"
  }
};

// Generate AI response based on user input
export const generateAIResponse = (userMessage, personality = "friendly", context = {}) => {
  const personalityData = AI_PERSONALITIES[personality] || AI_PERSONALITIES.friendly;
  
  // Mock AI responses - In production, use OpenAI/Anthropic API
  const responses = [
    `Great! "${userMessage}" is a good phrase. Let me help you practice more. Try saying: "Can you help me learn more phrases?"`,
    `Excellent! I see you're learning "${userMessage}". Here's a tip: Practice this phrase 3 times a day for better retention.`,
    `Nice! "${userMessage}" is commonly used. Want to learn similar phrases?`,
    `Good job! "${userMessage}" - Let's practice pronunciation. Repeat after me.`,
    `Perfect! "${userMessage}" - Now let's use it in a sentence. Try: "I want to say ${userMessage}."`
  ];
  
  return {
    message: responses[Math.floor(Math.random() * responses.length)],
    personality: personalityData,
    suggestions: [
      "Can you give me more examples?",
      "How do I pronounce this correctly?",
      "What's the grammar rule here?",
      "Show me similar phrases"
    ]
  };
};

// Generate practice sentences
export const generatePracticeSentences = (topic, language, difficulty = "beginner", count = 5) => {
  const sentences = {
    beginner: [
      "Hello, how are you?",
      "What is your name?",
      "I am learning [language]",
      "Thank you very much",
      "Can you help me?"
    ],
    intermediate: [
      "I would like to order food",
      "Where is the nearest station?",
      "Could you please repeat that?",
      "I don't understand",
      "What does this word mean?"
    ],
    advanced: [
      "I'm interested in learning about your culture",
      "Could you explain the cultural significance?",
      "I find this language fascinating",
      "What are some common idioms?",
      "How do native speakers use this phrase?"
    ]
  };
  
  return sentences[difficulty] || sentences.beginner;
};

// Generate vocabulary list
export const generateVocabularyList = (topic, language, count = 10) => {
  return [
    { word: "Hello", translation: "नमस्ते", pronunciation: "Namaste", example: "Hello, how are you?" },
    { word: "Thank you", translation: "धन्यवाद", pronunciation: "Dhanyavad", example: "Thank you for helping" },
    { word: "Please", translation: "कृपया", pronunciation: "Kripaya", example: "Please help me" },
    { word: "Yes", translation: "हाँ", pronunciation: "Haan", example: "Yes, I understand" },
    { word: "No", translation: "नहीं", pronunciation: "Nahi", example: "No, thank you" }
  ].slice(0, count);
};

// Analyze pronunciation
export const analyzePronunciation = (audioBlob, targetText) => {
  // Mock analysis - In production, use speech recognition API
  return {
    accuracy: Math.floor(85 + Math.random() * 15),
    pronunciation: Math.floor(80 + Math.random() * 20),
    fluency: Math.floor(75 + Math.random() * 25),
    feedback: [
      "Good pronunciation overall!",
      "Try to emphasize the second syllable more",
      "Your accent is improving",
      "Practice the 'r' sound more"
    ],
    mistakes: [
      { word: "example", issue: "Pronunciation", suggestion: "Say 'eg-ZAM-pul' not 'EX-am-pul'" }
    ]
  };
};

// Generate personalized learning path
export const generateLearningPath = (userLevel, goals, languages) => {
  return {
    path: [
      { week: 1, focus: "Basic Greetings", lessons: 5, xp: 250 },
      { week: 2, focus: "Numbers and Colors", lessons: 5, xp: 250 },
      { week: 3, focus: "Daily Conversations", lessons: 6, xp: 300 },
      { week: 4, focus: "Grammar Basics", lessons: 6, xp: 300 }
    ],
    estimatedCompletion: "4 weeks",
    dailyGoal: "30 minutes",
    weeklyGoal: "3.5 hours"
  };
};

// Get AI recommendations
export const getAIRecommendations = (userProgress, preferences) => {
  return {
    nextLesson: "Basic Greetings - Lesson 3",
    practiceAreas: ["Pronunciation", "Vocabulary"],
    suggestedContent: [
      { type: "Lesson", title: "Family Members", reason: "Based on your progress" },
      { type: "Practice", title: "Pronunciation Drill", reason: "Improve your accent" }
    ],
    tips: [
      "Practice 15 minutes daily for best results",
      "Review previous lessons before starting new ones",
      "Focus on pronunciation this week"
    ]
  };
};

// Translate text
export const translateText = (text, fromLang, toLang) => {
  // Mock translation - In production, use translation API
  const translations = {
    "Hello": { hi: "नमस्ते", en: "Hello", bn: "নমস্কার", ta: "வணக்கம்" },
    "Thank you": { hi: "धन्यवाद", en: "Thank you", bn: "ধন্যবাদ", ta: "நன்றி" }
  };
  
  return translations[text]?.[toLang] || `[Translation of "${text}" to ${toLang}]`;
};

// Generate reading comprehension
export const generateReadingComprehension = (level, topic) => {
  return {
    passage: "This is a sample reading passage. In a real application, this would be generated by AI based on the user's level and interests.",
    questions: [
      { question: "What is the main topic?", options: ["A", "B", "C", "D"], correct: 0 },
      { question: "What does the passage suggest?", options: ["A", "B", "C", "D"], correct: 1 }
    ],
    vocabulary: ["word1", "word2", "word3"],
    difficulty: level
  };
};

// Analyze writing
export const analyzeWriting = (text, language) => {
  return {
    score: Math.floor(75 + Math.random() * 25),
    grammar: Math.floor(70 + Math.random() * 30),
    vocabulary: Math.floor(75 + Math.random() * 25),
    suggestions: [
      "Use more varied sentence structures",
      "Add more descriptive words",
      "Check your grammar in sentence 3"
    ],
    corrections: [
      { original: "I go to school", corrected: "I go to the school", reason: "Missing article" }
    ]
  };
};

// Generate games
export const generateLanguageGame = (type, difficulty, language) => {
  const games = {
    wordMatch: {
      type: "Word Match",
      instructions: "Match the word with its translation",
      pairs: [
        { word: "Hello", translation: "नमस्ते" },
        { word: "Thank you", translation: "धन्यवाद" }
      ]
    },
    fillBlank: {
      type: "Fill in the Blank",
      instructions: "Complete the sentence",
      sentences: [
        { text: "I ___ learning Hindi", options: ["am", "is", "are"], correct: 0 }
      ]
    },
    pronunciation: {
      type: "Pronunciation Challenge",
      instructions: "Repeat the phrase correctly",
      phrases: ["Hello, how are you?", "Thank you very much"]
    }
  };
  
  return games[type] || games.wordMatch;
};

// Predict progress
export const predictProgress = (currentLevel, studyHours, consistency) => {
  const weeksToNextLevel = Math.ceil((100 - currentLevel) / (studyHours * consistency * 0.1));
  
  return {
    currentLevel,
    predictedLevel: Math.min(100, currentLevel + (studyHours * consistency * 0.1)),
    weeksToNextLevel,
    confidence: consistency > 0.7 ? "High" : consistency > 0.5 ? "Medium" : "Low",
    recommendations: consistency < 0.5 
      ? ["Increase study frequency", "Set daily reminders", "Join study groups"]
      : ["Keep up the good work!", "Try more challenging content", "Practice speaking more"]
  };
};

// Analyze errors
export const analyzeErrors = (userData) => {
  return {
    commonMistakes: [
      { mistake: "Grammar error in past tense", frequency: 15, suggestion: "Review past tense rules" },
      { mistake: "Pronunciation of 'r' sound", frequency: 12, suggestion: "Practice tongue placement" }
    ],
    weakAreas: ["Grammar", "Pronunciation"],
    strongAreas: ["Vocabulary", "Reading"],
    improvementRate: 15, // percentage
    recommendations: [
      "Focus on grammar this week",
      "Practice pronunciation daily",
      "Review vocabulary regularly"
    ]
  };
};

