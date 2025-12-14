import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testModel() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello with a random fun fact."
    });

    const text = response.candidates[0].content.parts[0].text;

    console.log("\nMODEL RESPONSE:\n");
    console.log(text);

  } catch (err) {
    console.error("\nERROR:\n", err);
  }
}

testModel();
