"use client";

import { useEffect, useRef } from "react";

interface FullscreenVideoProps {
  videoUrl: string;
  title?: string;
  overlay?: boolean;
}

export function FullscreenVideo({ videoUrl, title, overlay = false }: FullscreenVideoProps) {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial resize
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    if (videoRef.current) {
      const videoContainer = videoRef.current;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      const videoRatio = 16 / 9;
      
      if (windowRatio < videoRatio) {
        const newWidth = windowHeight * videoRatio;
        videoContainer.style.width = `${newWidth}px`;
        videoContainer.style.height = '100%';
        videoContainer.style.left = `${(windowWidth - newWidth) / 2}px`;
        videoContainer.style.top = '0';
      } else {
        const newHeight = windowWidth / videoRatio;
        videoContainer.style.width = '100%';
        videoContainer.style.height = `${newHeight}px`;
        videoContainer.style.left = '0';
        videoContainer.style.top = `${(windowHeight - newHeight) / 2}px`;
      }
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <iframe
          ref={videoRef}
          src={videoUrl}
          title={title || "Vidéo en plein écran"}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute"
          style={{ 
            width: '100%', 
            height: '100%',
            position: 'absolute',
            objectFit: 'cover',
            filter: 'brightness(1.05) contrast(1.05)'
          }}
        />
      </div>
      {overlay && <div className="absolute inset-0 bg-black/10" />}
    </div>
  );
} 