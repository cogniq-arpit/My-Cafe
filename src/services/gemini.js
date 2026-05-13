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

/**
 * Get response from Gemini using chat history
 * @param {string} message - Current user message
 * @param {Array<{role: string, text: string}>} history - Previous messages
 * @returns {Promise<string>}
 */
export async function getGeminiResponse(message, history = []) {
  try {
    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey === 'MOCK_KEY') {
      console.warn('Using mock API fallback since no valid Gemini API Key was found.');
      // Fallback for demonstration if no key is provided
      await new Promise(r => setTimeout(r, 1000));
      return "I'm the MY Cafe assistant! (Please configure VITE_GEMINI_API_KEY in .env to enable true AI responses). How can I help you with our menu today?";
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT 
    });

    // Format history for Gemini SDK
    // SDK expects: { role: "user" | "model", parts: [{ text: "..." }] }
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Gemini strictly requires the first history item to be from the user
    while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    const result = await chat.sendMessage(message);
    let reply = result.response.text();
    
    // Strip markdown bold and italic asterisks
    reply = reply.replace(/\*\*/g, '').replace(/\*/g, '');
    
    return reply;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble right now. Please try again in a moment ☕";
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
