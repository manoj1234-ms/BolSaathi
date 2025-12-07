import axios from "axios";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.bolsaathi.com/api";

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
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || error.response.data?.error || "Something went wrong. Please try again.";
  } else if (error.request) {
    // Request made but no response received
    return "Network error. Please check your internet connection.";
  } else {
    // Error setting up request
    return error.message || "An unexpected error occurred.";
  }
};

// ============================================
// 1. AUTHENTICATION APIs
// ============================================

export const authService = {
  // 1.1 Create Account
  signup: async (name, email, password) => {
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
