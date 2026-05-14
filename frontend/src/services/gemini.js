/**
 * gemini.js — Modern Gemini AI Integration using the unified @google/genai SDK (2026)
 */
import { GoogleGenAI } from "@google/genai";
import { menuItems, specialOffers } from '../data/menuData';

// Initialize Gemini SDK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey === 'MOCK_KEY' ? undefined : apiKey
});

// Prepare Context
const menuContext = menuItems.map(item => `- ${item.name} (₹${item.price}): ${item.description}`).join('\n');
const offersContext = specialOffers.map(offer => `- ${offer.title}: ${offer.description}`).join('\n');

const SYSTEM_PROMPT = `
You are the official AI assistant of MY Cafe. 
Help with menu, recommendations, and reservations.
Keep it short, professional, and friendly. 
PLAIN TEXT ONLY. No markdown.

Address: 42, Cafe Lane, Bandra West, Mumbai
Hours: 8 AM - 10 PM
MENU:
${menuContext}
OFFERS:
${offersContext}
`;

// Gemini Models (2026 Standards)
// prioritized for reliability and quota
const MODELS = [
  'gemini-3.1-flash-lite', // Matches user's high-quota dashboard
  'gemini-2.5-flash',      // Matches user's dashboard
  'gemini-1.5-flash', 
  'gemini-1.5-flash-8b',
  'gemini-2.0-flash-lite'
];

/**
 * Get response using the unified SDK with automatic fallback
 */
export async function getGeminiResponse(message, history = [], modelIndex = 0) {
  if (modelIndex >= MODELS.length) {
    return "I'm currently over my daily capacity across all available models. Please try again later! ☕";
  }

  try {
    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey === 'MOCK_KEY') {
      return "I'm currently in demo mode. Please set a valid VITE_GEMINI_API_KEY.";
    }

    const currentModel = MODELS[modelIndex];

    // Multi-turn chat using the new unified SDK syntax
    const chat = ai.chats.create({
      model: currentModel,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
      history: history.slice(-8).map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        content: m.text
      }))
    });

    const result = await chat.sendMessage({ message: message });
    return result.text.replace(/\*/g, '').trim();

  } catch (error) {
    const errorMsg = error.message?.toLowerCase() || '';
    
    // If rate limited or quota exceeded, try the next model
    if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('limit')) {
      console.warn(`Model ${MODELS[modelIndex]} limit reached. Falling back...`);
      return getGeminiResponse(message, history, modelIndex + 1);
    }

    if (errorMsg.includes('invalid api key')) {
      return "The AI API key appears to be invalid. Please check your .env file.";
    }

    return "I'm having a bit of trouble connecting right now. Please try again later ☕";
  }
}

export const suggestions = [
  "What coffee do you recommend?",
  "Today's special",
  "Reserve a table"
];