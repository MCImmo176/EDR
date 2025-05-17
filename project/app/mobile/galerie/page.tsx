"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";

// Types pour nos collections de photos
interface Photo {
  src: string;
  alt: string;
  category: string;
}

export default function GalerieMobilePage() {
  const { tGallery } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  
  const galleryRef = useRef<HTMLDivElement>(null);

  // Versions optimisées des photos pour mobile (moins d'images, tailles réduites)
  const exterieurPhotos = [
    { src: "/images/gallery/exterieur/1.JPG", alt: "Façade de la villa côté mer", category: tGallery('categories.exterior') },
    { src: "/images/gallery/exterieur/2.JPEG", alt: "Jardin méditerranéen et terrasse", category: tGallery('categories.exterior') },
    { src: "/images/gallery/exterieur/5.JPEG", alt: "Vue panoramique sur la baie", category: tGallery('categories.exterior') },
  ];

  const suitesPhotos = [
    { src: "/images/gallery/chambres/1.JPG", alt: "Suite parentale lumineuse", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/3.JPEG", alt: "Suite cosy avec balcon", category: tGallery('categories.suites') },
    { src: "/images/gallery/chambres/4.jpg", alt: "Suite contemporaine", category: tGallery('categories.suites') },
  ];

  const interieurPhotos = [
    { src: "/images/gallery/interieur/1.JPEG", alt: "Salon spacieux et lumineux", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/3.JPEG", alt: "Cuisine moderne toute équipée", category: tGallery('categories.interior') },
    { src: "/images/gallery/interieur/10.JPG", alt: "Salon TV", category: tGallery('categories.interior') },
  ];

  const vuesPhotos = [
    { src: "/images/gallery/vues/Coucher de soleil.png", alt: "Coucher de soleil sur la mer", category: tGallery('categories.views') },
    { src: "/images/gallery/vues/Coucher de soleil 3.png", alt: "Panorama méditerranéen", category: tGallery('categories.views') },
  ];

  // Toutes les photos combinées pour la section "Tous"
  const allPhotos = [
    ...exterieurPhotos,
    ...suitesPhotos,
    ...interieurPhotos,
    ...vuesPhotos,
  ];

  // Liste des catégories pour la navigation
  const categories = [
    { id: null, label: tGallery('categories.all') },
    { id: tGallery('categories.exterior'), label: "Extérieur" },
    { id: tGallery('categories.suites'), label: "Suites" },
    { id: tGallery('categories.interior'), label: "Intérieur" },
    { id: tGallery('categories.views'), label: "Vue" },
  ];

  // Déterminer les photos à afficher selon la catégorie sélectionnée
  const filteredPhotos = activeCategory === null
    ? allPhotos
    : activeCategory === tGallery('categories.exterior') ? exterieurPhotos
    : activeCategory === tGallery('categories.suites') ? suitesPhotos
    : activeCategory === tGallery('categories.interior') ? interieurPhotos
    : vuesPhotos;

  // Changement de catégorie
  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    setIsCategoryMenuOpen(false);
  };

  // Gestion du lightbox
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {/* Hero Section - Version Mobile Optimisée */}
      <section className="relative h-[80vh] w-full overflow-hidden p-0 m-0">
        {/* Image Background au lieu de vidéo pour mobile */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/images/gallery/vues/Coucher de soleil.png"
            alt="Vue panoramique"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-[5]"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full h-full flex flex-col justify-center items-start">
            <div className="pl-8 w-full max-w-full">
              <div className="mb-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white text-4xl font-light tracking-wider"
                >
                  L'expérience<br />
                  <span className="font-extralight tracking-wide">ciel et mer</span>
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-[1px] bg-gradient-to-r from-[#BC9A6B] to-[#BC9A6B]/30 mt-4"
                ></motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-4"
              >
                <p className="text-white/90 text-base font-light leading-relaxed">
                  Une collection d'images exclusives de notre propriété d'exception.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Title Section */}
      <section className="py-10 bg-[#F8F7F5]">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              title={tGallery('title')}
              subtitle={tGallery('subtitle')}
              centered
            />
          </motion.div>
        </div>
      </section>

      {/* Mobile Category Menu */}
      <section className="pb-6 bg-[#F8F7F5]">
        <div className="container px-4">
          <div className="relative">
            <button 
              className="flex items-center justify-between w-full px-4 py-3 text-sm text-left border border-gray-200 rounded-md focus:outline-none"
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            >
              <span className="uppercase tracking-widest font-light">
                {categories.find(cat => cat.id === activeCategory)?.label || "Toutes les photos"}
              </span>
              <motion.div
                animate={{ rotate: isCategoryMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="rotate-90 w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isCategoryMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                  {categories.map((category) => (
                    <button
                      key={category.id ?? "all"}
                      className={`block w-full px-4 py-3 text-sm text-left uppercase tracking-widest font-light ${activeCategory === category.id ? 'bg-[#F8F7F5] text-[#BC9A6B]' : ''}`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Mobile Gallery Grid - Optimisé pour vertical scrolling */}
      <section className="pb-16 bg-[#F8F7F5]">
        <div className="container px-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={`${photo.src}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className="relative aspect-[4/5] w-full rounded-md overflow-hidden shadow-sm"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm font-light">{photo.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div>
              <h2 className="text-2xl font-light mb-8 text-[#1A1A1A] leading-tight">
                Découvrez l'expérience unique de notre propriété
              </h2>
              
              <Button
                asChild
                size="default"
                className="bg-[#b7a66b] text-white border border-[#b7a66b] hover:bg-white hover:text-[#b7a66b] hover:border-[#b7a66b] rounded-none px-6 py-5 transition-all duration-300"
              >
                <Link href="/contact">
                  <span className="uppercase text-sm tracking-widest font-light">Réserver votre séjour</span>
                  <ArrowRight className="ml-2 w-4 h-4 inline-block" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal - Optimisé pour mobile */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-white z-50 bg-black/50 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Left Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1);
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Navigation */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((selectedImage + 1) % filteredPhotos.length);
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredPhotos[selectedImage].src}
                alt={filteredPhotos[selectedImage].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              
              {/* Image Caption */}
              <div className="absolute bottom-0 left-0 right-0 text-center text-white p-4 bg-black/40">
                <p className="text-sm font-light">
                  {filteredPhotos[selectedImage].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 