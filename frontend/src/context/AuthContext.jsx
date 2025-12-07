import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      const userStr = localStorage.getItem("user");
      
      if (token && userStr) {
        try {
          // Verify token by fetching user data
          const response = await authService.getMe();
          if (response.success) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
          }
        } catch (error) {
          // If getMe fails, try to use stored user data
          try {
            const storedUser = JSON.parse(userStr);
            setUser(storedUser);
            setIsAuthenticated(true);
          } catch {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await authService.signup(name, email, password);
      
      if (response.success) {
        // Store user details and token
        if (response.data.user && response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("authToken", response.data.token);
          // Update state synchronously
          setUser(response.data.user);
          setIsAuthenticated(true);
          // Force a small delay to ensure state is updated
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        // Store user profile and JWT token
        if (response.data.user && response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("authToken", response.data.token);
          // Update state synchronously
          setUser(response.data.user);
          setIsAuthenticated(true);
          // Force a small delay to ensure state is updated
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getMe();
      if (response.success) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        return { success: true, user: response.data };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginTime");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserData = (newData) => {
    const updatedUser = { ...user, ...newData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signup,
        login,
        logout,
        updateUserData,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
