"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import SnakeRectangleAnimation from "../../../src/components/SnakeRectangleAnimation";

export default function GaleriePage() {
  const { tGallery } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const exterieurPhotos = [
    { src: "/images/gallery/exterieur/1.JPG", alt: "Façade de la villa côté mer", category: tGallery('categories.exterior') },
    { src: "/images/gallery/exterieur/2.JPEG", alt: "Jardin méditerranéen et terrasse", category: tGallery('categories.exterior') },
    { src: "/images/gallery/exterieur/3.JPEG", alt: "Piscine à débordement vue mer", category: tGallery('categories.exterior') },
    { src: "/images/gallery/exterieur/4.JPEG", alt: "Entrée principale de la villa", category: tGallery('categories.exterior') },
    { src: "/images/gallery/exterieur/5.JPEG", alt: "Vue panoramique sur la baie", category: tGallery('categories.exterior') },
    { src: "/images/gallery/exterieur/6.JPEG", alt: "Terrasse ombragée avec salon d'été", category: tGallery('categories.exterior') },
  ];
  const suitesPhotos = [
    { src: "/images/gallery/chambres/1.JPG", alt: "Suite parentale lumineuse", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/2.JPEG", alt: "Suite double avec vue jardin", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/3.JPEG", alt: "Suite cosy avec balcon", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/4.jpg", alt: "Suite contemporaine", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/5.jpg", alt: "Suite familiale spacieuse", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/6.JPEG", alt: "Suite avec salle de bain privative", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/7.jpg", alt: "Suite élégante avec dressing", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/8.JPEG", alt: "Suite avec terrasse privée", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/9.png", alt: "Suite design et colorée", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/10.JPG", alt: "Suite avec vue mer", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/11.JPEG", alt: "Suite raffinée", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/12.JPEG", alt: "Suite avec coin bureau", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/13.JPEG", alt: "Suite lumineuse et calme", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/14.JPEG", alt: "Suite avec accès direct au jardin", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/15.jpg", alt: "Suite avec grande armoire", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/16.JPEG", alt: "Suite avec salle d'eau moderne", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/17.JPEG", alt: "Suite avec lit king size", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/18.JPEG", alt: "Suite avec vue sur la pinède", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/19.JPEG", alt: "Suite avec décoration épurée", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/20.JPEG", alt: "Suite avec salle de bain attenante", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/21.JPEG", alt: "Suite avec terrasse fleurie", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/22.jpg", alt: "Suite avec vue sur la mer", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/23.JPEG", alt: "Suite avec ambiance zen", category: tGallery('categories.suites') },
  ];
  const interieurPhotos = [
    { src: "/images/gallery/interieur/1.JPEG", alt: "Salon spacieux et lumineux", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/2.JPEG", alt: "Salle à manger élégante", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/3.JPEG", alt: "Cuisine moderne toute équipée", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/4.JPEG", alt: "Salle de bain design", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/5.JPEG", alt: "Coin lecture cosy", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/6.JPEG", alt: "Entrée chaleureuse", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/7.JPEG", alt: "Salle de jeux pour enfants", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/8.JPEG", alt: "Salle de bain supplémentaire", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/9.JPEG", alt: "Chambre d'amis", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/10.JPG", alt: "Salon TV", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/11.JPEG", alt: "Salle de sport", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/12.JPEG", alt: "Bureau avec vue", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/13.png", alt: "Dressing moderne", category: tGallery('categories.interior') },
  ];
  const vuesPhotos = [
    { src: "/images/gallery/vues/Coucher de soleil.png", alt: "Coucher de soleil sur la mer", category: tGallery('categories.views') },
    { src: "/images/gallery/vues/Coucher de soleil 2.png", alt: "Vue sur la baie au crépuscule", category: tGallery('categories.views') },
    { src: "/images/gallery/vues/Coucher de soleil 3.png", alt: "Panorama méditerranéen", category: tGallery('categories.views') },
  ];

  const allPhotos = [
    ...exterieurPhotos,
    ...suitesPhotos,
    ...interieurPhotos,
    ...vuesPhotos,
  ];

  const categories = Array.from(new Set(allPhotos.map(photo => photo.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPhotos = activeCategory === null
    ? allPhotos
    : activeCategory === tGallery('categories.exterior') ? exterieurPhotos
    : activeCategory === tGallery('categories.suites') ? suitesPhotos
    : activeCategory === tGallery('categories.interior') ? interieurPhotos
    : vuesPhotos;

  return (
    <>
      <section className="relative h-screen w-screen overflow-hidden p-0 m-0">
        <iframe
          src="https://www.youtube.com/embed/ZZ3G80btSc8?autoplay=1&mute=1&loop=1&playlist=ZZ3G80btSc8&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
          title="Vidéo galerie villa"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-full h-full flex items-center justify-center">
            <SnakeRectangleAnimation
              textLine1="Explorez la"
              textLine2="Galerie de la villa"
            />
          </div>
        </div>
      </section>

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
                {category === tGallery('categories.suites') ? 'Suites' : category}
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
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-lg font-display">{photo.alt}</p>
                  <p className="text-sm opacity-75 mt-1">{photo.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {activeCategory === tGallery('categories.views') && (
            <div className="w-full flex justify-center mt-8">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/wl-HzkOtHC0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg w-full max-w-2xl aspect-video"
              />
            </div>
          )}

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
              src={allPhotos[selectedImage].src}
              alt={allPhotos[selectedImage].alt}
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