"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/utils";

// Types pour nos collections de photos
interface Photo {
  src: string;
  alt: string;
  category: string;
  aspectRatio: string; // Portrait, landscape ou panoramic
}

export default function GaleriePage() {
  const { tGallery, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Définition des collections d'images par catégorie
  const exterieurPhotos: Photo[] = [
    { src: "/images/gallery/exterieur/1.JPG", alt: "Façade de la villa côté mer", category: tGallery('categories.exterior'), aspectRatio: "portrait" },
    { src: "/images/gallery/exterieur/2.JPEG", alt: "Jardin méditerranéen et terrasse", category: tGallery('categories.exterior'), aspectRatio: "landscape" },
    { src: "/images/gallery/exterieur/3.JPEG", alt: "Piscine à débordement vue mer", category: tGallery('categories.exterior'), aspectRatio: "landscape" },
    { src: "/images/gallery/exterieur/4.JPEG", alt: "Entrée principale de la villa", category: tGallery('categories.exterior'), aspectRatio: "portrait" },
    { src: "/images/gallery/exterieur/5.JPEG", alt: "Vue panoramique sur la baie", category: tGallery('categories.exterior'), aspectRatio: "panoramic" },
    { src: "/images/gallery/exterieur/6.JPEG", alt: "Terrasse ombragée avec salon d'été", category: tGallery('categories.exterior'), aspectRatio: "landscape" },
  ];

  const suitesPhotos: Photo[] = [
    { src: "/images/gallery/chambres/1.JPG", alt: "Suite parentale lumineuse", category: tGallery('categories.suites'), aspectRatio: "landscape" },
    { src: "/images/gallery/chambres/2.JPEG", alt: "Suite double avec vue jardin", category: tGallery('categories.suites'), aspectRatio: "portrait" },
    { src: "/images/gallery/chambres/3.JPEG", alt: "Suite cosy avec balcon", category: tGallery('categories.suites'), aspectRatio: "portrait" },
    { src: "/images/gallery/chambres/4.jpg", alt: "Suite contemporaine", category: tGallery('categories.suites'), aspectRatio: "landscape" },
    { src: "/images/gallery/chambres/5.jpg", alt: "Suite familiale spacieuse", category: tGallery('categories.suites'), aspectRatio: "landscape" },
    { src: "/images/gallery/chambres/17.JPEG", alt: "Suite avec lit king size", category: tGallery('categories.suites'), aspectRatio: "landscape" },
    { src: "/images/gallery/chambres/11.JPEG", alt: "Suite raffinée", category: tGallery('categories.suites'), aspectRatio: "portrait" },
    { src: "/images/gallery/chambres/23.JPEG", alt: "Suite avec ambiance zen", category: tGallery('categories.suites'), aspectRatio: "portrait" },
  ];

  const interieurPhotos: Photo[] = [
    { src: "/images/gallery/interieur/1.JPEG", alt: "Salon spacieux et lumineux", category: tGallery('categories.interior'), aspectRatio: "landscape" },
    { src: "/images/gallery/interieur/2.JPEG", alt: "Salle à manger élégante", category: tGallery('categories.interior'), aspectRatio: "portrait" },
    { src: "/images/gallery/interieur/3.JPEG", alt: "Cuisine moderne toute équipée", category: tGallery('categories.interior'), aspectRatio: "landscape" },
    { src: "/images/gallery/interieur/4.JPEG", alt: "Salle de bain design", category: tGallery('categories.interior'), aspectRatio: "landscape" },
    { src: "/images/gallery/interieur/10.JPG", alt: "Salon TV", category: tGallery('categories.interior'), aspectRatio: "landscape" },
    { src: "/images/gallery/interieur/13.png", alt: "Dressing moderne", category: tGallery('categories.interior'), aspectRatio: "portrait" },
  ];

  const vuesPhotos: Photo[] = [
    { src: "/images/gallery/vues/Coucher de soleil.png", alt: "Coucher de soleil sur la mer", category: tGallery('categories.views'), aspectRatio: "panoramic" },
    { src: "/images/gallery/vues/Coucher de soleil 2.png", alt: "Vue sur la baie au crépuscule", category: tGallery('categories.views'), aspectRatio: "landscape" },
    { src: "/images/gallery/vues/Coucher de soleil 3.png", alt: "Panorama méditerranéen", category: tGallery('categories.views'), aspectRatio: "panoramic" },
  ];

  // Toutes les photos combinées pour la section "Tous"
  const allPhotos: Photo[] = [
    ...exterieurPhotos,
    ...suitesPhotos,
    ...interieurPhotos,
    ...vuesPhotos,
  ];

  // Liste des catégories pour la navigation
  const categories = [
    { id: null, label: tGallery('categories.all') },
    { id: tGallery('categories.exterior'), label: t('common.labels.exterior') },
    { id: tGallery('categories.suites'), label: t('common.labels.room') },
    { id: tGallery('categories.interior'), label: t('common.labels.interior') },
    { id: tGallery('categories.views'), label: tGallery('categories.views') },
  ];

  // Déterminer les photos à afficher selon la catégorie sélectionnée
  const filteredPhotos = activeCategory === null
    ? allPhotos
    : activeCategory === tGallery('categories.exterior') ? exterieurPhotos
    : activeCategory === tGallery('categories.suites') ? suitesPhotos
    : activeCategory === tGallery('categories.interior') ? interieurPhotos
    : vuesPhotos;

  // Formatage du compteur d'images (01 / 12)
  const imageCounter = `${String(currentIndex + 1).padStart(2, '0')} / ${String(filteredPhotos.length).padStart(2, '0')}`;
  
  // Calcul du pourcentage de progression pour la barre
  const progressPercentage = ((currentIndex + 1) / filteredPhotos.length) * 100;

  // Changement de catégorie
  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    setCurrentIndex(0);
    stopAutoplay();
  };

  // Navigation dans le carrousel
  const goToNext = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Retour au début quand on atteint la fin
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredPhotos.length - 1); // Aller à la fin quand on est au début
    }
  };

  // Gestion du lightbox
  const openLightbox = (index: number) => {
    if (!hasDragged) {
      setSelectedImage(index);
      setIsLightboxOpen(true);
      stopAutoplay();
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  // Défilement horizontal avec la souris/doigt
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      galleryRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Gestion de l'autoplay
  const startAutoplay = () => {
    setIsPlaying(true);
    autoplayTimerRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 5 secondes par image
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  // Nettoyage au démontage du composant
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            selectedImage !== null && setSelectedImage(
              selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1
            );
            break;
          case 'ArrowRight':
            e.preventDefault();
            selectedImage !== null && setSelectedImage(
              (selectedImage + 1) % filteredPhotos.length
            );
            break;
          case 'Escape':
            e.preventDefault();
            closeLightbox();
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedImage, filteredPhotos.length]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden p-0 m-0">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/ZZ3G80btSc8?autoplay=1&mute=1&loop=1&playlist=ZZ3G80btSc8&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
              title="Vidéo galerie"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{
                transform: 'scale(1.2)',
                transformOrigin: 'center center'
              }}
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full h-full flex flex-col justify-center items-start">
            <div className="pl-[15%] md:pl-[10%] w-full max-w-[80%] md:max-w-[60%]">
              <div className="mb-16">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="text-white text-6xl md:text-7xl font-light tracking-wider"
                >
                  L'expérience<br />
                  <span className="font-extralight tracking-wide">ciel et mer</span>
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-[1px] bg-gradient-to-r from-[#BC9A6B] to-[#BC9A6B]/30 mt-8"
                ></motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-6 max-w-xl"
              >
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                  Une collection d'images exclusives de notre propriété d'exception surplombant la Méditerranée.
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2 font-light">Découvrir plus</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-1"
            >
              <motion.div className="w-1 h-1 bg-white/80 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Title Section */}
      <section className="py-16 sm:py-24 md:py-32 pb-8 sm:pb-12 bg-[#F8F7F5]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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

      {/* Gallery Navigation (Desktop) */}
      <section className="hidden md:block pb-8 bg-[#F8F7F5]">
        <div className="container max-w-5xl">
          <nav className="flex justify-center space-x-10">
            {categories.map((category) => (
              <button
                key={category.id ?? "all"}
                onClick={() => handleCategoryChange(category.id)}
                className="relative text-[#1A1A1A] uppercase tracking-[0.15em] text-sm font-light transition-all duration-300 pb-2"
              >
                {category.label}
                {activeCategory === category.id && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#BC9A6B]" 
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Mobile Category Menu (Dropdown style for mobile) */}
      <section className="md:hidden pb-8 bg-[#F8F7F5]">
        <div className="container">
          <div className="relative">
            <button 
              className="flex items-center justify-between w-full px-4 py-3 text-sm text-left border border-gray-200 rounded-md focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="uppercase tracking-[0.15em] font-light">
                {activeCategory === null ? tGallery('categories.all') : 
                 activeCategory === tGallery('categories.exterior') ? tGallery('common.labels.exterior') :
                 activeCategory === tGallery('categories.suites') ? tGallery('common.labels.room') :
                 activeCategory === tGallery('categories.interior') ? tGallery('common.labels.interior') :
                 tGallery('categories.views')}
              </span>
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="rotate-90 w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isMobileMenuOpen && (
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
                      className={`block w-full px-4 py-3 text-sm text-left uppercase tracking-[0.1em] font-light ${activeCategory === category.id ? 'bg-[#F8F7F5] text-[#BC9A6B]' : ''}`}
                      onClick={() => {
                        handleCategoryChange(category.id);
                        setIsMobileMenuOpen(false);
                      }}
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

      {/* Main Gallery Section */}
      <section className="pb-24 bg-[#F8F7F5] overflow-hidden">
        <div className="container-fluid px-6 lg:px-12 relative">
          {/* Horizontal Gallery Container */}
          <div className="relative">
            {/* Left Navigation Arrow */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-sm opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => scrollGallery('left')}
            >
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            
            {/* Right Navigation Arrow */}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-sm opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => scrollGallery('right')}
            >
              <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            
            {/* Gallery Scrollable Container */}
            <div 
              ref={galleryRef}
              className="flex overflow-x-auto hide-scrollbar gap-6 pb-6 pt-3"
              style={{ scrollBehavior: 'smooth' }}
              onMouseDown={() => setHasDragged(false)}
              onMouseMove={() => setHasDragged(true)}
            >
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={`${photo.src}-${index}`}
                  className={cn(
                    "flex-shrink-0 relative group cursor-pointer transition-all duration-500 rounded overflow-hidden shadow-sm hover:shadow-md",
                    photo.aspectRatio === "portrait" ? "w-[500px] h-[70vh]" : 
                    photo.aspectRatio === "landscape" ? "w-[600px] h-[70vh]" : 
                    "w-[800px] h-[70vh]"
                  )}
                  onClick={() => openLightbox(index)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 z-10" />
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-[1200ms] filter saturate-[0.9] group-hover:saturate-[1] group-hover:brightness-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <p className="text-white text-sm font-light tracking-wider backdrop-blur-[2px] bg-black/30 inline-block px-3 py-1 rounded">{photo.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gallery Bottom Controls */}
            <div className="flex justify-between items-center mt-6">
              {/* Image Counter */}
              <div className="text-[#9A9A98] font-mono text-sm tracking-wider">
                {imageCounter}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-[1px] bg-[#E0DED8] mt-6 mb-12">
              <motion.div 
                className="h-full bg-[#BC9A6B]"
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-light mb-10 text-[#1A1A1A] leading-tight">
                Découvrez l'expérience unique de notre propriété
              </h2>
              
              <Button
                asChild
                size="lg"
                className="relative bg-[#b7a66b] text-white border border-[#b7a66b] hover:bg-white hover:text-[#b7a66b] hover:border-[#b7a66b] rounded-none px-10 py-6 transition-all duration-300"
              >
                <Link href="/contact">
                  <span className="uppercase text-sm tracking-[0.2em] font-light">Réserver votre séjour</span>
                  <ArrowRight className="ml-2 w-4 h-4 inline-block" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 left-6 text-white hover:text-white/80 transition-colors z-50 bg-black/50 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Left Navigation */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 rounded-full cursor-pointer z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1);
              }}
            >
              <ChevronLeft className="h-6 sm:h-8 w-6 sm:w-8" />
            </button>

            {/* Right Navigation */}
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 rounded-full cursor-pointer z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((selectedImage + 1) % filteredPhotos.length);
              }}
            >
              <ChevronRight className="h-6 sm:h-8 w-6 sm:w-8" />
            </button>
            
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-7xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="relative w-full max-h-[85vh] flex items-center justify-center">
                <Image
                  src={filteredPhotos[selectedImage].src}
                  alt={filteredPhotos[selectedImage].alt}
                  width={1920}
                  height={1080}
                  className="object-contain max-h-[85vh] max-w-full"
                  priority
                />
              </div>
              
              {/* Image Caption */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 text-center text-white p-6"
              >
                <div className="w-10 h-[1px] bg-[#BC9A6B] mx-auto mb-4"></div>
                <p className="text-lg md:text-xl font-light tracking-wider mb-1 backdrop-blur-md bg-black/40 inline-block px-4 py-2 rounded">
                  {filteredPhotos[selectedImage].alt}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}