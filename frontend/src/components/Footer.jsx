import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubscribeStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubscribeStatus(null);

    try {
      const { newsletterService } = await import("../services/api");
      const response = await newsletterService.subscribe(email);

      if (response.success) {
        setSubscribeStatus("success");
        setEmail("");
        
        setTimeout(() => {
          setSubscribeStatus(null);
        }, 3000);
      } else {
        setSubscribeStatus("error");
      }
    } catch (error) {
      setSubscribeStatus("error");
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gray-100 dark:bg-[#060818] border-t border-gray-200 dark:border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/cropped_circle_image.png"
                alt="BolSaathi"
                className="h-10 w-10 rounded-full"
              />
              <h3 className="text-gray-900 dark:text-white text-xl font-bold">BolSaathi</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
              Empowering India to speak with confidence. The most advanced AI-powered language learning platform for Indian languages.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/bolsaathi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/bolsaathi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/bolsaathi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/bolsaathi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-4">Platform</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Features", path: "/features" },
                { name: "Languages", path: "/languages" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms-of-service" },
                { name: "Cookie Policy", path: "/cookie-policy" },
                { name: "Disclaimer", path: "/disclaimer" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and language tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribeStatus) setSubscribeStatus(null);
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
              {subscribeStatus === "success" && (
                <p className="text-green-400 text-sm">Successfully subscribed!</p>
              )}
              {subscribeStatus === "error" && (
                <p className="text-red-400 text-sm">Please enter a valid email.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © 2025 BolSaathi. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}

