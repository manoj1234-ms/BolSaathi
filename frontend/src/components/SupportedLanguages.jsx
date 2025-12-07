import { useState, useEffect } from "react";
import { languageService } from "../services/api";
import { LANGUAGES } from "../utils/constants";

export default function SupportedLanguages() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState(LANGUAGES); // Initialize with fallback languages

  // Use LANGUAGES from constants as fallback
  const fallbackLanguages = LANGUAGES;

  // Fetch languages from API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await languageService.getAllLanguages();
        if (response.success && response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Transform API response to match component structure
          const apiLanguages = response.data.map((lang, index) => ({
            id: lang.id || lang._id || index + 1,
            native: lang.nativeName || lang.name || lang.native || "",
            english: lang.englishName || lang.name || lang.english || "",
            code: lang.code || "",
          }));
          
          setLanguages(apiLanguages);
        } else {
          // Use fallback languages if API fails or returns empty
          setLanguages(fallbackLanguages);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
        // Use fallback languages on error
        setLanguages(fallbackLanguages);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [fallbackLanguages]);

  const handleLanguageClick = (languageId) => {
    setSelectedLanguage(selectedLanguage === languageId ? null : languageId);
  };

  return (
    <section id="languages" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Supported{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Languages
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice with AI in all major Indian languages.
          </p>
        </div>

        {/* Language Cards Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading languages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
            {languages.map((language) => {
            const isSelected = selectedLanguage === language.id;
            return (
              <div
                key={language.id}
                onClick={() => handleLanguageClick(language.id)}
              className={`
                bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border rounded-xl p-4 text-center 
                transition-all duration-300 hover:scale-105 cursor-pointer
                ${
                  isSelected
                    ? "border-blue-500 shadow-lg shadow-blue-500/20"
                    : "border-gray-200 dark:border-white/5 hover:border-purple-400 dark:hover:border-white/10"
                }
              `}
            >
              {/* Native Script */}
              <div
                className={`text-xl font-semibold mb-2 ${
                  isSelected 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {language.native}
              </div>
              {/* English Name */}
              <div className="text-sm text-gray-600 dark:text-gray-400">{language.english}</div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
}

