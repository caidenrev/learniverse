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
  prompt: `Kamu adalah seorang ahli penulis akademis yang jago menyusun ulang kalimat. Kamu akan diberi sebuah teks dari jurnal akademis, dan tugasmu adalah menuliskannya kembali dengan gaya yang santai dan berbeda biar nggak kena plagiat, tapi artinya tetap sama.

Teks Asli: {{{text}}}

Hasilnya harus dalam bahasa Indonesia yang santai dan jangan pakai format markdown seperti bold atau heading.

Teks Hasil Parafrase: `,
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
