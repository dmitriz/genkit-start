// import the Genkit and Google AI plugin libraries
const { gemini20Flash, googleAI } = require('@genkit-ai/googleai');
const { genkit } = require('genkit');
require('dotenv').config();

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash, // set default model
});

async function main() {
  // make a generation request
  const { text } = await ai.generate('Hello, Gemini!');
  console.log(text);
}

main();