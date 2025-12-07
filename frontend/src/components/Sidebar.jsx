import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ activeMenu, setActiveMenu }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div
      className="w-full p-4 shadow-lg fixed top-0 left-0 z-10"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-white">BolSaathi</h2>
          <p style={{ color: "var(--light)" }} className="text-sm ml-2">
            Language Learning
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex space-x-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className="px-4 py-2 rounded-lg transition font-semibold flex items-center gap-2"
              style={{
                backgroundColor:
                  activeMenu === item.id ? "var(--secondary)" : "transparent",
                color: "white",
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== item.id) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.id) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg transition font-semibold text-white flex items-center gap-2"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
          }
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
}
