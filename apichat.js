import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message provided." });
  }

  if (message.toLowerCase().includes("who made you")) {
    return res.status(200).json({ reply: "I was created by Rushikesh Kadam." });
  }

  try {
    const result = await model.generateContent(
      "You are Rushikesh AI. You are intelligent, confident, and helpful.\nUser: " + message
    );

    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });

  } catch (error) {
    res.status(500).json({ reply: "AI Error. Try again." });
  }
}
