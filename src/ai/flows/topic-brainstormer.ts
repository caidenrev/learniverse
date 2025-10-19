'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating sub-topic ideas based on a given course or theme.
 *
 * The flow takes a course or theme as input and returns a list of sub-topic ideas.
 * It exports the `topicBrainstormer` function, the `TopicBrainstormerInput` type, and the `TopicBrainstormerOutput` type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TopicBrainstormerInputSchema = z.object({
  courseOrTheme: z.string().describe('The course or theme to generate sub-topic ideas for.'),
});
export type TopicBrainstormerInput = z.infer<typeof TopicBrainstormerInputSchema>;

const TopicBrainstormerOutputSchema = z.object({
  subTopicIdeas: z.array(z.string()).describe('A list of sub-topic ideas.'),
});
export type TopicBrainstormerOutput = z.infer<typeof TopicBrainstormerOutputSchema>;

export async function topicBrainstormer(input: TopicBrainstormerInput): Promise<TopicBrainstormerOutput> {
  return topicBrainstormerFlow(input);
}

const topicBrainstormerPrompt = ai.definePrompt({
  name: 'topicBrainstormerPrompt',
  input: {schema: TopicBrainstormerInputSchema},
  output: {schema: TopicBrainstormerOutputSchema},
  prompt: `Kamu adalah asisten yang asik buat brainstorming ide sub-topik dari sebuah mata kuliah atau tema.

  Kasih beberapa ide sub-topik yang menarik dan relevan untuk mata kuliah atau tema ini:
  {{courseOrTheme}}

  Ide sub-topiknya harus spesifik dan bisa dikerjain.
  
  Hasilnya harus dalam bahasa Indonesia yang santai dan jangan pakai format markdown seperti bold atau heading.
  Responsnya harus berupa JSON array of strings.
  `,
});

const topicBrainstormerFlow = ai.defineFlow(
  {
    name: 'topicBrainstormerFlow',
    inputSchema: TopicBrainstormerInputSchema,
    outputSchema: TopicBrainstormerOutputSchema,
  },
  async input => {
    const {output} = await topicBrainstormerPrompt(input);
    return output!;
  }
);
