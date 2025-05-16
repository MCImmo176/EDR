"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: { src: string; alt: string; description?: string; subDescription?: string }[];
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
  showOverlay?: boolean;
  onClose?: () => void;
}

export function ImageCarousel({
  images,
  className,
  aspectRatio = "video",
  showOverlay = false,
  onClose,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-[16/9]",
    wide: "aspect-[21/9]",
  };

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  // Gérer les touches de clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showOverlay) return;
      
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, onClose, showOverlay]);

  // Empêcher le défilement du corps lorsque l'overlay est affiché
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showOverlay]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div className={cn(
      "relative group", 
      className,
      showOverlay && "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
    )} ref={galleryRef}>
      <div className={cn(
        "w-full overflow-hidden", 
        aspectRatioClass[aspectRatio],
        showOverlay && "max-w-6xl max-h-[80vh] h-auto aspect-auto mx-auto"
      )}>
        <div className="relative h-full w-full select-none">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
            unoptimized={false}
            onClick={(e) => e.stopPropagation()}
            style={{ outline: "none", userSelect: "none" }}
          />
          
          {/* Description de l'image */}
          {(currentImage.description || currentImage.subDescription) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              {currentImage.description && (
                <h3 className="text-lg font-semibold">{currentImage.description}</h3>
              )}
              {currentImage.subDescription && (
                <p className="text-sm text-white/80">{currentImage.subDescription}</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showOverlay && onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full hover:bg-white/20 z-50"
          aria-label="Fermer la galerie"
        >
          <X className="h-6 w-6" />
        </Button>
      )}
      
      {images.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm hover:bg-white/40 text-white rounded-full shadow-md z-10"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm hover:bg-white/40 text-white rounded-full shadow-md z-10"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentIndex === idx 
                    ? "bg-white scale-125" 
                    : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Aller à l'image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}