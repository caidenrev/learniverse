import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  LayoutTemplate,
  BookCopy,
  GraduationCap,
  BookMarked,
  Quote,
  Languages,
  Bot,
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
        title: 'Pencari Referensi',
        icon: BookMarked,
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
];
