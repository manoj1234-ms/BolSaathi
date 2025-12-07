import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // Clear all auth data
    try {
      if (logout && typeof logout === 'function') {
        logout();
      }
    } catch (err) {
      console.error("Error calling logout:", err);
    }

    // Manually clear storage (backup)
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginTime");

    // Clear any OTP data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('otp_')) {
        localStorage.removeItem(key);
      }
    });

    // Redirect to login
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">Logging out...</p>
      </div>
    </div>
  );
};

export default Logout;

