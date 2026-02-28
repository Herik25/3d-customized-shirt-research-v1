import express from "express";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from GEMINI!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = result.response;

    const imagePart = response.candidates[0].content.parts.find(
      (part) => part.inlineData,
    );

    const base64Image = imagePart.inlineData.data;

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "Unable to generate image" });
  }
});

export default router;
