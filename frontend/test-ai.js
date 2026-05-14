import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey });
    console.log("Initializing model...");
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: "Hello, say 'Coffee is ready!'" }] }]
    });
    console.log("Response:", result.text);
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
