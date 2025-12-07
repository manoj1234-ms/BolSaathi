import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { Play, Download, Trash2, Calendar, BarChart3, Filter } from "lucide-react";

const Recordings = () => {
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState("all");

  // Mock recordings data
  const recordings = [
    {
      id: 1,
      title: "Hindi - Basic Greetings",
      language: "Hindi",
      date: "2024-01-15",
      duration: "0:45",
      accuracy: 87,
      pronunciation: 85,
      fluency: 90,
      audioUrl: "#",
    },
    {
      id: 2,
      title: "Bengali - Numbers",
      language: "Bengali",
      date: "2024-01-14",
      duration: "1:20",
      accuracy: 92,
      pronunciation: 90,
      fluency: 88,
      audioUrl: "#",
    },
    {
      id: 3,
      title: "Tamil - Common Phrases",
      language: "Tamil",
      date: "2024-01-13",
      duration: "0:55",
      accuracy: 78,
      pronunciation: 75,
      fluency: 80,
      audioUrl: "#",
    },
  ];

  const filteredRecordings = filter === "all" 
    ? recordings 
    : recordings.filter(r => r.language.toLowerCase() === filter.toLowerCase());

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Recordings
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Review your practice sessions and track improvement
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-[#0C0F1D] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400"
              >
                <option value="all">All Languages</option>
                <option value="hindi">Hindi</option>
                <option value="bengali">Bengali</option>
                <option value="tamil">Tamil</option>
              </select>
            </div>
          </div>

          {/* Recordings List */}
          <div className="space-y-4">
            {filteredRecordings.map((recording) => (
              <div
                key={recording.id}
                className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm rounded-full font-semibold">
                        {recording.language}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {recording.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(recording.date).toLocaleDateString()}
                      </div>
                      <span>•</span>
                      <span>{recording.duration}</span>
                    </div>

                    {/* Scores */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Accuracy</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                              style={{ width: `${recording.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {recording.accuracy}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Pronunciation</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                              style={{ width: `${recording.pronunciation}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {recording.pronunciation}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fluency</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full"
                              style={{ width: `${recording.fluency}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {recording.fluency}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:scale-110 transition-all">
                      <Play className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecordings.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No recordings found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Recordings;

