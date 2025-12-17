import ChatMessage from "../models/ChatMessage.js";

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 50 } = req.query;
    
    const messages = await ChatMessage.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: messages.reverse().map(m => ({
        id: m._id,
        role: m.role,
        content: m.content,
        timestamp: m.createdAt,
        suggestions: m.suggestions,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save chat message
export const saveChatMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role, content, personality, language, suggestions } = req.body;
    
    const message = await ChatMessage.create({
      userId,
      role,
      content,
      personality,
      language,
      suggestions,
    });
    
    res.json({
      success: true,
      data: {
        id: message._id,
        role: message.role,
        content: message.content,
        timestamp: message.createdAt,
        suggestions: message.suggestions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear chat history
export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    await ChatMessage.deleteMany({ userId });
    
    res.json({ success: true, message: "Chat history cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

