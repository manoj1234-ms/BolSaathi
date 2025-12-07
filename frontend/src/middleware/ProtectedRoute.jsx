import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="text-xl font-semibold text-white">
          Loading...
        </div>
      </div>
    );
  }

  // Check localStorage as fallback if context says not authenticated
  // This handles the case where state hasn't updated yet after login
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");
  const hasAuth = isAuthenticated || (token && user);

  if (!hasAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
