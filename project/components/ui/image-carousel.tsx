"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
}

export function ImageCarousel({
  images,
  className,
  aspectRatio = "video",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-[16/9]",
    wide: "aspect-[21/9]",
  };

  const goToPrevious = useCallback(() => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative group", className)}>
      <div className={cn("w-full overflow-hidden", aspectRatioClass[aspectRatio])}>
        <div className="relative h-full w-full">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
        </div>
      </div>
      
      {images.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentIndex === idx 
                    ? "bg-white scale-125" 
                    : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}