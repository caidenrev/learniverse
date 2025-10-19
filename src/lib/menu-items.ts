import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  LayoutTemplate,
  BookCopy,
  GraduationCap,
  BookMarked,
  Quote,
  Languages,
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
    title: 'Idea Catalyst',
    items: [
      {
        href: '/topic-brainstormer',
        title: 'Topic Brainstormer',
        icon: BrainCircuit,
      },
      {
        href: '/presentation-outliner',
        title: 'Presentation Outliner',
        icon: LayoutTemplate,
      },
      {
        href: '/analogy-finder',
        title: 'Analogy Finder',
        icon: BookCopy,
      },
    ],
  },
  {
    title: 'Research Assistant',
    items: [
      {
        href: '/research-outline-generator',
        title: 'Research Outliner',
        icon: GraduationCap,
      },
      {
        href: '/smart-reference-finder',
        title: 'Reference Finder',
        icon: BookMarked,
      },
      {
        href: '/academic-paraphraser',
        title: 'Academic Paraphraser',
        icon: Quote,
      },
      {
        href: '/summarizer',
        title: 'Journal Summarizer',
        icon: Languages,
      },
    ],
  },
];
