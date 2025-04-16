import dotenv from 'dotenv';
dotenv.config();
import { genkit } from 'genkit';
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';

function create_llm({ model = gemini20Flash, plugins = [googleAI()] }: { 
  model?: any;
  plugins?: any[]; 
} = {}): any {
  return genkit({ plugins, model });
}

async function generate_text(ai_instance: any, prompt: string): Promise<string> {
  const { text } = await ai_instance.generate(prompt);
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
  const llm = create_llm({ model, plugins });
  const text = await generate_text(llm, prompt);
  return text;
}

// Example usage with defaults
main({
  model: gemini20Flash,
  prompt: 'Hello',
  plugins: [googleAI()]
}).then(console.log);