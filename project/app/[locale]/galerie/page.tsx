"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import SnakeRectangleAnimation from "../../../src/components/SnakeRectangleAnimation";

export default function GaleriePage() {
  const { tGallery } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Fonction pour ajuster la taille de la vidéo
  const adjustVideoSize = () => {
    if (!videoContainerRef.current || !videoRef.current) return;

    const container = videoContainerRef.current;
    const video = videoRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const containerRatio = containerWidth / containerHeight;
    const videoRatio = 16 / 9;

    if (containerRatio > videoRatio) {
      const newHeight = containerWidth / videoRatio;
      video.style.width = '100%';
      video.style.height = `${newHeight}px`;
      video.style.left = '0';
      video.style.top = `${(containerHeight - newHeight) / 2}px`;
    } else {
      const newWidth = containerHeight * videoRatio;
      video.style.width = `${newWidth}px`;
      video.style.height = '100%';
      video.style.left = `${(containerWidth - newWidth) / 2}px`;
      video.style.top = '0';
    }
  };

  useEffect(() => {
    adjustVideoSize();
    window.addEventListener('resize', adjustVideoSize);
    return () => window.removeEventListener('resize', adjustVideoSize);
  }, []);

  const exterieurPhotos = [
    { src: "/images/gallery/exterieur/1.JPG", alt: "Façade de la villa côté mer", category: tGallery('categories.exterior'), size: "regular" },
    { src: "/images/gallery/exterieur/2.JPEG", alt: "Jardin méditerranéen et terrasse", category: tGallery('categories.exterior'), size: "large" },
    { src: "/images/gallery/exterieur/3.JPEG", alt: "Piscine à débordement vue mer", category: tGallery('categories.exterior'), size: "regular" },
    { src: "/images/gallery/exterieur/4.JPEG", alt: "Entrée principale de la villa", category: tGallery('categories.exterior'), size: "regular" },
    { src: "/images/gallery/exterieur/5.JPEG", alt: "Vue panoramique sur la baie", category: tGallery('categories.exterior'), size: "large" },
    { src: "/images/gallery/exterieur/6.JPEG", alt: "Terrasse ombragée avec salon d'été", category: tGallery('categories.exterior'), size: "regular" },
  ];

  const suitesPhotos = [
    { src: "/images/gallery/chambres/1.JPG", alt: "Suite parentale lumineuse", category: tGallery('categories.suites'), size: "large" },
    { src: "/images/gallery/chambres/2.JPEG", alt: "Suite double avec vue jardin", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/3.JPEG", alt: "Suite cosy avec balcon", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/4.jpg", alt: "Suite contemporaine", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/5.jpg", alt: "Suite familiale spacieuse", category: tGallery('categories.suites'), size: "large" },
    { src: "/images/gallery/chambres/6.JPEG", alt: "Suite avec salle de bain privative", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/7.jpg", alt: "Suite élégante avec dressing", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/8.JPEG", alt: "Suite avec terrasse privée", category: tGallery('categories.suites'), size: "large" },
    { src: "/images/gallery/chambres/9.png", alt: "Suite design et colorée", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/10.JPG", alt: "Suite avec vue mer", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/11.JPEG", alt: "Suite raffinée", category: tGallery('categories.suites'), size: "large" },
    { src: "/images/gallery/chambres/12.JPEG", alt: "Suite avec coin bureau", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/13.JPEG", alt: "Suite lumineuse et calme", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/14.JPEG", alt: "Suite avec accès direct au jardin", category: tGallery('categories.suites'), size: "large" },
    { src: "/images/gallery/chambres/15.jpg", alt: "Suite avec grande armoire", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/16.JPEG", alt: "Suite avec salle d'eau moderne", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/17.JPEG", alt: "Suite avec lit king size", category: tGallery('categories.suites'), size: "large" },
    { src: "/images/gallery/chambres/18.JPEG", alt: "Suite avec vue sur la pinède", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/19.JPEG", alt: "Suite avec décoration épurée", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/20.JPEG", alt: "Suite avec salle de bain attenante", category: tGallery('categories.suites'), size: "large" },
    { src: "/images/gallery/chambres/21.JPEG", alt: "Suite avec terrasse fleurie", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/22.jpg", alt: "Suite avec vue sur la mer", category: tGallery('categories.suites'), size: "regular" },
    { src: "/images/gallery/chambres/23.JPEG", alt: "Suite avec ambiance zen", category: tGallery('categories.suites'), size: "large" },
  ];

  const interieurPhotos = [
    { src: "/images/gallery/interieur/1.JPEG", alt: "Salon spacieux et lumineux", category: tGallery('categories.interior'), size: "large" },
    { src: "/images/gallery/interieur/2.JPEG", alt: "Salle à manger élégante", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/3.JPEG", alt: "Cuisine moderne toute équipée", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/4.JPEG", alt: "Salle de bain design", category: tGallery('categories.interior'), size: "large" },
    { src: "/images/gallery/interieur/5.JPEG", alt: "Coin lecture cosy", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/6.JPEG", alt: "Entrée chaleureuse", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/7.JPEG", alt: "Salle de jeux pour enfants", category: tGallery('categories.interior'), size: "large" },
    { src: "/images/gallery/interieur/8.JPEG", alt: "Salle de bain supplémentaire", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/9.JPEG", alt: "Chambre d'amis", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/10.JPG", alt: "Salon TV", category: tGallery('categories.interior'), size: "large" },
    { src: "/images/gallery/interieur/11.JPEG", alt: "Salle de sport", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/12.JPEG", alt: "Bureau avec vue", category: tGallery('categories.interior'), size: "regular" },
    { src: "/images/gallery/interieur/13.png", alt: "Dressing moderne", category: tGallery('categories.interior'), size: "large" },
  ];

  const vuesPhotos = [
    { src: "/images/gallery/vues/Coucher de soleil.png", alt: "Coucher de soleil sur la mer", category: tGallery('categories.views'), size: "large" },
    { src: "/images/gallery/vues/Coucher de soleil 2.png", alt: "Vue sur la baie au crépuscule", category: tGallery('categories.views'), size: "regular" },
    { src: "/images/gallery/vues/Coucher de soleil 3.png", alt: "Panorama méditerranéen", category: tGallery('categories.views'), size: "large" },
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPhotoColumns = () => {
    const columnPhotos: any[][] = Array.from({ length: columns }, () => []);
    let currentColumn = 0;

    filteredPhotos.forEach((photo, index) => {
      columnPhotos[currentColumn].push(photo);
      currentColumn = (currentColumn + 1) % columns;
    });

    return columnPhotos;
  };

  const photoColumns = getPhotoColumns();

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredPhotos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedImage((selectedImage + 1) % filteredPhotos.length);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredPhotos]);

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden p-0 m-0">
        <div 
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/ZZ3G80btSc8?autoplay=1&mute=1&loop=1&playlist=ZZ3G80btSc8&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
            title="Vidéo galerie villa"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute object-cover"
            style={{
              filter: 'brightness(100%)',
              border: 'none'
            }}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <div className="w-full h-full flex items-center justify-center">
            <SnakeRectangleAnimation
              textKey="gallery"
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
                  ? "bg-[#b7a66b] text-white"
                  : "bg-muted hover:bg-[#b7a66b] hover:text-white"
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
                    ? "bg-[#b7a66b] text-white"
                    : "bg-muted hover:bg-[#b7a66b] hover:text-white"
                }`}
              >
                {category === tGallery('categories.suites') ? 'Suites' : category}
              </button>
            ))}
          </motion.div>

          <div className="flex gap-4" ref={containerRef}>
            {photoColumns.map((column, colIndex) => (
              <div className="flex-1 flex flex-col gap-4" key={colIndex}>
                {column.map((photo, photoIndex) => (
                  <motion.div
                    key={`${colIndex}-${photoIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (colIndex * column.length + photoIndex) * 0.05 }}
                    className={`group relative cursor-pointer overflow-hidden rounded-lg bg-muted ${
                      photo.size === "large" ? "aspect-[3/4]" : "aspect-[3/3.5]"
                    }`}
                    onClick={() => {
                      const globalIndex = filteredPhotos.findIndex(
                        (p) => p.src === photo.src && p.alt === photo.alt
                      );
                      setSelectedImage(globalIndex);
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[#b7a66b] rounded-full hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Découvrir les alentours
            </Link>
          </motion.div>
        </div>
      </section>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="h-8 w-8" />
          </button>
          
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 rounded-full bg-black/30 cursor-pointer z-50"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </div>

          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 rounded-full bg-black/30 cursor-pointer z-50"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </div>
          
          <div 
            className="relative w-full max-w-7xl aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredPhotos[selectedImage].src}
              alt={filteredPhotos[selectedImage].alt}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-lg font-medium">{filteredPhotos[selectedImage].alt}</p>
              <p className="text-sm opacity-75">{filteredPhotos[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}