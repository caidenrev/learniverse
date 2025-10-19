
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
  Bot,
  Map,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: 'Brainstorm Topik',
    description:
      'Dapatkan inspirasi dengan ide sub-topik yang relevan untuk mata kuliah apa pun.',
    href: '/topic-brainstormer',
  },
  {
    icon: <LayoutTemplate className="h-8 w-8" />,
    title: 'Kerangka Presentasi',
    description:
      'Secara instan menghasilkan draf presentasi slide-demi-slide yang logis.',
    href: '/presentation-outliner',
  },
  {
    icon: <BookCopy className="h-8 w-8" />,
    title: 'Pencari Analogi',
    description:
      'Jelaskan konsep teknis yang kompleks dengan analogi yang sederhana dan jelas.',
    href: '/analogy-finder',
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: 'Kerangka Penelitian',
    description:
      'Susun tesis atau proposal penelitian Anda dengan kerangka akademis standar.',
    href: '/research-outline-generator',
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Pencari Referensi Cerdas',
    description:
      'Temukan kata kunci yang efektif untuk memaksimalkan riset akademis Anda.',
    href: '/smart-reference-finder',
  },
  {
    icon: <Quote className="h-8 w-8" />,
    title: 'Parafrase Akademik',
    description:
      'Ubah susunan kalimat untuk menghindari plagiarisme sambil mempertahankan makna aslinya.',
    href: '/academic-paraphraser',
  },
  {
    icon: <Languages className="h-8 w-8" />,
    title: 'Peringkas Jurnal',
    description:
      'Pahami jurnal bahasa Inggris yang kompleks dengan ringkasan yang mudah dibaca dalam bahasa Indonesia.',
    href: '/summarizer',
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: 'Tutor AI',
    description:
      'Ajukan pertanyaan tentang materi kuliah Anda dan dapatkan jawaban instan.',
    href: '/ai-tutor',
  },
  {
    icon: <Map className="h-8 w-8" />,
    title: 'Peta Jalan Belajar',
    description:
      'Buat peta jalan belajar yang terstruktur untuk topik apa pun yang ingin Anda kuasai.',
    href: '/learning-path-generator',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container">
        <header className="flex items-center justify-between px-4 py-6">
          <h1 className="font-headline text-3xl font-bold">EduAI</h1>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tentang
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Kontak
            </Link>
          </nav>
        </header>

        <main className="flex-1">
          <section className="grid grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 lg:py-24">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Tingkatkan Kemampuan Belajarmu dengan AI
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Mulai dari brainstorming topik hingga meringkas jurnal yang
                rumit, EduAI adalah asisten akademis lengkap untukmu. Atasi
                kebuntuan menulis dan percepat proses belajarmu.
              </p>
              <div className="pt-4">
                <Link href="/topic-brainstormer">
                  <Button size="lg" className="mt-4">
                    Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
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

          <section className="bg-muted/50 -mx-4 px-4 py-16 sm:mx-0 lg:py-24">
            <div className="mx-auto">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <h3 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                  Satu Set Alat untuk Setiap Siswa
                </h3>
                <p className="mt-4 text-lg text-muted-foreground">
                  Semua yang Anda butuhkan untuk unggul dalam perjalanan akademis
                  Anda, didukung oleh AI generatif.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <Link
                    href={feature.href}
                    key={feature.title}
                    className="flex"
                  >
                    <Card className="flex flex-1 flex-col transition-all hover:ring-2 hover:ring-primary">
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
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-16 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Tentang EduAI
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                EduAI lahir dari gagasan untuk membuat teknologi AI canggih
                dapat diakses oleh semua siswa. Kami percaya bahwa dengan alat
                yang tepat, setiap orang dapat mengatasi tantangan akademis,
                mempercepat proses belajar, dan mencapai potensi penuh mereka.
                Misi kami adalah untuk memberdayakan siswa dengan menyediakan
                asisten belajar bertenaga AI yang intuitif, membantu, dan
                selalu tersedia 24/7.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduAI. Seluruh hak cipta.
          </p>
        </footer>
      </div>
    </div>
  );
}
