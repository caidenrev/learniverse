// Analogy Finder Flow
'use server';
/**
 * @fileOverview This file defines the AnalogyFinder flow, which takes a technical concept as input
 * and returns a simple analogy to explain it.
 *
 * - analogyFinder - A function that takes a technical concept and returns an analogy.
 * - AnalogyFinderInput - The input type for the analogyFinder function.
 * - AnalogyFinderOutput - The return type for the analogyFinder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalogyFinderInputSchema = z.object({
  technicalConcept: z.string().describe('The technical concept to explain with an analogy.'),
});
export type AnalogyFinderInput = z.infer<typeof AnalogyFinderInputSchema>;

const AnalogyFinderOutputSchema = z.object({
  analogy: z.string().describe('A simple analogy explaining the technical concept.'),
});
export type AnalogyFinderOutput = z.infer<typeof AnalogyFinderOutputSchema>;

export async function analogyFinder(input: AnalogyFinderInput): Promise<AnalogyFinderOutput> {
  return analogyFinderFlow(input);
}

const analogyFinderPrompt = ai.definePrompt({
  name: 'analogyFinderPrompt',
  input: {schema: AnalogyFinderInputSchema},
  output: {schema: AnalogyFinderOutputSchema},
  prompt: `You are an expert at explaining complex technical concepts using simple analogies.

  Explain the following technical concept using an analogy that is easy to understand:

  Technical Concept: {{{technicalConcept}}}
  Analogy:`, // Removed unnecessary newlines and improved prompt for clarity
});

const analogyFinderFlow = ai.defineFlow(
  {
    name: 'analogyFinderFlow',
    inputSchema: AnalogyFinderInputSchema,
    outputSchema: AnalogyFinderOutputSchema,
  },
  async input => {
    const {output} = await analogyFinderPrompt(input);
    return output!;
  }
);
