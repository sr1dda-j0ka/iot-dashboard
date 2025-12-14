import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { connectDB } from "@/libs/db";
import Reading from "@/models/Reading";

export default async function handler(req, res) {
  try {
    await connectDB();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const history = await Reading.find()
      .sort({ timestamp: -1 })
      .limit(10);

    const prompt = `
Analyze the following IoT sensor readings:

${JSON.stringify(history, null, 2)}

Provide:
- 3 meaningful insights
- 1 anomaly or warning
- 1 short prediction
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No insights generated.";

    return res.status(200).json({ insights: text });

  } catch (err) {
    console.error("INSIGHTS ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
