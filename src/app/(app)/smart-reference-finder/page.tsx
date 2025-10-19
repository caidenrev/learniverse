'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { smartReferenceFinder } from '@/ai/flows/smart-reference-finder';
import { Loader2, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  searchTerm: z
    .string()
    .min(3, 'Please enter a term with at least 3 characters.')
    .max(100, 'Term is too long. Please keep it under 100 characters.'),
});

export default function SmartReferenceFinderPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchTerm: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await smartReferenceFinder(values.searchTerm);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to find keywords. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold md:text-4xl">
          Smart Reference Finder
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enhance your Google Scholar searches. Get alternative and related
          keywords to find the most relevant academic references.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-headline text-2xl font-semibold">
            Initial Term
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="searchTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Term or Concept</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'customer satisfaction' or 'mobile app usability'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a term to find related keywords.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Find Keywords
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4">
          <h2 className="font-headline text-2xl font-semibold">
            Suggested Keywords
          </h2>
          <Card className="min-h-[240px]">
            <CardContent className="p-6">
              {isLoading && (
                <div className="flex items-center justify-center pt-16">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              )}
              {result && (
                <div className="flex flex-wrap gap-2">
                  {result.split(',').map((keyword) => (
                    <Badge key={keyword.trim()} variant="secondary">
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              )}
              {!isLoading && !result && (
                <p className="pt-16 text-center text-muted-foreground">
                  Your generated keywords will appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
