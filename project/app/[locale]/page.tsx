"use client";

import { motion } from "framer-motion";
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
  const playerContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    if (playerContainerRef.current) {
      const container = playerContainerRef.current;
      const containerRatio = container.offsetWidth / container.offsetHeight;
      const videoRatio = 16 / 9;
      
      if (containerRatio > videoRatio) {
        const newHeight = container.offsetWidth / videoRatio;
        container.style.height = `${newHeight}px`;
        container.style.width = '100%';
      } else {
        const newWidth = container.offsetHeight * videoRatio;
        container.style.width = `${newWidth}px`;
        container.style.height = '100%';
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const textReveal = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95]
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
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/pSl-FvfrLzs?autoplay=1&mute=1&loop=1&playlist=pSl-FvfrLzs&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
          title="Vidéo accueil villa"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      <div className="relative z-10 h-full flex items-center justify-center text-white px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center px-6 hero-content transition-all duration-800 ease-in-out"
        >
          <div className="overflow-hidden mb-8">
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-display"
              variants={textReveal}
            >
              {t('home.title')}
            </motion.h1>
          </div>
          
          <div className="relative overflow-hidden mb-12">
            <motion.div 
              className="absolute left-0 top-0 w-full h-full bg-white/10"
              variants={rectangleReveal}
              style={{ originX: 0 }}
            />
            <motion.p 
              className="text-xl md:text-2xl font-light tracking-widest uppercase relative z-10 py-4 px-8"
              variants={textReveal}
            >
              {t('home.subtitle')}
            </motion.p>
          </div>
          
          <motion.div variants={fadeIn} className="overflow-hidden">
            <Button 
              asChild 
              size="lg"
              className="relative bg-transparent border-2 border-white text-white overflow-hidden group hover:text-black transition-all duration-500 text-lg px-12 py-6 rounded-none"
            >
              <Link href="/reservations">
                <span className="relative z-10">Réserver</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <section className="py-0 md:py-0 bg-white">
        <div className="container max-w-6xl mx-auto px-6 mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-0"
          >
            <div className="flex flex-col md:flex-row gap-10 items-stretch">
              <div className="w-full md:w-1/2 h-96 md:h-[500px] relative">
                <Image
                  src="/images/excellence/interieur/4.jpg"
                  alt="Salon d'exception de la villa"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <div className="prose prose-lg max-h-[500px] overflow-y-auto pr-4">
                  <blockquote className="text-xl italic font-serif mb-6">
                    « Il y a des lieux où souffle l'esprit. »
                    <footer className="mt-2 text-right font-sans not-italic">— Maurice Barrès</footer>
                  </blockquote>
                  <p className="mb-4">
                    Certains lieux possèdent une âme rare, une énergie silencieuse qui inspire et apaise. 
                    Notre domaine en est l'illustration parfaite : situé à seulement <strong>5 minutes de l'effervescence monégasque</strong>, 
                    il offre une <strong>tranquillité absolue</strong> tout en permettant un accès immédiat aux plus belles plages, 
                    boutiques de prestige et événements de la Côte d'Azur.
                  </p>
                  <p className="mb-4">
                    Profitez de <strong>350 m²</strong> répartis sur deux étages, avec <strong>cinq suites privatives</strong> 
                    à la literie d'exception. Une <strong>dépendance discrète</strong>, nichée dans la végétation méditerranéenne, 
                    offre un espace supplémentaire pour vos invités.
                  </p>
                  <p className="mb-4">
                    Découvrez notre <strong>piscine surplombant la mer</strong> et notre <strong>rooftop</strong>  offrant un panorama exceptionnel sur Monaco et la Méditerranée.
                  </p>
                  <p className="italic">
                    Entre intimité, élégance et art de vivre, notre domaine est l'adresse idéale 
                    pour une escapade unique sur la Riviera.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-black mb-2" style={{ fontFamily: 'inherit' }}>
                VIVEZ L'EXCEPTION
              </h2>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-light text-black leading-relaxed">
                Profitez de Monaco, sans ses contraintes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Image Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gray-100">
          <Image
            src="/images/excellence/interieur/salon.png"
            alt="Salon luxueux"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-white text-center px-8 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Les Étoiles du Rocher
          </motion.h2>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display mb-10">
              {t('home.booking.title')}
            </h2>
            <Button
              asChild
              size="xl"
              className="bg-black text-white hover:bg-gray-800 transition-colors px-12 py-6 rounded-none"
            >
              <Link href="/contact">
                {t('common.contactUs')}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}