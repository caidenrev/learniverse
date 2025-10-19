'use server';

/**
 * @fileOverview An AI-powered tutor that answers questions based on uploaded course material.
 *
 * - answerQuestion - A function that handles the question-answering process.
 */

import { ai } from '@/ai/genkit';
import { AiTutorInputSchema, AiTutorOutputSchema, type AiTutorInput, type AiTutorOutput } from '@/ai/flows/ai-tutor-schemas';


export async function answerQuestion(
  input: AiTutorInput
): Promise<AiTutorOutput> {
  return aiTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTutorPrompt',
  input: { schema: AiTutorInputSchema },
  output: { schema: AiTutorOutputSchema },
  prompt: `You are a helpful teaching assistant. Your role is to answer student questions based *only* on the course material provided. If the answer cannot be found in the document, state that clearly.

  Analyze the following document and answer the question that follows.

  Document:
  {{media url=documentDataUri}}

  Question:
  {{{question}}}

  Answer:`,
});

const aiTutorFlow = ai.defineFlow(
  {
    name: 'aiTutorFlow',
    inputSchema: AiTutorInputSchema,
    outputSchema: AiTutorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
