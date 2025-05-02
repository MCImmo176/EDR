'use client';

import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Extérieur - Les Étoiles du Rocher',
  description: 'Découvrez l\'extérieur de notre villa de luxe sur la Côte d\'Azur',
};

interface PageProps {
  params: {
    locale: string;
  };
}

const ExterieurPage: React.FC<PageProps> = ({ params }) => {
  return (
    <section className="relative h-screen w-screen overflow-hidden p-0 m-0">
      <iframe
        src="https://www.youtube.com/embed/KC_DhNv3iM4?autoplay=1&mute=1&loop=1&playlist=KC_DhNv3iM4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
        title="Vidéo extérieur villa"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      {/* Garder le contenu overlay/texte/animation existant ici */}
    </section>
  );
};

export default ExterieurPage; 