"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Sun, Mountain, Landmark, ShoppingBag, Map, Leaf, Flag, School as Pool } from 'lucide-react';
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Home() {
  const { t } = useLanguage();
  const [hasWindow, setHasWindow] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    if (videoRef.current) {
      const videoContainer = videoRef.current;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      const videoRatio = 16 / 9;
      
      if (windowRatio < videoRatio) {
        const newWidth = windowHeight * videoRatio;
        videoContainer.style.width = `${newWidth}px`;
        videoContainer.style.height = '100%';
        videoContainer.style.left = `${(windowWidth - newWidth) / 2}px`;
        videoContainer.style.top = '0';
      } else {
        const newHeight = windowWidth / videoRatio;
        videoContainer.style.width = '100%';
        videoContainer.style.height = `${newHeight}px`;
        videoContainer.style.left = '0';
        videoContainer.style.top = `${(windowHeight - newHeight) / 2}px`;
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const textReveal = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const rectangleReveal = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        delay: 1,
        duration: 0.8
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.classList.add('translate-y-[-100%]', 'opacity-0');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Section Hero améliorée */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0" 
          style={{ zIndex: 0, opacity, scale }}
        >
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/pSl-FvfrLzs?autoplay=1&mute=1&loop=1&playlist=pSl-FvfrLzs&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
            title="Vidéo accueil villa"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute"
            style={{ 
              width: '100%', 
              height: '100%',
              position: 'absolute',
              objectFit: 'cover',
              transform: 'scale(1.2)',
              transformOrigin: 'center center'
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-center mb-8 leading-tight tracking-tight luxury-text-shadow">
            Les étoiles du rocher
          </h1>
          <p className="text-xl md:text-2xl font-light text-center max-w-3xl mb-12 leading-relaxed tracking-wide luxury-text-shadow">
            Laissez-vous porter par la lumière dorée, le murmure des pins<br />et l'horizon infini de la Méditerranée.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/50 rounded-full px-8 py-6 text-lg transition-all duration-500"
            >
              <Link href="/contact">
                Réserver votre séjour
              </Link>
            </Button>
              <Button 
                asChild 
                size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 rounded-full px-8 py-6 text-lg transition-all duration-500"
              >
              <Link href="/galerie">
                Découvrir la villa
                </Link>
              </Button>
            </motion.div>
          </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="mouse-scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
        </div>
        </motion.div>
      </section>

      {/* Section Art de vivre */}
      <section className="py-32 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8 text-center">
              L'art de vivre, version{' '}
              <span className="relative inline-block align-baseline">
                <span className="z-10 relative">Riviera</span>
                <span
                  className="absolute inset-x-0 bottom-1 h-3 bg-[#D4AF37]/30 rounded-md z-0"
                  aria-hidden="true"
                ></span>
              </span>
            </h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-12"></div>
            <div className="space-y-8 text-lg md:text-xl text-neutral-800 leading-relaxed">
              <p className="italic font-serif">"Il y a des lieux où souffle l'esprit."</p>
              <p>Ici, le murmure des <span className="relative inline-block align-baseline"><span className="z-10 relative">pins</span><span className="absolute inset-x-0 bottom-1 h-3 bg-[#D4AF37]/30 rounded-md z-0" aria-hidden="true"></span></span> se mêle au clapotis de la piscine. La <span className="relative inline-block align-baseline"><span className="z-10 relative">lumière dorée</span><span className="absolute inset-x-0 bottom-1 h-3 bg-[#D4AF37]/30 rounded-md z-0" aria-hidden="true"></span></span> caresse chaque pierre, chaque feuille. L'horizon s'ouvre, infini, sur la <span className="relative inline-block align-baseline"><span className="z-10 relative">Méditerranée</span><span className="absolute inset-x-0 bottom-1 h-3 bg-[#D4AF37]/30 rounded-md z-0" aria-hidden="true"></span></span>.</p>
              <p>Chaque instant est une invitation au <span className="relative inline-block align-baseline"><span className="z-10 relative">voyage intérieur</span><span className="absolute inset-x-0 bottom-1 h-3 bg-[#D4AF37]/30 rounded-md z-0" aria-hidden="true"></span></span>, à la contemplation, à la <span className="relative inline-block align-baseline"><span className="z-10 relative">douceur de vivre</span><span className="absolute inset-x-0 bottom-1 h-3 bg-[#D4AF37]/30 rounded-md z-0" aria-hidden="true"></span></span>.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bloc Villa - Introduction */}
      <section className="py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5 pointer-events-none"></div>
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/images/villa/IMG_2409.JPEG"
                alt="La Villa Les Étoiles du Rocher"
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="luxury-badge">Exclusivité</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-black">
                  Une villa d'exception
              </h2>
                <div className="h-px w-20 bg-[#b7a66b]"></div>
            </div>
              
              <p className="text-lg md:text-xl text-neutral-800 leading-relaxed">
                Réveillez-vous avec le doux murmure des vagues et une vue imprenable sur la Méditerranée. 
                Chaque espace de la villa a été pensé pour vous offrir une expérience sensorielle unique, 
                où le luxe se mêle à l'authenticité de la Côte d'Azur.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {[ 
                  { icon: <Sun className="w-7 h-7 text-[#b7a66b]" />, text: "Vue panoramique mer" },
                  { icon: <Pool className="w-7 h-7 text-[#b7a66b]" />, text: "Piscine à débordement" },
                  { icon: <Leaf className="w-7 h-7 text-[#b7a66b]" />, text: "Jardin méditerranéen" },
                  { icon: <ShoppingBag className="w-7 h-7 text-[#b7a66b]" />, text: "Services VIP" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 group"
                  >
                    <span className="transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                    <span className="text-neutral-800 group-hover:text-[#b7a66b] transition-colors duration-300">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
            </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md"
                >
                  <Link href="/villa">
                    Découvrir la villa
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloc Galerie */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5 pointer-events-none"></div>
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">Galerie</h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed max-w-3xl mx-auto">
              Explorez les plus beaux espaces de la propriété : suites baignées de lumière, 
              piscine à débordement, rooftop panoramique… Laissez-vous inspirer par l'atmosphère unique de la villa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/images/villa/IMG_2348.JPEG",
                alt: "Vue panoramique sur la Méditerranée",
                category: "Extérieur",
                description: "Une vue imprenable sur la baie de Monaco"
              },
              {
                src: "/images/villa/IMG_2409.JPEG",
                alt: "Piscine à débordement",
                category: "Extérieur",
                description: "Piscine à débordement avec vue sur la mer"
              },
              {
                src: "/images/villa/IMG_2359.jpg",
                alt: "Salon principal",
                category: "Intérieur",
                description: "Espace de vie lumineux et élégant"
              }
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              >
          <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#b7a66b] text-sm font-medium tracking-wider uppercase mb-2 block">
                    {image.category}
                  </span>
                  <h3 className="text-white text-xl font-display mb-2">{image.alt}</h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
              </motion.div>
            ))}
        </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md group"
            >
              <Link href="/galerie" className="flex items-center gap-2">
                Voir la galerie complète
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Bloc Découverte (nouvelle version) */}
      <section className="py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5 pointer-events-none"></div>
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">Autour de la Villa</h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed max-w-3xl mx-auto">
              Découvrez les expériences exclusives et les trésors de la Côte d'Azur à quelques minutes de la villa.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Monaco & Menton */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="group bg-white/90 backdrop-blur-sm p-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image src="/images/monaco.jpg" alt="Monaco & Menton" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow">
                  <Landmark className="w-7 h-7 text-[#b7a66b]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-display font-bold text-black mb-2">Monaco & Menton</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">Luxe, shopping, musées, jardins suspendus…</p>
                <Button asChild size="sm" className="bg-[#b7a66b] text-white hover:bg-[#a08c4a] rounded-full mt-auto">
                  <Link href="/decouvrir/monaco" className="flex items-center gap-2">Explorer Monaco <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
            {/* Italie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/90 backdrop-blur-sm p-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image src="/images/italie.jpg" alt="Évasion en Italie" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow">
                  <Flag className="w-7 h-7 text-[#b7a66b]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-display font-bold text-black mb-2">Évasion en Italie</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">Marchés de Vintimille, cuisine ligure, Dolce Vita à moins de 30 min.</p>
                <Button asChild size="sm" className="bg-[#b7a66b] text-white hover:bg-[#a08c4a] rounded-full mt-auto">
                  <Link href="/decouvrir/italie" className="flex items-center gap-2">Passer la frontière <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
            {/* Côte d'Azur secrète */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-white/90 backdrop-blur-sm p-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image src="/images/azur.jpg" alt="Trésors cachés de la Côte d'Azur" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow">
                  <Map className="w-7 h-7 text-[#b7a66b]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-display font-bold text-black mb-2">Trésors cachés de la Côte d'Azur</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">Villages perchés, sentiers secrets, criques sauvages…</p>
                <Button asChild size="sm" className="bg-[#b7a66b] text-white hover:bg-[#a08c4a] rounded-full mt-auto">
                  <Link href="/decouvrir/azur" className="flex items-center gap-2">Nos coins secrets <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-neutral-700 mb-4">Nous vous conseillerons personnellement selon vos envies.</p>
            <Button asChild size="lg" className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md group">
              <Link href="#contact" scroll className="flex items-center gap-2">
                Contactez-nous pour un séjour sur-mesure
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bloc Contact */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5 pointer-events-none"></div>
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">Contact & Réservation</h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed max-w-3xl mx-auto">
              Un séjour sur-mesure, une question ? Notre équipe vous répond avec discrétion et réactivité. 
              Contactez-nous pour vivre l'exception.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/images/villa/IMG_2286.JPEG"
                alt="Contact Les Étoiles du Rocher"
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#b7a66b]/10 flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Téléphone</h3>
                    <p className="text-neutral-600">+33 6 XX XX XX XX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#b7a66b]/10 flex items-center justify-center">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Email</h3>
                    <p className="text-neutral-600">contact@lesetoilesdurocher.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#b7a66b]/10 flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Adresse</h3>
                    <p className="text-neutral-600">Roquebrune-Cap-Martin, Côte d'Azur</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md group w-full"
                >
                  <Link href="#contact" scroll className="flex items-center justify-center gap-2">
                    Planifier une visite privée
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#b7a66b]">10+</div>
                  <div className="text-sm text-neutral-600">Années d'expertise</div>
                </div>
                <div className="h-12 w-px bg-neutral-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#b7a66b]">100%</div>
                  <div className="text-sm text-neutral-600">Clients satisfaits</div>
                </div>
                <div className="h-12 w-px bg-neutral-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#b7a66b]">24/7</div>
                  <div className="text-sm text-neutral-600">Support dédié</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}