import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  LayoutTemplate,
  BookCopy,
  GraduationCap,
  Search,
  Quote,
  Languages,
  Bot,
  Map,
  Info,
  Mail,
} from 'lucide-react';

interface MenuItem {
  href: string;
  title: string;
  icon: LucideIcon;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const menuItems: MenuGroup[] = [
  {
    title: 'Asisten Belajar',
    items: [
      {
        href: '/ai-tutor',
        title: 'Tutor AI',
        icon: Bot,
      },
      {
        href: '/learning-path-generator',
        title: 'Peta Jalan Belajar',
        icon: Map,
      },
    ],
  },
  {
    title: 'Katalisator Ide',
    items: [
      {
        href: '/topic-brainstormer',
        title: 'Brainstorm Topik',
        icon: BrainCircuit,
      },
      {
        href: '/presentation-outliner',
        title: 'Kerangka Presentasi',
        icon: LayoutTemplate,
      },
      {
        href: '/analogy-finder',
        title: 'Pencari Analogi',
        icon: BookCopy,
      },
    ],
  },
  {
    title: 'Asisten Riset',
    items: [
      {
        href: '/research-outline-generator',
        title: 'Kerangka Penelitian',
        icon: GraduationCap,
      },
      {
        href: '/smart-reference-finder',
        title: 'Pencari Referensi Cerdas',
        icon: Search,
      },
      {
        href: '/academic-paraphraser',
        title: 'Parafrase Akademik',
        icon: Quote,
      },
      {
        href: '/summarizer',
        title: 'Peringkas Jurnal',
        icon: Languages,
      },
    ],
  },
  {
    title: 'Informasi',
    items: [
      {
        href: '/about',
        title: 'Tentang',
        icon: Info,
      },
      {
        href: '/contact',
        title: 'Kontak',
        icon: Mail,
      },
    ],
  },
];
