import dotenv from 'dotenv';
dotenv.config();
import { generateText } from './client';

/**
 * Generates text using a specified model and prompt, then logs the result to the console.
 *
 * If text generation fails, logs an error message with details.
 */
async function main(): Promise<void> {
  // Hardcoded model and prompt using Google model
  const model = 'googleai/gemini-2.0-flash';
  const prompt = 'hello';

  try {
    const { text } = await generateText({ model, prompt });
    console.log(text);
  } catch (error) {
    console.error('Error generating text:', error);
  }
}

main();