import dotenv from 'dotenv';
dotenv.config();
import { genkit } from 'genkit';
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';

function createAI({ model = gemini20Flash, plugins = [googleAI()] }: { 
  model?: any;
  plugins?: any[]; 
} = {}): any {
  return genkit({ plugins, model });
}

async function generateText(aiInstance: any, prompt: string): Promise<string> {
  const { text } = await aiInstance.generate(prompt);
  return text;
}

async function main({ 
  model, 
  prompt,
  plugins 
}: { 
  model: any; 
  prompt: string;
  plugins: any[] 
}) {
  const aiInstance = createAI({ model, plugins });
  const text = await generateText(aiInstance, prompt);
  return text;
}

// Example usage with defaults
main({
  model: gemini20Flash,
  prompt: 'Hello',
  plugins: [googleAI()]
}).then(console.log);