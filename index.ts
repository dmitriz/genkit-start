import dotenv from 'dotenv';
dotenv.config();
import { generateText } from './client';

async function main(): Promise<void> {
  // Hardcoded model and prompt using Google model
  const model = 'googleai/gemini-2.0-flash';
  const prompt = 'Write a story about a brave knight.';

  try {
    const { text } = await generateText({ model, prompt });
    console.log(text);
  } catch (error) {
    console.error('Error generating text:', error);
  }
}

main();