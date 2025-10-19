'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a presentation outline based on a given title.
 *
 * It exports:
 * - `generatePresentationOutline`: An async function that takes a presentation title as input and returns a presentation outline.
 * - `PresentationOutlineInput`: The input type for the `generatePresentationOutline` function.
 * - `PresentationOutlineOutput`: The output type for the `generatePresentationOutline` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PresentationOutlineInputSchema = z.object({
  title: z.string().describe('The title of the presentation.'),
});
export type PresentationOutlineInput = z.infer<typeof PresentationOutlineInputSchema>;

const PresentationOutlineOutputSchema = z.object({
  outline: z.string().describe('A slide-by-slide outline of the presentation.'),
});
export type PresentationOutlineOutput = z.infer<typeof PresentationOutlineOutputSchema>;


export async function generatePresentationOutline(input: PresentationOutlineInput): Promise<PresentationOutlineOutput> {
  return presentationOutlinerFlow(input);
}

const presentationOutlinerPrompt = ai.definePrompt({
  name: 'presentationOutlinerPrompt',
  input: {schema: PresentationOutlineInputSchema},
  output: {schema: PresentationOutlineOutputSchema},
  prompt: `You are an AI assistant specialized in creating presentation outlines.
  Based on the presentation title provided, generate a detailed slide-by-slide outline.
  The outline should include an introduction, main points, and a conclusion. Be creative and logical.

  Presentation Title: {{{title}}}
  `, 
});

const presentationOutlinerFlow = ai.defineFlow(
  {
    name: 'presentationOutlinerFlow',
    inputSchema: PresentationOutlineInputSchema,
    outputSchema: PresentationOutlineOutputSchema,
  },
  async input => {
    const {output} = await presentationOutlinerPrompt(input);
    return output!;
  }
);
