"use client";
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

interface MobileHeroImageProps {
  src: string;
  alt: string;
}

export const MobileHeroImage = ({ src, alt }: MobileHeroImageProps) => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return (
    <div className="w-full aspect-[4/3] relative md:hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 0vw"
        placeholder="blur"
        blurDataURL="/images/placeholder-blur.png"
        loading="lazy"
        className="object-cover rounded-lg"
        priority={false}
      />
    </div>
  );
}; 