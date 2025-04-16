import dotenv from 'dotenv';
dotenv.config();
import { generateText } from './client';

async function main(model: string, prompt: string): Promise<string> {
  // Call the generateText function with the provided model and prompt
  return await generateText({ model, prompt });
}

// Example usage
const model = process.argv[2]; // Get model from command-line arguments
const prompt = process.argv[3]; // Get prompt from command-line arguments

if (!model || !prompt) {
  console.error('Usage: npm start <model> <prompt>');
  process.exit(1);
}

main(model, prompt).then(console.log).catch(console.error);