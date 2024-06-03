const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

const OpenAI = require("openai");

const { HfInference } = require("@huggingface/inference");

const { traceable } = require("langsmith/traceable");
const { wrapOpenAI } = require("langsmith/wrappers");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tracedOpenAI = wrapOpenAI(openai, traceable);

router.post("/openai", async (req, res) => {
  const { message } = req.body;

  try {
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

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    res.status(500).send("Error fetching response from OpenAI");
  }
});

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

router.post("/huggingface", async (req, res) => {
  const { message } = req.body;

  try {
    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: message,
      parameters: {
        max_new_tokens: 25,
        temperature: 1,
        seed: 0,
      },
    });

    res.json({ response: result.generated_text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching response from Hugging Face");
  }
});

module.exports = router;
