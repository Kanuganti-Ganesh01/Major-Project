// backend/src/controllers/gemini.controller.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithGemini = async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation context from history
    let conversationContext = '';
    if (conversationHistory.length > 0) {
      conversationContext = conversationHistory
        .map(chat => `User: ${chat.user}\nAssistant: ${chat.assistant}`)
        .join('\n') + '\n';
    }

    const prompt = conversationContext + `User: ${message}\nAssistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini AI Error:', error);
    res.status(500).json({
      error: 'Failed to get response from Gemini AI',
      details: error.message
    });
  }
};

const clearConversation = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Conversation cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to clear conversation',
      details: error.message
    });
  }
};

export { chatWithGemini, clearConversation };