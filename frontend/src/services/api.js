import axios from "axios";
import { localAuthService } from "./localAuth";
import { LANGUAGES } from "../utils/constants";

// API Configuration
// Use local storage mode by default (no backend required)
// Set VITE_USE_API_MODE=true to use API mode, or provide VITE_API_BASE_URL
const hasApiBaseUrl = import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim() !== "";
const useApiMode = import.meta.env.VITE_USE_API_MODE === "true" || hasApiBaseUrl;
const USE_LOCAL_MODE = !useApiMode; // Default to local mode
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.bolsaathi.com/api";

// Log API configuration in development
if (import.meta.env.DEV) {
  console.log("🔧 API Configuration:", {
    mode: USE_LOCAL_MODE ? "🔒 Local Storage Mode (No Backend)" : "🌐 API Mode",
    baseURL: USE_LOCAL_MODE ? "N/A (Using Local Storage)" : API_BASE_URL,
    hasApiBaseUrl: hasApiBaseUrl,
    useApiMode: useApiMode,
    USE_LOCAL_MODE: USE_LOCAL_MODE,
    note: USE_LOCAL_MODE 
      ? "✅ Authentication is handled locally using browser storage. No backend required!"
      : "To use local mode, remove VITE_API_BASE_URL or set VITE_USE_API_MODE=false",
  });
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log request for debugging (only in development)
    if (import.meta.env.DEV) {
      console.log("API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Error handler utility
export const handleApiError = (error) => {
  // Log error for debugging
  console.error("API Error:", {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    request: error.request,
    config: {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      method: error.config?.method,
    },
  });

  if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
    return "Request timeout. The server is taking too long to respond. Please try again.";
  }

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;
    
    if (status === 400) {
      return message || "Invalid request. Please check your input.";
    } else if (status === 401) {
      return message || "Authentication failed. Please check your credentials.";
    } else if (status === 403) {
      return message || "Access denied. You don't have permission to perform this action.";
    } else if (status === 404) {
      return message || "The requested resource was not found.";
    } else if (status === 500) {
      return message || "Server error. Please try again later.";
    } else {
      return message || `Server error (${status}). Please try again.`;
    }
  } else if (error.request) {
    // Request made but no response received
    if (error.message.includes("Network Error") || error.code === "ERR_NETWORK") {
      return `Cannot connect to the server. Please check if the API server is running at ${API_BASE_URL}. If you're running locally, make sure the backend server is started.`;
    }
    return "Network error. Please check your internet connection and try again.";
  } else {
    // Error setting up request
    return error.message || "An unexpected error occurred. Please try again.";
  }
};

// ============================================
// 1. AUTHENTICATION APIs
// ============================================

export const authService = {
  // 1.1 Create Account (with OTP)
  signup: async (name, email, phone, password) => {
    if (USE_LOCAL_MODE) {
      return await localAuthService.signup(name, email, password);
    }
    try {
      const response = await api.post("/auth/signup", { name, email, phone, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.2 Verify Signup OTP
  verifySignupOtp: async (email, otp) => {
    if (USE_LOCAL_MODE) {
      return { success: true, message: "OTP verified (local mode)" };
    }
    try {
      const response = await api.post("/auth/verify-signup", { email, otp });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.3 Resend Signup OTP
  resendSignupOtp: async (email) => {
    if (USE_LOCAL_MODE) {
      return { success: true, message: "OTP resent (local mode)" };
    }
    try {
      const response = await api.post("/auth/resend-signup-otp", { email });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.4 Login User (with OTP)
  login: async (email, password) => {
    if (USE_LOCAL_MODE) {
      return await localAuthService.login(email, password);
    }
    try {
      const response = await api.post("/auth/login", { email, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.5 Verify Login OTP
  verifyLoginOtp: async (email, otp) => {
    if (USE_LOCAL_MODE) {
      return { success: true, token: "local_token", user: {} };
    }
    try {
      const response = await api.post("/auth/verify-login", { email, otp });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.6 Resend Login OTP
  resendLoginOtp: async (email) => {
    if (USE_LOCAL_MODE) {
      return { success: true, message: "OTP resent (local mode)" };
    }
    try {
      const response = await api.post("/auth/resend-login-otp", { email });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.7 Get Logged-in User
  getMe: async () => {
    if (USE_LOCAL_MODE) {
      return await localAuthService.getMe();
    }
    try {
      const response = await api.get("/auth/me");
      return { success: true, data: response.data.user || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.8 Logout
  logout: async () => {
    if (USE_LOCAL_MODE) {
      return { success: true };
    }
    try {
      const response = await api.post("/auth/logout");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// 2. LANGUAGE & LESSON APIs
// ============================================

export const languageService = {
  // 2.1 Get All Supported Languages
  getAllLanguages: async () => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: LANGUAGES };
    }
    try {
      const response = await api.get("/lessons/languages");
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 2.2 Get Lessons of One Language
  getLessonsByLanguage: async (languageId) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: [] };
    }
    try {
      const response = await api.get(`/lessons/language/${languageId}`);
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 2.3 Get Details of a Lesson
  getLessonDetails: async (lessonId) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: null };
    }
    try {
      const response = await api.get(`/lessons/${lessonId}`);
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 2.4 Complete a Lesson
  completeLesson: async (lessonId, scores, xpEarned) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: {} };
    }
    try {
      const response = await api.post(`/lessons/${lessonId}/complete`, { scores, xpEarned });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// 3. AUDIO & RECORDING APIs (Firebase Storage)
// ============================================

export const recordingService = {
  // 3.1 Get All User Recordings
  getUserRecordings: async (language) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: [] };
    }
    try {
      const params = language ? { language } : {};
      const response = await api.get("/recordings", { params });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 3.2 Save Recording Metadata
  saveRecording: async (lessonId, languageId, title, audioUrl, duration, accuracy, pronunciation, fluency, feedback, mistakes) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: {} };
    }
    try {
      const response = await api.post("/recordings", {
        lessonId,
        languageId,
        title,
        audioUrl,
        duration,
        accuracy,
        pronunciation,
        fluency,
        feedback,
        mistakes,
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 3.3 Delete Recording
  deleteRecording: async (recordingId) => {
    if (USE_LOCAL_MODE) {
      return { success: true };
    }
    try {
      const response = await api.delete(`/recordings/${recordingId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// 4. AI INTEGRATION APIs
// ============================================

export const aiService = {
  // 4.1 Chat with AI (Conversation Practice)
  chat: async (userMessage, language, difficultyLevel) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: { message: "Local mode response" } };
    }
    try {
      const response = await api.post("/chat", {
        role: "user",
        content: userMessage,
        language,
        personality: "friendly",
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 4.2 Get Chat History
  getChatHistory: async (limit = 50) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: [] };
    }
    try {
      const response = await api.get("/chat", { params: { limit } });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 4.3 Save Chat Message
  saveChatMessage: async (role, content, personality, language, suggestions) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: {} };
    }
    try {
      const response = await api.post("/chat", {
        role,
        content,
        personality,
        language,
        suggestions,
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// Dashboard Service
export const dashboardService = {
  getDashboardStats: async () => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: {} };
    }
    try {
      const response = await api.get("/dashboard");
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// Game Service
export const gameService = {
  saveGameScore: async (gameType, language, difficulty, score, totalQuestions, correctAnswers) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: {} };
    }
    try {
      const response = await api.post("/games/score", {
        gameType,
        language,
        difficulty,
        score,
        totalQuestions,
        correctAnswers,
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  getUserGameScores: async (gameType, language) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: [] };
    }
    try {
      const params = {};
      if (gameType) params.gameType = gameType;
      if (language) params.language = language;
      const response = await api.get("/games/scores", { params });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// 5. USER PROGRESS APIs
// ============================================

export const progressService = {
  // 5.1 Get User Progress
  getUserProgress: async () => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: {} };
    }
    try {
      const response = await api.get("/progress");
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 5.2 Update Progress After Lesson
  updateProgress: async (lessonId, scores, xpEarned, languageId) => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: {} };
    }
    try {
      const response = await api.post("/progress/update", {
        lessonId,
        scores,
        xpEarned,
        languageId,
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// 6. GAMIFICATION APIs
// ============================================

export const badgeService = {
  // 6.1 Get All Badges
  getAllBadges: async () => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: [] };
    }
    try {
      const response = await api.get("/achievements");
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 6.2 Get Earned Badges for User
  getUserBadges: async () => {
    if (USE_LOCAL_MODE) {
      return { success: true, data: { achievements: [], stats: {} } };
    }
    try {
      const response = await api.get("/achievements/user");
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// 7. ADMIN PANEL APIs (Only Admin Users)
// ============================================

export const adminService = {
  // 7.1 Add New Language
  addLanguage: async (name, code) => {
    try {
      const response = await api.post("/admin/language/add", {
        name,
        code,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 7.2 Add New Lesson
  addLesson: async (languageId, title, prompt, level) => {
    try {
      const response = await api.post("/admin/lesson/add", {
        languageId,
        title,
        prompt,
        level,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 7.3 Update Lesson
  updateLesson: async (lessonId, lessonData) => {
    try {
      const response = await api.put(`/admin/lesson/update/${lessonId}`, lessonData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 7.4 Delete Lesson
  deleteLesson: async (lessonId) => {
    try {
      const response = await api.delete(`/admin/lesson/delete/${lessonId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 7.5 Get All Users
  getAllUsers: async () => {
    try {
      const response = await api.get("/admin/users");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// ADDITIONAL SERVICES (Contact, Newsletter)
// ============================================

export const contactService = {
  submit: async (formData) => {
    try {
      const response = await api.post("/contact", formData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

export const newsletterService = {
  subscribe: async (email) => {
    try {
      const response = await api.post("/newsletter/subscribe", { email });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

export default api;
