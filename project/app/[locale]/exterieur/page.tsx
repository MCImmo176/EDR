'use client';

interface PageProps {
  params: { locale: string };
}

export default function ExterieurPage({ params }: PageProps) {
  return (
    <section className="relative h-screen w-screen overflow-hidden p-0 m-0">
      <iframe
        src="https://www.youtube.com/embed/KC_DhNv3iM4?autoplay=1&mute=1&loop=1&playlist=KC_DhNv3iM4&controls=0"
        title="Villa luxe Côte d'Azur"
        allow="autoplay; encrypted-media"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
} 