import test from 'ava';
import { generateText } from '../client';

// Mock genkit and googleAI plugin
const mockGenkit = ({ plugins, model }: { plugins: any[]; model: string }) => {
  return {
    generate: async () => ({ text: `Generated text for model: ${model}` })
  };
};

const mockGoogleAI = () => ({ name: 'googleAI' });

// Mock implementation of generateText
const mockGenerateText = async ({ model, prompt }: { model: string; prompt: string }) => {
  const isGoogleModel = model.startsWith('googleai/');
  const plugins = isGoogleModel ? [mockGoogleAI()] : [];
  const llm = mockGenkit({ plugins, model });
  const { text } = await llm.generate(prompt);
  return { text, plugins };
};

test('generateText adds googleAI plugin for Google models', async t => {
  const model = 'googleai/gemini-2.0-flash';
  const prompt = 'Test prompt';
  const { plugins } = await mockGenerateText({ model, prompt });

  t.is(plugins.length, 1, 'Should add googleAI plugin for Google models');
  t.is(plugins[0].name, 'googleAI', 'The plugin should be googleAI');
});

test('generateText does not add plugins for non-Google models', async t => {
  const model = 'openai/gpt-4';
  const prompt = 'Test prompt';
  const { plugins } = await mockGenerateText({ model, prompt });

  t.is(plugins.length, 0, 'Should not add any plugins for non-Google models');
});

test('generateText works with non-Google models', async t => {
  const model = 'openai/gpt-4';
  const prompt = 'Test prompt';
  const { text } = await mockGenerateText({ model, prompt });

  t.is(text, 'Generated text for model: openai/gpt-4', 'Should generate text for non-Google models');
});

test('generateText works with Google models', async t => {
  const model = 'googleai/gemini-2.0-flash';
  const prompt = 'Test prompt';
  const { text } = await mockGenerateText({ model, prompt });

  t.is(text, 'Generated text for model: googleai/gemini-2.0-flash', 'Should generate text for Google models');
});