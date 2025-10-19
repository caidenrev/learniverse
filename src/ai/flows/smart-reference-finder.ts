'use server';

/**
 * @fileOverview Helps students formulate more effective search keywords for finding references on Google Scholar.
 *
 * - smartReferenceFinder - A function that generates search keywords.
 * - SmartReferenceFinderInput - The input type for the smartReferenceFinder function.
 * - SmartReferenceFinderOutput - The return type for the smartReferenceFinder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReferenceFinderInputSchema = z.string().describe('The initial search term or concept.');
export type SmartReferenceFinderInput = z.infer<typeof SmartReferenceFinderInputSchema>;

const SmartReferenceFinderOutputSchema = z.string().describe('A list of alternative or related search terms.');
export type SmartReferenceFinderOutput = z.infer<typeof SmartReferenceFinderOutputSchema>;

export async function smartReferenceFinder(input: SmartReferenceFinderInput): Promise<SmartReferenceFinderOutput> {
  return smartReferenceFinderFlow(input);
}

const smartReferenceFinderPrompt = ai.definePrompt({
  name: 'smartReferenceFinderPrompt',
  input: {schema: SmartReferenceFinderInputSchema},
  output: {schema: SmartReferenceFinderOutputSchema},
  prompt: `You are an expert in academic research and terminology. I will provide you with an initial search term, and you will provide a list of alternative or related search terms that would be useful for finding relevant research on Google Scholar. Please return a comma separated list.

Initial term: {{{$input}}}`,
});

const smartReferenceFinderFlow = ai.defineFlow(
  {
    name: 'smartReferenceFinderFlow',
    inputSchema: SmartReferenceFinderInputSchema,
    outputSchema: SmartReferenceFinderOutputSchema,
  },
  async input => {
    const {output} = await smartReferenceFinderPrompt(input);
    return output!;
  }
);
