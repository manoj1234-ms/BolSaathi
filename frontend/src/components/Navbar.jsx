import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Layers, Languages, Info, Phone, ChevronDown, User, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", icon: Home, path: "/", dropdown: [] },
  { name: "Features", icon: Layers, path: "/features", dropdown: ["Voice Assistant", "Chatbot", "Translation", "AI Tools"] },
  { name: "Languages", icon: Languages, path: "/languages", dropdown: ["Hindi", "English", "Tamil", "Bengali", "Gujarati"] },
  { name: "About", icon: Info, path: "/about", dropdown: ["Mission", "Team", "FAQ"] },
  { name: "Contact", icon: Phone, path: "/contact", dropdown: ["Email", "Phone"] }
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // MOCK (make it real later)
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuRef = useRef();

  const handleNavigation = (path) => {
    if (path === location.pathname) {
      // Same page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
      // Small delay to ensure page has loaded
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
    setMobileMenuOpen(false);
    setOpenMenu(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function close(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#060818] dark:bg-[#060818] bg-white/95 dark:bg-[#060818]/95 backdrop-blur-sm py-4 px-8 flex items-center justify-between shadow-xl z-50 border-b border-gray-200/10 dark:border-white/10">
      
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => handleNavigation("/")}
      >
        <img
          src="/cropped_circle_image.png"
          alt="BolSaathi"
          className="h-12 w-12 rounded-full"
        />
        <h1 className="text-gray-900 dark:text-white text-2xl font-bold">BolSaathi</h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-10" ref={menuRef}>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={index}
              className={`relative group font-medium cursor-pointer ${
                location.pathname === item.path
                  ? "text-purple-400"
                  : "text-white hover:text-purple-400"
              } transition-colors`}
              onMouseEnter={() => setOpenMenu(index)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div 
                className="flex items-center gap-2 transition-all duration-300"
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="opacity-90 group-hover:translate-x-1 transition" size={20} />
                <span>{item.name}</span>
              </div>

              {/* Desktop Dropdown */}
              {item.dropdown.length > 0 && openMenu === index && (
                <div className="absolute top-10 left-0 bg-white dark:bg-[#0f1535] shadow-xl rounded-md py-2 w-44 border border-gray-200 dark:border-white/10">
                  {item.dropdown.map((drop, i) => (
                    <p
                      key={i}
                      className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                      onClick={() => handleNavigation(item.path)}
                    >
                      {drop}
                    </p>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Right Side - Theme Toggle, Button / User */}
      <div className="hidden md:flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {!isLoggedIn ? (
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Started
          </button>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-2 bg-gray-200 dark:bg-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-white/20 transition"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <User size={20} className="text-gray-900 dark:text-white" />
              <span className="text-gray-900 dark:text-white">Manoj</span>
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 bg-white dark:bg-[#0a0f2a] w-44 rounded-md border border-gray-200 dark:border-white/10 shadow-lg py-2">
                <p
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
                  onClick={() => (window.location.href = "/profile")}
                >
                  Profile
                </p>
                <p
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
                  onClick={() => (window.location.href = "/settings")}
                >
                  Settings
                </p>
                <p
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => (window.location.href = "/logout")}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile - Theme Toggle & Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />
        <Menu
          size={28}
          className="text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-[#060818] py-5 md:hidden border-t border-gray-200 dark:border-white/10">
          {navItems.map((item, index) => (
            <div key={index} className="px-6 py-3">
              <div
                className={`flex justify-between items-center cursor-pointer ${
                  location.pathname === item.path
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                } transition-colors`}
                onClick={() => {
                  if (item.dropdown.length > 0) {
                    setOpenMenu(openMenu === index ? null : index);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
              >
                <span>{item.name}</span>

                {/* Only mobile arrow */}
                {item.dropdown.length > 0 && (
                  <ChevronDown
                    className={`transition-transform ${
                      openMenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {item.dropdown.length > 0 && openMenu === index && (
                <div className="pl-4 mt-2">
                  {item.dropdown.map((d, i) => (
                    <p 
                      key={i} 
                      className="py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors"
                      onClick={() => {
                        // Navigate to parent page when dropdown item clicked
                        handleNavigation(item.path);
                      }}
                    >
                      {d}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Get Started */}
          {!isLoggedIn && (
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-4 ml-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-full font-semibold"
            >
              Get Started
            </button>
          )}

          {/* Mobile User */}
          {isLoggedIn && (
            <div className="mt-4 ml-6">
              <p className="text-gray-700 dark:text-gray-300 py-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => (window.location.href = "/profile")}>
                Profile
              </p>
              <p className="text-gray-700 dark:text-gray-300 py-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => (window.location.href = "/settings")}>
                Settings
              </p>
              <p className=" mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-2 py-2 rounded-full font-semibold hover:scale-105 transition" onClick={() => (window.location.href = "/logout")}>
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
