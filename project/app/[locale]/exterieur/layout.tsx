import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extérieur - Les Étoiles du Rocher',
  description: 'Découvrez l\'extérieur de notre villa de luxe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 