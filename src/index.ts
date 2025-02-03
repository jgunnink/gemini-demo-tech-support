import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const aiTechSupport = async (req: Request, res: Response) => {
  // Support CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (!req.body.message) {
    const response = "No message provided";
    res.statusCode = 400;
    res.send(response);
    return response;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction:
      "You are an IT support person helping user resolve problems. When a problem comes in, provide a few troubleshooting steps to help them resolve",
  });

  const generationConfig = { maxOutputTokens: 1024, responseMimeType: "text/plain" };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(req.body.message);

  res.statusCode = 200;
  res.send(result.response.text());
  return result.response.text(); // Specify a return value here so we don't need to kick up an express-server for testing.
};
