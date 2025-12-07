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
  // 1.1 Create Account
  signup: async (name, email, password) => {
    // Use local storage mode if enabled
    if (USE_LOCAL_MODE) {
      return await localAuthService.signup(name, email, password);
    }

    // Otherwise, use API
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.2 Login User
  login: async (email, password) => {
    // Use local storage mode if enabled
    if (USE_LOCAL_MODE) {
      return await localAuthService.login(email, password);
    }

    // Otherwise, use API
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 1.3 Get Logged-in User
  getMe: async () => {
    // Use local storage mode if enabled
    if (USE_LOCAL_MODE) {
      return await localAuthService.getMe();
    }

    // Otherwise, use API
    try {
      const response = await api.get("/auth/me");
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
    // Use local mode - return languages from constants
    if (USE_LOCAL_MODE) {
      return { success: true, data: LANGUAGES };
    }

    // Otherwise, use API
    try {
      const response = await api.get("/languages");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 2.2 Get Lessons of One Language
  getLessonsByLanguage: async (languageId) => {
    try {
      const response = await api.get(`/lessons/${languageId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 2.3 Get Details of a Lesson
  getLessonDetails: async (lessonId) => {
    try {
      const response = await api.get(`/lesson/${lessonId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

// ============================================
// 3. AUDIO & RECORDING APIs (Firebase Storage)
// ============================================

export const recordingService = {
  // 3.1 Get Upload URL for Firebase
  getUploadUrl: async (userId, lessonId, fileExtension) => {
    try {
      const response = await api.post("/upload/audio", {
        userId,
        lessonId,
        fileExtension, // mp3/wav
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 3.2 Save Recording Metadata
  saveRecording: async (userId, lessonId, audioUrl, aiFeedback) => {
    try {
      const response = await api.post("/recordings/save", {
        userId,
        lessonId,
        audioUrl,
        aiFeedback,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 3.3 Get All User Recordings
  getUserRecordings: async (userId) => {
    try {
      const response = await api.get(`/recordings/user/${userId}`);
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
  // 4.1 Analyze Audio & Generate Scores
  analyzeAudio: async (audioUrl, userId, lessonId) => {
    try {
      const response = await api.post("/ai/analyze", {
        audioUrl,
        userId,
        lessonId,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 4.2 Chat with AI (Conversation Practice)
  chat: async (userMessage, language, difficultyLevel) => {
    try {
      const response = await api.post("/ai/chat", {
        userMessage,
        language,
        difficultyLevel,
      });
      return { success: true, data: response.data };
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
  getUserProgress: async (userId) => {
    try {
      const response = await api.get(`/progress/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 5.2 Update Progress After Lesson
  updateProgress: async (userId, lessonId, scores, xpEarned) => {
    try {
      const response = await api.post("/progress/update", {
        userId,
        lessonId,
        scores,
        xpEarned,
      });
      return { success: true, data: response.data };
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
    try {
      const response = await api.get("/badges");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 6.2 Get Earned Badges for User
  getUserBadges: async (userId) => {
    try {
      const response = await api.get(`/badges/user/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // 6.3 Assign Badge
  earnBadge: async (userId, badgeId) => {
    try {
      const response = await api.post("/badges/earn", {
        userId,
        badgeId,
      });
      return { success: true, data: response.data };
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
