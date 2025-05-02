'use client';

export default function ExterieurPage() {
  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/KC_DhNv3iM4?autoplay=1&mute=1&loop=1"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
        allowFullScreen
      />
    </section>
  );
} 