import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Photo {
  src: string;
  alt: string;
  category: string;
  size: string;
}

interface DynamicBottomGalleryProps {
  lastThreePhotos: Photo[];
  shouldSeparateLastThree: boolean;
  filteredPhotos: Photo[];
  setSelectedImage: (index: number | null) => void;
}

const DynamicBottomGallery = ({ 
  lastThreePhotos, 
  shouldSeparateLastThree, 
  filteredPhotos, 
  setSelectedImage 
}: DynamicBottomGalleryProps) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (!shouldSeparateLastThree || lastThreePhotos.length !== 3) return;

    // On récupère la hauteur maximale des 3 images
    const heights = imageRefs.current.map((ref) => ref?.clientHeight || 0);
    const max = Math.max(...heights);
    setMaxHeight(max);
  }, [lastThreePhotos, shouldSeparateLastThree]);

  return (
    shouldSeparateLastThree &&
    lastThreePhotos.length === 3 && (
      <div className="mt-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-3 gap-4"
        >
          {lastThreePhotos.map((photo, photoIndex) => (
            <motion.div
              key={`bottom-${photoIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: photoIndex * 0.1 + 0.5 }}
              className="group relative"
              style={{ height: maxHeight || "auto" }} // Hauteur dynamique appliquée
              onClick={() => {
                const globalIndex = filteredPhotos.findIndex(
                  (p) => p.src === photo.src && p.alt === photo.alt
                );
                setSelectedImage(globalIndex);
              }}
            >
              <div
                className="w-full h-full overflow-hidden rounded-lg bg-muted"
                ref={(el) => (imageRefs.current[photoIndex] = el)} // Stocke la ref
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                <p className="text-base sm:text-lg font-display">{photo.alt}</p>
                <p className="text-xs sm:text-sm opacity-75 mt-1">{photo.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  );
};

export default DynamicBottomGallery; 