import React from 'react';

export const ExteriorVideo = () => {
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
    </section>
  );
};

export default ExteriorVideo; 