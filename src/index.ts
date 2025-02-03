import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const aiTechSupport = async (req: Request, res: Response) => {
  if (!req.body.message) {
    const response = "No message provided";
    res.statusCode = 400;
    res.send(response);
    return response;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-exp-1206",
    systemInstruction:
      "You are an IT support person helping user resolve problems. When a problem comes in, provide a few troubleshooting steps to help them resolve",
  });

  const generationConfig = { maxOutputTokens: 8192, responseMimeType: "text/plain" };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(req.body.message);

  res.statusCode = 200;
  res.send(result.response.text());
  return result.response.text(); // Specify a return value here so we don't need to kick up an express-server for testing.
};
