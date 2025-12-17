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

  const signup = async (userData) => {
    try {
      const { name, email, phone, password } = userData;
      const response = await authService.signup(name, email, phone, password);
      
      if (response.success) {
        // OTP sent, return success to show OTP screen
        return { success: true, message: response.data?.message || "OTP sent to your email" };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifySignupOtp = async (email, otp) => {
    try {
      const response = await authService.verifySignupOtp(email, otp);
      if (response.success) {
        return { success: true, message: response.data?.message || "Email verified successfully" };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resendSignupOtp = async (email) => {
    try {
      const response = await authService.resendSignupOtp(email);
      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        // Check if OTP is needed
        if (response.data?.needsOTP) {
          return { success: true, needsOTP: true, message: response.data.message };
        }
        // If token provided directly (shouldn't happen with OTP flow)
        if (response.data.user && response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("authToken", response.data.token);
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifyLoginOtp = async (email, otp) => {
    try {
      const response = await authService.verifyLoginOtp(email, otp);
      if (response.success) {
        // Store token and user
        if (response.data.token && response.data.user) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resendLoginOtp = async (email) => {
    try {
      const response = await authService.resendLoginOtp(email);
      return response;
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

  const completeSignup = async (email, otp) => {
    return await verifySignupOtp(email, otp);
  };

  const completeLogin = async (email, otp) => {
    return await verifyLoginOtp(email, otp);
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
        completeSignup,
        completeLogin,
        verifySignupOtp,
        verifyLoginOtp,
        resendSignupOtp,
        resendLoginOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
