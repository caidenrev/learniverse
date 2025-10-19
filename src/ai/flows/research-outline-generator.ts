'use server';

/**
 * @fileOverview Generates a draft research proposal or thesis structure based on a given topic.
 *
 * - generateResearchOutline - A function that generates the research outline.
 * - ResearchOutlineInput - The input type for the generateResearchOutline function.
 * - ResearchOutlineOutput - The return type for the generateResearchOutline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResearchOutlineInputSchema = z.object({
  topic: z
    .string()
    .describe('The main topic for which to generate a research outline.'),
});
export type ResearchOutlineInput = z.infer<typeof ResearchOutlineInputSchema>;

const ResearchOutlineOutputSchema = z.object({
  outline: z
    .string()
    .describe(
      'A draft research outline, including sections like introduction, literature review, methodology, etc.'
    ),
});
export type ResearchOutlineOutput = z.infer<typeof ResearchOutlineOutputSchema>;

export async function generateResearchOutline(
  input: ResearchOutlineInput
): Promise<ResearchOutlineOutput> {
  return researchOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'researchOutlinePrompt',
  input: {schema: ResearchOutlineInputSchema},
  output: {schema: ResearchOutlineOutputSchema},
  prompt: `You are an expert academic researcher. Your task is to generate a research outline for a given topic, commonly used in Indonesian universities.

  The topic is: {{{topic}}}

  The outline should include common sections such as:
  - BAB I: Latar Belakang (Background)
  - Rumusan Masalah (Problem Statement)
  - Tujuan Penelitian (Research Objectives)
  - Manfaat Penelitian (Research Benefits)
  - BAB II: Tinjauan Pustaka (Literature Review)
  - BAB III: Metodologi Penelitian (Research Methodology)
  - BAB IV: Hasil dan Pembahasan (Results and Discussion)
  - BAB V: Kesimpulan dan Saran (Conclusion and Suggestions)

  Provide a detailed outline with sub-points for each section.
  Output should be in Bahasa Indonesia.
`,
});

const researchOutlineFlow = ai.defineFlow(
  {
    name: 'researchOutlineFlow',
    inputSchema: ResearchOutlineInputSchema,
    outputSchema: ResearchOutlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
