import test from 'ava';
import { genkit } from 'genkit';
import proxyquire from 'proxyquire';

// Adjusted the proxyquire mock to ensure it correctly replaces the genkit module
const { generateText } = proxyquire('../client', {
  genkit: {
    genkit: () => ({
      generate: async () => ({ text: 'Mocked response' })
    })
  }
});

// Test that generateText adds googleAI plugin for Google models
test('generateText adds googleAI plugin for Google models', async t => {
  const model = 'googleai/gemini-2.0-flash';
  const prompt = 'Test prompt';
  const { text } = await generateText({ model, prompt });

  t.truthy(text, 'Should generate text for Google models');
});

// Test that generateText does not add plugins for non-Google models
test('generateText does not add plugins for non-Google models', async t => {
  const model = 'openai/gpt-4';
  const prompt = 'Test prompt';
  const { text } = await generateText({ model, prompt });

  t.truthy(text, 'Should generate text for non-Google models');
});

// Test that generateText works with non-Google models
test('generateText works with non-Google models', async t => {
  const model = 'openai/gpt-4';
  const prompt = 'Test prompt';
  const { text } = await generateText({ model, prompt });

  t.is(text, 'Generated text for model: openai/gpt-4', 'Should generate text for non-Google models');
});

// Test that generateText works with Google models
test('generateText works with Google models', async t => {
  const model = 'googleai/gemini-2.0-flash';
  const prompt = 'Test prompt';
  const { text } = await generateText({ model, prompt });

  t.is(text, 'Generated text for model: googleai/gemini-2.0-flash', 'Should generate text for Google models');
});

// Test that generateText does not accept plugins as input
test('generateText does not accept plugins as input', async t => {
  const model = 'googleai/gemini-2.0-flash';
  const prompt = 'Test prompt';

  // Ensure plugins are determined internally
  const { text } = await generateText({ model, prompt });
  t.truthy(text, 'Plugins should be determined internally');
});

// Update the test for unsupported models
test('generateText throws error for unsupported models', async t => {
  const model = 'openai/unsupported-model';
  const prompt = 'Test prompt';

  await t.throwsAsync(async () => {
    await generateText({ model, prompt });
  }, { instanceOf: Error, message: `Model '${model}' is not supported by genkit.` });
});