'use server';

/**
 * @fileOverview A flow to suggest improvements for website copy using GenAI.
 *
 * - suggestWebsiteCopyImprovements - A function that suggests improvements for website copy.
 * - SuggestWebsiteCopyImprovementsInput - The input type for the suggestWebsiteCopyImprovements function.
 * - SuggestWebsiteCopyImprovementsOutput - The return type for the suggestWebsiteCopyImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWebsiteCopyImprovementsInputSchema = z.object({
  copyType: z
    .string()
    .describe(
      'The type of copy to improve (company overview, mission, core values, product descriptions, service descriptions).' // Corrected typo here
    ),
  currentCopy: z.string().describe('The current copy that needs improvement.'),
});

export type SuggestWebsiteCopyImprovementsInput = z.infer<
  typeof SuggestWebsiteCopyImprovementsInputSchema
>;

const SuggestWebsiteCopyImprovementsOutputSchema = z.object({
  improvedCopy: z.string().describe('The improved copy suggested by the AI.'),
});

export type SuggestWebsiteCopyImprovementsOutput = z.infer<
  typeof SuggestWebsiteCopyImprovementsOutputSchema
>;

export async function suggestWebsiteCopyImprovements(
  input: SuggestWebsiteCopyImprovementsInput
): Promise<SuggestWebsiteCopyImprovementsOutput> {
  return suggestWebsiteCopyImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWebsiteCopyImprovementsPrompt',
  input: {schema: SuggestWebsiteCopyImprovementsInputSchema},
  output: {schema: SuggestWebsiteCopyImprovementsOutputSchema},
  prompt: `You are an expert copywriter specializing in website content.
  You will be provided with the current copy for a specific section of a website and asked to improve it.
  The goal is to make the copy more engaging, clear, and effective in conveying the intended message.

  Copy Type: {{{copyType}}}
  Current Copy: {{{currentCopy}}}

  Please provide improved copy for the section.`, // Added the `Please provide improved copy for the section.` line
});

const suggestWebsiteCopyImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestWebsiteCopyImprovementsFlow',
    inputSchema: SuggestWebsiteCopyImprovementsInputSchema,
    outputSchema: SuggestWebsiteCopyImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
