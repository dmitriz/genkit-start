// import the Genkit and Google AI plugin libraries
require('dotenv').config();
const { genkit } = require('genkit');
const { gemini20Flash, googleAI } = require('@genkit-ai/googleai');

function createAI({ plugins = [googleAI()], model = gemini20Flash } = {}) {
  return genkit({ plugins, model });
}

async function generateText(aiInstance, prompt) {
  const { text } = await aiInstance.generate(prompt);
  return text;
}

async function main({ plugins, model, prompt }) {
  const aiInstance = createAI({ plugins, model });
  const text = await generateText(aiInstance, prompt);
  console.log(text);
}

// Example usage with defaults
main({
  plugins: [googleAI()],
  model: gemini20Flash,
  prompt: 'Hello, Gemini!' // for short answer
});