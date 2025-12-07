// Local Storage-based Authentication Service
// This works entirely in the frontend without a backend server

// Storage keys
const USERS_STORAGE_KEY = "bolsaathi_users";
const TOKEN_STORAGE_KEY = "authToken";
const USER_STORAGE_KEY = "user";

// Generate a simple token (for local use only)
const generateToken = (userId) => {
  return `local_token_${userId}_${Date.now()}`;
};

// Get all users from localStorage
const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
    return [];
  }
};

// Save users to localStorage
const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

// Local Authentication Service
export const localAuthService = {
  // Signup - Create a new user
  signup: async (name, email, password) => {
    try {
      // Validation
      if (!name || !email || !password) {
        return {
          success: false,
          error: "Name, email, and password are required",
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters",
        };
      }

      if (!email.includes("@")) {
        return {
          success: false,
          error: "Please enter a valid email address",
        };
      }

      // Check if user already exists
      const users = getUsers();
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return {
          success: false,
          error: "User with this email already exists",
        };
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
      };

      // Save user
      users.push(newUser);
      saveUsers(users);

      // Generate token
      const token = generateToken(newUser.id);

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = newUser;

      return {
        success: true,
        data: {
          message: "Account created successfully",
          user: userWithoutPassword,
          token,
        },
      };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        error: "An error occurred during signup. Please try again.",
      };
    }
  },

  // Login - Authenticate user
  login: async (email, password) => {
    try {
      // Validation
      if (!email || !password) {
        return {
          success: false,
          error: "Email and password are required",
        };
      }

      // Find user
      const users = getUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }

      // Check password (simple comparison for local storage)
      if (user.password !== password) {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }

      // Generate token
      const token = generateToken(user.id);

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        data: {
          message: "Login successful",
          user: userWithoutPassword,
          token,
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "An error occurred during login. Please try again.",
      };
    }
  },

  // Get current user
  getMe: async () => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const userStr = localStorage.getItem(USER_STORAGE_KEY);

      if (!token || !userStr) {
        return {
          success: false,
          error: "Not authenticated",
        };
      }

      const user = JSON.parse(userStr);

      // Verify user still exists
      const users = getUsers();
      const existingUser = users.find((u) => u.id === user.id);

      if (!existingUser) {
        // User was deleted, clear storage
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
        return {
          success: false,
          error: "User not found",
        };
      }

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = existingUser;

      return {
        success: true,
        data: userWithoutPassword,
      };
    } catch (error) {
      console.error("Get me error:", error);
      return {
        success: false,
        error: "An error occurred. Please try again.",
      };
    }
  },
};

