import dotenv from 'dotenv';
dotenv.config();
import { genkit } from 'genkit';
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';

function createAI({ plugins = [googleAI()], model = gemini20Flash }: { 
  plugins?: any[]; 
  model?: any 
} = {}): any {
  return genkit({ plugins, model });
}

async function generateText(aiInstance: any, prompt: string): Promise<string> {
  const { text } = await aiInstance.generate(prompt);
  return text;
}

async function main({ 
  plugins, 
  model, 
  prompt 
}: { 
  plugins: any[]; 
  model: any; 
  prompt: string 
}) {
  const aiInstance = createAI({ plugins, model });
  const text = await generateText(aiInstance, prompt);
  return text;
}

// Example usage with defaults
main({
  plugins: [googleAI()],
  model: gemini20Flash,
  prompt: 'Hello'
}).then(console.log);