/**
 * gemini.js — Gemini API Integration for MY Cafe
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { menuItems, specialOffers } from '../data/menuData';

// Initialize Gemini SDK with the API Key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || 'MOCK_KEY');

// Prepare the cafe context from our data
const menuContext = menuItems.map(item => `- ${item.name} (₹${item.price}): ${item.description}`).join('\n');
const offersContext = specialOffers.map(offer => `- ${offer.title}: ${offer.description}`).join('\n');

const SYSTEM_PROMPT = `
You are the official AI assistant of MY Cafe.
Your purpose is ONLY to help users with MY Cafe-related topics such as:
* menu items
* food recommendations
* drinks
* prices
* reservations
* opening hours
* offers
* customer assistance

If a user asks anything unrelated to MY Cafe, politely refuse and redirect them back to cafe-related assistance.
Keep responses:
* short
* friendly
* professional
* cafe-themed
* use PLAIN TEXT ONLY. DO NOT use markdown formatting like **bold** or *italics*.

Never behave like a general AI assistant or chatbot.

--- CAFE CONTEXT ---
Address: 42, Cafe Lane, Bandra West, Mumbai - 400 050
Phone: +91 98765 43210
Hours: Mon-Fri: 8 AM - 10 PM, Sat-Sun: 9 AM - 11 PM
Reservations: Available via our Contact page or phone.

--- MENU ---
${menuContext}

--- CURRENT OFFERS ---
${offersContext}
`;

// Primary and fallback models for 2026
const MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',
  'gemini-3-flash-preview',
  'gemini-2.5-flash'
];

/**
 * Helper to delay execution (backoff)
 */
const wait = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Get response from Gemini with retries and model fallbacks
 */
export async function getGeminiResponse(message, history = [], attempt = 0, modelIndex = 0) {
  try {
    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey === 'MOCK_KEY') {
      console.warn('Using mock AI fallback: No valid Gemini API Key found.');
      await wait(1000);
      return "I'm currently in demo mode. Please configure a valid VITE_GEMINI_API_KEY to enable my full AI capabilities!";
    }

    const currentModelName = MODELS[modelIndex] || MODELS[0];
    const model = genAI.getGenerativeModel({
      model: currentModelName,
      systemInstruction: SYSTEM_PROMPT
    });

    // Format and clean history
    const formattedHistory = history
      .filter(msg => msg.text && msg.text.trim() !== "")
      .map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    // SDK requirement: History must start with a 'user' message
    while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    const result = await chat.sendMessage(message);
    let reply = result.response.text();

    // Clean up response: Strip all markdown formatting (as per system prompt requirement)
    return reply.replace(/\*\*/g, '').replace(/\*/g, '').replace(/__/g, '').trim();

  } catch (error) {
    console.error(`Gemini Error (${MODELS[modelIndex]}):`, error);

    // Handle Quota (429) with exponential backoff
    if (error.message?.includes('429') && attempt < 2) {
      const delay = Math.pow(2, attempt) * 2000;
      console.log(`Quota hit. Retrying in ${delay}ms... (Attempt ${attempt + 1})`);
      await wait(delay);
      return getGeminiResponse(message, history, attempt + 1, modelIndex);
    }

    // Handle Model Not Found (404) or continued failure by trying next model
    if ((error.message?.includes('404') || error.message?.includes('429')) && modelIndex < MODELS.length - 1) {
      console.log(`Switching to fallback model: ${MODELS[modelIndex + 1]}`);
      return getGeminiResponse(message, history, 0, modelIndex + 1);
    }

    return "Sorry, I'm having a bit of trouble connecting to my brain right now. Please try again in a moment ☕";
  }
}

export const suggestions = [
  "What coffee do you recommend?",
  "Best combo under ₹300",
  "Today's special",
  "Recommend desserts",
  "What is your opening time?",
  "Reserve a table"
];