'use server';

/**
 * @fileOverview An AI-powered tutor that answers questions based on uploaded course material.
 *
 * - answerQuestion - A function that handles the question-answering process.
 * - AiTutorInput - The input type for the answerQuestion function.
 * - AiTutorOutput - The return type for the answerQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const AiTutorInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "The course material (e.g., PDF, lecture notes) as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  question: z.string().describe('The student\'s question about the material.'),
});
export type AiTutorInput = z.infer<typeof AiTutorInputSchema>;

export const AiTutorOutputSchema = z.object({
  answer: z
    .string()
    .describe('The AI-generated answer based on the provided document.'),
});
export type AiTutorOutput = z.infer<typeof AiTutorOutputSchema>;

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
