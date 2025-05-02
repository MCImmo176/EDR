import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Extérieur - Les Étoiles du Rocher',
  description: 'Découvrez l\'extérieur de notre villa de luxe sur la Côte d\'Azur',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="exterieur-layout">
      {children}
    </div>
  );
} 