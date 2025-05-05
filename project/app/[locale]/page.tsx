"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
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
            Un sanctuaire entre<br />ciel, mer et nature
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8">L'art de vivre, version Riviera</h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-12"></div>
            <div className="space-y-8 text-lg md:text-xl text-neutral-800 leading-relaxed">
              <p className="italic font-serif">"Il y a des lieux où souffle l'esprit."</p>
              <p>Ici, le murmure des pins se mêle au clapotis de la piscine. La lumière dorée caresse chaque pierre, chaque feuille. L'horizon s'ouvre, infini, sur la Méditerranée.</p>
              <p>Chaque instant est une invitation au voyage intérieur, à la contemplation, à la douceur de vivre.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bloc Villa - Introduction */}
      <section className="py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5"></div>
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
                  { icon: "🌊", text: "Vue panoramique mer" },
                  { icon: "🏊", text: "Piscine à débordement" },
                  { icon: "🌴", text: "Jardin méditerranéen" },
                  { icon: "✨", text: "Services VIP" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 group"
                  >
                    <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
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
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            {/* Image immersive à droite */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/villa/IMG_2348.JPEG"
                  alt="Galerie Les Étoiles du Rocher"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Texte à gauche */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6">Galerie</h2>
              <p className="text-lg md:text-xl text-neutral-800 leading-relaxed mb-8 max-w-xl">
                Explorez les plus beaux espaces de la propriété : suites baignées de lumière, piscine à débordement, rooftop panoramique… Laissez-vous inspirer par l'atmosphère unique de la villa.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md"
              >
                <Link href="/galerie">
                  Voir la galerie
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Découverte */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Image immersive à gauche */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/villa/IMG_2359.jpg"
                  alt="Découverte Les Étoiles du Rocher"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Texte à droite */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6">Découverte</h2>
              <p className="text-lg md:text-xl text-neutral-800 leading-relaxed mb-8 max-w-xl">
                Plongez dans l'art de vivre de la villa : services sur-mesure, histoire du lieu, atmosphère méditerranéenne… Découvrez ce qui fait de ce domaine un écrin unique sur la Riviera.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md"
              >
                <Link href="/decouvrir">
                  Découvrir l'expérience
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Contact */}
      <section className="py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            {/* (Optionnel) Image à droite */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/villa/IMG_2286.JPEG"
                  alt="Contact Les Étoiles du Rocher"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Texte à gauche */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6">Contact & Réservation</h2>
              <p className="text-lg md:text-xl text-neutral-800 leading-relaxed mb-8 max-w-xl">
                Un séjour sur-mesure, une question ? Notre équipe vous répond avec discrétion et réactivité. Contactez-nous pour vivre l'exception.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md"
              >
                <Link href="/contact">
                  Contactez-nous
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}