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
  prompt: `You are an expert curriculum designer and career coach. Your task is to generate a comprehensive, step-by-step learning path (roadmap) for a given topic.

  The topic is: {{{topic}}}

  The learning path should be structured logically, starting from the fundamentals and progressing to more advanced concepts. Include key technologies, concepts, and suggested projects for each stage. The output should be formatted in clear, easy-to-read markdown.
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
