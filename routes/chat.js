const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const OpenAI = require("openai");
const { HfInference } = require("@huggingface/inference");
const { traceable } = require("langsmith/traceable");
const { wrapOpenAI } = require("langsmith/wrappers");

dotenv.config();

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET_KEY;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tracedOpenAI = wrapOpenAI(openai, traceable);

router.post("/openai", async (req, res) => {
  const { message } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    await prisma.message.create({
      data: {
        userId,
        role: "user",
        content: message,
      },
    });

    const response = await tracedOpenAI.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        { role: "user", content: message },
      ],
      model: "gpt-4o",
    });

    const botResponse = response.choices[0].message.content;

    await prisma.message.create({
      data: {
        userId,
        role: "bot",
        content: botResponse,
      },
    });

    res.json({ response: botResponse });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    console.error(error);
    res.status(500).json({ error: "Error fetching response from OpenAI" });
  }
});

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

router.post("/huggingface", async (req, res) => {
  const { message } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    await prisma.message.create({
      data: {
        userId,
        role: "user",
        content: message,
      },
    });

    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: message,
      parameters: {
        max_new_tokens: 150,
        temperature: 1,
        seed: 0,
      },
    });

    const botResponse = result.generated_text;

    await prisma.message.create({
      data: {
        userId,
        role: "bot",
        content: botResponse,
      },
    });

    res.json({ response: botResponse });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching response from Hugging Face" });
  }
});

router.get("/history", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    const messages = await prisma.message.findMany({
      where: { userId },
      orderBy: { timestamp: "asc" },
    });

    res.json(messages);
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    console.error(error);
    res.status(500).json({ error: "Error fetching chat history" });
  }
});

module.exports = router;
