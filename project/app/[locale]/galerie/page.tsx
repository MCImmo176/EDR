"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import { FullscreenVideo } from "@/components/FullscreenVideo";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import DynamicBottomGallery from "@/components/DynamicBottomGallery";

export default function GaleriePage() {
  const { tGallery } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

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

  // Déterminer si on doit séparer les 3 dernières photos
  const shouldSeparateLastThree = 
    (activeCategory === tGallery('categories.views') || activeCategory === null) &&
    columns === 3;
  
  // Extraire les 3 dernières photos avant la distribution
  const lastThreePhotos = shouldSeparateLastThree
    ? (activeCategory === null ? vuesPhotos : filteredPhotos.slice(filteredPhotos.length - 3))
    : [];
  
  // Photos à distribuer dans la grille Masonry (sans les 3 dernières quand nécessaire)
  const masonryPhotos = shouldSeparateLastThree
    ? (activeCategory === null ? [...exterieurPhotos, ...suitesPhotos, ...interieurPhotos] : filteredPhotos.slice(0, filteredPhotos.length - 3))
    : filteredPhotos;

  const getPhotoColumns = () => {
    const columnPhotos: any[][] = Array.from({ length: columns }, () => []);
    
    // Distribution des photos dans les colonnes (seulement masonryPhotos)
    const columnHeights = Array(columns).fill(0);
    
    masonryPhotos.forEach((photo) => {
      const minHeightColumn = columnHeights.indexOf(Math.min(...columnHeights));
      columnPhotos[minHeightColumn].push(photo);
      columnHeights[minHeightColumn] += photo.size === "large" ? 4 : 3.5;
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
      {/* Section Hero avec vidéo YouTube en vrai plein écran */}
      <section className="relative h-screen w-full overflow-hidden p-0 m-0">
        {/* Conteneur vidéo qui couvre tout l'écran */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full w-full" style={{ paddingBottom: '56.25%' }}> {/* Ratio 16:9 */}
            <iframe
              src="https://www.youtube.com/embed/ZZ3G80btSc8?autoplay=1&mute=1&loop=1&playlist=ZZ3G80btSc8&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
              title="Vidéo galerie"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{
                transform: 'scale(1.2)', // Zoom pour éliminer les bords noirs
                transformOrigin: 'center center'
              }}
            />
          </div>
        </div>

        {/* Overlay avec dégradé plus sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-[5]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-[5]"></div>
        
        {/* Contenu principal */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full h-full flex flex-col justify-center items-start">
            <div className="pl-[15%] md:pl-[10%] w-full max-w-[80%] md:max-w-[60%]">
              {/* Nouveau composant de texte luxueux */}
              <div className="mb-16">
                <h1 className="text-white text-6xl md:text-7xl font-light tracking-wide">
                  L'expérience<br />
                  ciel et mer
                </h1>
                <div className="h-1 w-20 bg-[#b7a66b] mt-6"></div>
              </div>
              
              {/* Texte secondaire avec animation de fondu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-6 max-w-xl"
              >
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                  Profitez des hauteurs de la Côte d'Azur, un havre de paix avec vue imprenable sur la Méditerranée.
                </p>
              </motion.div>
              
              {/* Bouton stylisé */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="mt-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="relative bg-[#b7a66b] text-white border-2 border-[#b7a66b] rounded-lg overflow-hidden group hover:bg-white hover:text-[#b7a66b] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#b7a66b]/20 hover:-translate-y-1 text-lg px-8 py-4"
                >
                  <Link href="/contact">
                    <span className="relative z-10 tracking-wider font-medium">Réserver maintenant</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Indicateur de défilement élégant */}
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

      <section className="py-16 sm:py-24 md:py-32 pb-12 sm:pb-16">
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

      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base ${
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
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base ${
                  activeCategory === category
                    ? "bg-[#b7a66b] text-white"
                    : "bg-muted hover:bg-[#b7a66b] hover:text-white"
                }`}
              >
                {category === tGallery('categories.suites') ? 'Suites' : category}
              </button>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4" ref={containerRef}>
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                      <p className="text-base sm:text-lg font-display">{photo.alt}</p>
                      <p className="text-xs sm:text-sm opacity-75 mt-1">{photo.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Utilisation du composant DynamicBottomGallery pour les 3 dernières photos */}
          <DynamicBottomGallery 
            lastThreePhotos={lastThreePhotos}
            shouldSeparateLastThree={shouldSeparateLastThree}
            filteredPhotos={filteredPhotos}
            setSelectedImage={setSelectedImage}
          />

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
            className="flex justify-center mt-12 sm:mt-16 mb-8"
          >
            <Link
              href="/decouvrir"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-[#b7a66b] rounded-full hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {tGallery('discoverButton')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Citation + CTA */}
      <section className="py-16 relative overflow-hidden bg-gray-50">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#b7a66b]/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[#b7a66b]/10 blur-3xl"></div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="w-20 h-20 text-[#b7a66b]/40 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/>
                </svg>
              </div>
            </motion.div>
            
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-light italic mb-8"
            >
              « L'art lave notre âme de la poussière du quotidien. »
            </motion.blockquote>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="w-10 h-0.5 bg-[#b7a66b] mr-4"></div>
              <span className="text-gray-500 uppercase tracking-widest text-sm">Pablo Picasso</span>
              <div className="w-10 h-0.5 bg-[#b7a66b] ml-4"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/discover/luxury-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-[#b7a66b]/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-[#b7a66b]" />
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-900 leading-tight"
            >
              Une expérience artistique inoubliable
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-[#b7a66b] rounded-lg hover:bg-[#b7a66b]/90 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Réservez votre séjour artistique dès maintenant →
              </Link>
            </motion.div>
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
            <X className="h-6 sm:h-8 w-6 sm:w-8" />
          </button>
          
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 rounded-full bg-black/30 cursor-pointer z-50"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-6 sm:h-8 w-6 sm:w-8" />
          </div>

          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 rounded-full bg-black/30 cursor-pointer z-50"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-6 sm:h-8 w-6 sm:w-8" />
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
              <p className="text-base sm:text-lg font-medium">{filteredPhotos[selectedImage].alt}</p>
              <p className="text-xs sm:text-sm opacity-75">{filteredPhotos[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}