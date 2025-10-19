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
  prompt: `Kamu jago banget jelasin konsep teknis yang ribet pake analogi yang gampang dimengerti.

  Coba jelasin konsep teknis ini pake analogi yang santai:

  Konsep Teknis: {{{technicalConcept}}}
  
  Hasilnya harus dalam bahasa Indonesia yang santai dan jangan pakai format markdown seperti bold atau heading.
  
  Analogi:`,
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
