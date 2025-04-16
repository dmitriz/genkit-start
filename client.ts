import dotenv from 'dotenv';
dotenv.config();
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// List of Google models
const GOOGLE_MODELS = [
  'googleai/gemini-2.0-flash',
  'googleai/gemini-1.0-pro',
  'googleai/custom-model'
];

const DEFAULT_MODEL = GOOGLE_MODELS[0]; // Use the first model in the list as the default

/**
 * Determines if a model is from Google AI
 * @param model The model to check
 * @returns true if the model is from Google AI, false otherwise
 */
const isGoogleModel = (model: string): boolean => {
  return GOOGLE_MODELS.includes(model);
};

/**
 * Generates text using the specified model
 * @param options Configuration options
 * @param options.model The model to use (defaults to 'googleai/gemini-2.0-flash')
 * @param options.prompt The prompt to send to the model
 * @returns The generated text
 */
async function generateText({
  model = DEFAULT_MODEL, // Use the default model if none is provided
  prompt
}: {
  model?: string;
  prompt: string;
}): Promise<{ text: string }> {
  // Validate the model against the predefined list and known supported models
  if (!isGoogleModel(model) && !model.startsWith('openai/')) {
    console.error(`Model '${model}' is not recognized. Falling back to default model '${DEFAULT_MODEL}'.`);
    model = DEFAULT_MODEL;
  } else if (model.startsWith('openai/') && model !== 'openai/gpt-4') {
    throw new Error(`Model '${model}' is not supported by genkit.`);
  }

  // Automatically add googleAI plugin if using a Google model
  const effectivePlugins = isGoogleModel(model) ? [googleAI()] : [];

  const llm = genkit({ plugins: effectivePlugins, model });
  const { text: rawText } = await llm.generate(prompt);

  return { text: rawText };
}

export { generateText };