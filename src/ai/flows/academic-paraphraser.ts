'use server';

/**
 * @fileOverview An AI agent to paraphrase academic text to avoid plagiarism.
 *
 * - academicParaphraser - A function that handles the paraphrasing process.
 * - AcademicParaphraserInput - The input type for the academicParaphraser function.
 * - AcademicParaphraserOutput - The return type for the academicParaphraser function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicParaphraserInputSchema = z.object({
  text: z
    .string()
    .describe('A sentence or paragraph from an academic journal to be paraphrased.'),
});
export type AcademicParaphraserInput = z.infer<typeof AcademicParaphraserInputSchema>;

const AcademicParaphraserOutputSchema = z.object({
  paraphrasedText: z
    .string()
    .describe('The paraphrased version of the input text.'),
});
export type AcademicParaphraserOutput = z.infer<typeof AcademicParaphraserOutputSchema>;

export async function academicParaphraser(input: AcademicParaphraserInput): Promise<AcademicParaphraserOutput> {
  return academicParaphraserFlow(input);
}

const prompt = ai.definePrompt({
  name: 'academicParaphraserPrompt',
  input: {schema: AcademicParaphraserInputSchema},
  output: {schema: AcademicParaphraserOutputSchema},
  prompt: `You are an expert academic writer. You will be provided with a passage from an academic journal, and your task is to rephrase it in a different style to avoid plagiarism while maintaining the original meaning.

Original Text: {{{text}}}

Paraphrased Text: `,
});

const academicParaphraserFlow = ai.defineFlow(
  {
    name: 'academicParaphraserFlow',
    inputSchema: AcademicParaphraserInputSchema,
    outputSchema: AcademicParaphraserOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
