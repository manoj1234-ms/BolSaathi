import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Features from "../pages/Features";
import Languages from "../pages/Languages";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Dashboard from "../pages/Dashboard";
import Lessons from "../pages/Lessons";
import Practice from "../pages/Practice";
import Progress from "../pages/Progress";
import Recordings from "../pages/Recordings";
import Settings from "../pages/Settings";
import AIChat from "../pages/AIChat";
import Achievements from "../pages/Achievements";
import Profile from "../pages/Profile";
import Translation from "../pages/Translation";
import WritingAssistant from "../pages/WritingAssistant";
import AIGames from "../pages/AIGames";
import Help from "../pages/Help";
import { ProtectedRoute } from "../middleware/ProtectedRoute";

const RouteConfig = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={  
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features"
        element={  
          <ProtectedRoute>
            <Features />
          </ProtectedRoute>
        }
      />
      <Route
        path="/languages"
        element={  
          <ProtectedRoute>
            <Languages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={  
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={  
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lessons"
        element={
          <ProtectedRoute>
            <Lessons />
          </ProtectedRoute>
        }
      />
      <Route
        path="/practice"
        element={
          <ProtectedRoute>
            <Practice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recordings"
        element={
          <ProtectedRoute>
            <Recordings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-chat"
        element={
          <ProtectedRoute>
            <AIChat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/achievements"
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/translation"
        element={
          <ProtectedRoute>
            <Translation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/writing-assistant"
        element={
          <ProtectedRoute>
            <WritingAssistant />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-games"
        element={
          <ProtectedRoute>
            <AIGames />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default RouteConfig;
