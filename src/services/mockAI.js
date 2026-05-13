/**
 * mockAI.js — Pattern-matched AI response engine for MY Cafe chatbot
 */

const responses = {
  greeting: [
    "Hello! Welcome to MY Cafe ☕ I'm your AI assistant. How can I help you today?",
    "Hi there! Great to see you at MY Cafe 🌟 What can I assist you with?",
    "Welcome! I'm here to help you with our menu, reservations, or anything else 😊",
  ],
  coffee: [
    "Our Cappuccino is the most loved item on our menu — rich espresso with perfectly frothed milk 🧡 Also try our Caramel Macchiato for something sweet!",
    "For coffee lovers, I'd recommend our Cold Brew for something smooth, or our Classic Espresso for a bold kick ☕",
    "Our best sellers in coffee are: Cappuccino (₹160), Café Latte (₹180), and the Cold Brew (₹200). All freshly brewed!",
  ],
  food: [
    "Our Paneer Tikka Pizza is an absolute crowd-pleaser! 🍕 It's Indian fusion at its finest — ₹349.",
    "For a quick bite, try our Bombay Grilled Sandwich (₹149) or Samosa 2 pcs (₹80). Perfect with chai!",
    "The Chocolate Lava Cake (₹199) is our most Instagrammed dessert! Pair it with Cold Brew for a premium experience 😍",
  ],
  tea: [
    "Our Masala Chai is brewed with authentic Indian spices — ginger, cardamom, cinnamon. Best chai in town at just ₹80 🍵",
    "Try our Kashmiri Kahwa — saffron-infused green tea with dry fruits. A truly royal experience (₹140) 👑",
    "For a refreshing option, our Iced Lemon Tea (₹110) is perfect for hot days!",
  ],
  order: [
    "Sure! You can add items to your cart by clicking 'Add to Cart' on any menu item 🛒 Head to our Menu page to browse!",
    "To place an order, browse our Menu page, add items to your cart, and checkout. Simple and easy!",
    "I can suggest some great combos! Our 'Coffee Lover's Pack' (₹549) includes Cappuccino + Caramel Macchiato + Tiramisu 🎁",
  ],
  reservation: [
    "To reserve a table, visit our Contact page and fill out the reservation form 📅 We recommend booking 24 hours in advance.",
    "Table reservations are available! Contact us at +91 98765 43210 or use the form on our Contact page.",
    "We have tables for 2–20 people! For large group bookings (10+), please call us directly for special arrangements 🎉",
  ],
  hours: [
    "We're open Monday–Friday: 8 AM – 10 PM, and Weekends: 9 AM – 11 PM ☀️🌙",
    "Our kitchen is open all day! Last orders are 30 minutes before closing time.",
    "Happy Hours are from 3 PM – 5 PM on weekdays — 20% off all beverages! 🎉",
  ],
  special: [
    "Today's special: Student Deal! Show your student ID for 15% off your entire order 🎓",
    "Our current offers: Happy Hours (3–5 PM, 20% off beverages), Weekend Brunch (free dessert with combo), Student Deal (15% off always)!",
    "The Student Special combo (₹179) is insane value — Masala Chai + 2 Samosas + Vada Pav. Perfect for budget meals!",
  ],
  veg: [
    "Great news — over 70% of our menu is vegetarian! 🌿 All our snacks, most pizzas, pasta, desserts, and all beverages are veg.",
    "Our vegetarian highlights: Paneer Tikka Pizza (₹349), Creamy Alfredo Pasta (₹279), Gulab Jamun (₹120). Delicious!",
    "We have a dedicated veg section! All items are clearly marked with a green 🟢 indicator on the menu.",
  ],
  default: [
    "That's a great question! Could you be more specific so I can help better? You can ask about our menu, reservations, timings, or special offers 😊",
    "I'd love to help! Feel free to ask about: 🍕 Food, ☕ Beverages, 📅 Reservations, 🕐 Opening Hours, or 🎁 Special Offers!",
    "Hmm, I'm not sure about that. Try asking about our menu items, today's specials, or how to reserve a table!",
  ],
};

const suggestions = [
  "What coffee do you recommend?",
  "Show me today's special",
  "Reserve a table",
  "What are your opening hours?",
  "Best veg options?",
  "Any combo meals?",
];

/**
 * Get AI response for a given user message
 * @param {string} message
 * @returns {Promise<string>}
 */
export async function getAIResponse(message) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800 + Math.random() * 1000));

  const lower = message.toLowerCase();

  if (/hi|hello|hey|greet|welcome/.test(lower))      return pick(responses.greeting);
  if (/coffee|espresso|latte|cappuccino|mocha|brew/.test(lower)) return pick(responses.coffee);
  if (/tea|chai|green|kahwa|lemon/.test(lower))       return pick(responses.tea);
  if (/food|eat|pizza|burger|sandwich|pasta|snack|samosa|pakoda/.test(lower)) return pick(responses.food);
  if (/order|cart|buy|purchase/.test(lower))          return pick(responses.order);
  if (/reserv|book|table|seat/.test(lower))           return pick(responses.reservation);
  if (/open|hour|time|when|close/.test(lower))        return pick(responses.hours);
  if (/special|offer|deal|discount|today/.test(lower)) return pick(responses.special);
  if (/veg|vegetarian|plant/.test(lower))             return pick(responses.veg);

  return pick(responses.default);
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export { suggestions };
