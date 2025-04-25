"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useLanguage } from "@/hooks/useLanguage";

export default function GaleriePage() {
  const { tGallery } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const photos = [
    {
      src: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      alt: tGallery('images.exterior'),
      category: tGallery('categories.exterior')
    },
    {
      src: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      alt: tGallery('images.living'),
      category: tGallery('categories.interior')
    },
    {
      src: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
      alt: tGallery('images.bedroom'),
      category: tGallery('categories.bedrooms')
    },
    {
      src: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg",
      alt: tGallery('images.terrace'),
      category: tGallery('categories.exterior')
    },
    {
      src: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      alt: tGallery('images.kitchen'),
      category: tGallery('categories.interior')
    },
    {
      src: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg",
      alt: tGallery('images.seaView'),
      category: tGallery('categories.views')
    },
    {
      src: "https://images.pexels.com/photos/4946956/pexels-photo-4946956.jpeg",
      alt: tGallery('images.dining'),
      category: tGallery('categories.interior')
    },
    {
      src: "https://images.pexels.com/photos/2707756/pexels-photo-2707756.jpeg",
      alt: tGallery('images.aerial'),
      category: tGallery('categories.views')
    },
    {
      src: "https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg",
      alt: tGallery('images.master'),
      category: tGallery('categories.bedrooms')
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
            className="flex justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {tGallery('categories.all')}
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm">{photo.alt}</p>
                  <p className="text-xs opacity-75">{photo.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative w-full max-w-6xl aspect-[16/9]">
            <Image
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}