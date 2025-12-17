import Recording from "../models/Recording.js";

// Get user recordings
export const getUserRecordings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { language } = req.query;
    
    const query = { userId };
    if (language) {
      // Try to find language by name and use its ID
      const Language = (await import("../models/Language.js")).default;
      const langDoc = await Language.findOne({ name: new RegExp(language, "i") });
      if (langDoc) {
        query.languageId = langDoc._id;
      }
    }
    
    const recordings = await Recording.find(query)
      .populate("lessonId", "title")
      .populate("languageId", "name")
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: recordings.map(r => ({
        id: r._id,
        title: r.title,
        language: r.languageId?.name || r.language,
        date: r.createdAt,
        duration: r.duration,
        accuracy: r.accuracy,
        pronunciation: r.pronunciation,
        fluency: r.fluency,
        audioUrl: r.audioUrl,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save recording
export const saveRecording = async (req, res) => {
  try {
    const userId = req.user._id;
    const { lessonId, languageId, title, audioUrl, duration, accuracy, pronunciation, fluency, feedback, mistakes } = req.body;
    
    const recording = await Recording.create({
      userId,
      lessonId,
      languageId,
      title,
      audioUrl,
      duration,
      accuracy,
      pronunciation,
      fluency,
      feedback,
      mistakes,
    });
    
    res.json({
      success: true,
      message: "Recording saved successfully",
      data: recording,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete recording
export const deleteRecording = async (req, res) => {
  try {
    const { recordingId } = req.params;
    const userId = req.user._id;
    
    const recording = await Recording.findOne({ _id: recordingId, userId });
    if (!recording) {
      return res.status(404).json({ success: false, message: "Recording not found" });
    }
    
    await Recording.deleteOne({ _id: recordingId });
    
    res.json({ success: true, message: "Recording deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

