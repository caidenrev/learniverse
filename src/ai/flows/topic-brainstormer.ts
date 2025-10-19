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
  prompt: `You are a helpful assistant that brainstorms sub-topic ideas for a given course or theme.

  Generate a list of interesting and relevant sub-topic ideas for the following course or theme:
  {{courseOrTheme}}

  The sub-topic ideas should be specific and actionable.
  The response should be a JSON array of strings.
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
