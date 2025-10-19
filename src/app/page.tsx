import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ArrowRight,
  BookCopy,
  BrainCircuit,
  GraduationCap,
  Languages,
  LayoutTemplate,
  Quote,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: 'Topic Brainstormer',
    description: 'Get inspired with relevant sub-topic ideas for any course.',
  },
  {
    icon: <LayoutTemplate className="h-8 w-8" />,
    title: 'Presentation Outliner',
    description: 'Instantly generate a logical slide-by-slide presentation draft.',
  },
  {
    icon: <BookCopy className="h-8 w-8" />,
    title: 'Analogy Finder',
    description: 'Explain complex technical concepts with simple, clear analogies.',
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: 'Research Outliner',
    description:
      'Structure your thesis or research proposal with a standard academic outline.',
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Smart Reference Finder',
    description:
      'Discover effective keywords to supercharge your academic research.',
  },
  {
    icon: <Quote className="h-8 w-8" />,
    title: 'Academic Paraphraser',
    description:
      'Rephrase text to avoid plagiarism while preserving its original meaning.',
  },
  {
    icon: <Languages className="h-8 w-8" />,
    title: 'Journal Summarizer',
    description:
      'Understand complex English journals with easy-to-read summaries in Indonesian.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-6">
        <h1 className="font-headline text-3xl font-bold">EduAI</h1>
      </header>

      <main className="flex-1">
        <section className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 lg:py-24">
          <div className="space-y-6">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Supercharge Your Studies with AI
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              From brainstorming topics to summarizing complex journals, EduAI
              is your all-in-one academic assistant. Overcome writer's block and
              accelerate your learning.
            </p>
            <Link href="/topic-brainstormer">
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-2xl md:h-96">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </section>

        <section className="bg-muted/50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h3 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                A Toolkit for Every Student
              </h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to excel in your academic journey, powered
                by generative AI.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto border-t px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} EduAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
