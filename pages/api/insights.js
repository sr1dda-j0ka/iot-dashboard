import { GoogleGenerativeAI } from "@google/generative-ai";
import db from "@/libs/db";

export async function GET(req){
    const genAI= new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model= genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const history=await db.history.find().sort({timestamp: -1}).limit(10);

    const prompt=`
    ${JSON.stringify(history,null,2)}
     Give insights in:
    - 3 bullet points
    - 1 anomaly/warning (if any)
    - 1 prediction`;
    const result=await model.generateContent(prompt);

    return Response.json({
        insights: result.response.text(),
    });
}