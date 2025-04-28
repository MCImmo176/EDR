"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";

export default function GaleriePage() {
  const { tGallery } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const photos = [
    // Chambres
    {
      src: "/images/gallery/chambres/chamber verte.png",
      alt: "Chambre verte",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre verte 2.png",
      alt: "Chambre verte",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambrerose.png",
      alt: "Chambre rose",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre noire 2è.png",
      alt: "Chambre noire",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre noire1.png",
      alt: "Chambre noire",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre.jpg",
      alt: "Chambre",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre noire 2.avif",
      alt: "Chambre noire",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre noire.avif",
      alt: "Chambre noire",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre Rose.avif",
      alt: "Chambre rose",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre verte2.avif",
      alt: "Chambre verte",
      category: tGallery('categories.bedrooms')
    },
    {
      src: "/images/gallery/chambres/chambre.avif",
      alt: "Chambre",
      category: tGallery('categories.bedrooms')
    },
    // Vues
    {
      src: "/images/gallery/vues/Coucher de soleil 3.png",
      alt: "Coucher de soleil",
      category: tGallery('categories.views')
    },
    {
      src: "/images/gallery/vues/Coucher de soleil 2.png",
      alt: "Coucher de soleil",
      category: tGallery('categories.views')
    },
    {
      src: "/images/gallery/vues/Coucher de soleil.png",
      alt: "Coucher de soleil",
      category: tGallery('categories.views')
    },
    {
      src: "/images/gallery/vues/IMG_2349.JPEG",
      alt: "Vue panoramique",
      category: tGallery('categories.views')
    },
    {
      src: "/images/gallery/vues/IMG_2363.JPEG",
      alt: "Vue panoramique",
      category: tGallery('categories.views')
    },
    {
      src: "/images/gallery/vues/IMG_2350.JPEG",
      alt: "Vue panoramique",
      category: tGallery('categories.views')
    },
    // Extérieur
    {
      src: "/images/gallery/exterieur/IMG_5953.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_5960.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2280.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2300.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2304.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2305.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2314.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2347.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2348.JPEG",
      alt: "Piscine",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2364.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2398.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    {
      src: "/images/gallery/exterieur/IMG_2406.JPEG",
      alt: "Vue extérieure de la villa",
      category: tGallery('categories.exterior')
    },
    // Intérieur
    {
      src: "/images/gallery/interieur/IMG_2290.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/sdb5.avif",
      alt: "Salle de bain",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/Salon.png",
      alt: "Salon",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_5959.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_5967.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2286.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2287.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2288.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2294.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2298.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2318.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2328.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2337.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2338.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2339.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2360.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2361.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2392.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    },
    {
      src: "/images/gallery/interieur/IMG_2409.JPEG",
      alt: "Intérieur de la villa",
      category: tGallery('categories.interior')
    }
  ];

  const categories = Array.from(new Set(photos.map(photo => photo.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPhotos = activeCategory 
    ? photos.filter(photo => photo.category === activeCategory)
    : photos;

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title={tGallery('title')}
              subtitle={tGallery('subtitle')}
              centered
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === null
                  ? "bg-black text-white"
                  : "bg-muted hover:bg-black hover:text-white"
              }`}
            >
              {tGallery('categories.all')}
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-muted hover:bg-black hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-muted"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-lg font-display">{photo.alt}</p>
                  <p className="text-sm opacity-75 mt-1">{photo.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-16"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black rounded-full hover:bg-white hover:text-black border-2 border-black transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Découvrir les alentours
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative w-full max-w-7xl aspect-[16/9]">
            <Image
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}