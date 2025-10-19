'use server';

/**
 * @fileOverview Generates a learning path or roadmap for a given topic.
 *
 * - generateLearningPath - A function that generates the learning path.
 * - LearningPathInput - The input type for the generateLearningPath function.
 * - LearningPathOutput - The return type for the generateLearningPath function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const LearningPathInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic for which to generate a learning path (e.g., "frontend development").'),
});
export type LearningPathInput = z.infer<typeof LearningPathInputSchema>;

const LearningPathOutputSchema = z.object({
  learningPath: z
    .string()
    .describe(
      'A detailed, step-by-step learning path or roadmap for the given topic, formatted as markdown.'
    ),
});
export type LearningPathOutput = z.infer<typeof LearningPathOutputSchema>;

export async function generateLearningPath(
  input: LearningPathInput
): Promise<LearningPathOutput> {
  return learningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'learningPathPrompt',
  input: { schema: LearningPathInputSchema },
  output: { schema: LearningPathOutputSchema },
  prompt: `Kamu adalah seorang ahli pembuat kurikulum dan career coach yang asik. Tugasmu adalah membuat peta jalan belajar (roadmap) yang lengkap dan langkah demi langkah untuk sebuah topik.

  Topiknya adalah: {{{topic}}}

  Peta jalan belajarnya harus logis, mulai dari dasar sampai ke hal-hal yang lebih expert. Sertakan juga teknologi, konsep kunci, dan contoh proyek untuk setiap tahap.
  
  Tolong hasilnya ditulis dalam bahasa Indonesia yang santai dan jangan pakai format markdown seperti bold atau heading.
`,
});

const learningPathFlow = ai.defineFlow(
  {
    name: 'learningPathFlow',
    inputSchema: LearningPathInputSchema,
    outputSchema: LearningPathOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
