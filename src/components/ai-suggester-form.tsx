'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { suggestWebsiteCopyImprovements, SuggestWebsiteCopyImprovementsOutput } from '@/ai/flows/suggest-website-copy-improvements';

const copyTypes = [
  'company overview',
  'mission',
  'core values',
  'product descriptions',
  'service descriptions',
];

const formSchema = z.object({
  copyType: z.string().min(1, { message: 'Please select a copy type.' }),
  currentCopy: z.string().min(20, { message: 'Please enter at least 20 characters of copy.' }),
});

export function AiSuggesterForm() {
  const { toast } = useToast();
  const [suggestion, setSuggestion] = useState<SuggestWebsiteCopyImprovementsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      copyType: '',
      currentCopy: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestWebsiteCopyImprovements(values);
      setSuggestion(result);
    } catch (error) {
      console.error('AI suggestion error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Improve Your Website Copy</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="copyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Copy</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a copy type to improve" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {copyTypes.map((type) => (
                        <SelectItem key={type} value={type} className="capitalize">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentCopy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Copy</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your current website copy here..."
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Generating...' : 'Get Suggestions'}
            </Button>
          </form>
        </Form>

        {suggestion && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-headline text-xl font-semibold text-primary mb-4">AI-Powered Suggestion</h3>
            <div className="bg-accent/10 p-4 rounded-md border border-accent/20">
              <p className="text-foreground whitespace-pre-wrap">{suggestion.improvedCopy}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
