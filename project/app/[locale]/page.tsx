"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Divider } from "@/components/ui/divider";
import { useEffect } from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const { t } = useLanguage();

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
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=wl-HzkOtHC0"
              playing
              loop
              muted
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
              }}
              config={{
                youtube: {
                  playerVars: {
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    playsinline: 1,
                  }
                }
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center px-6 hero-content transition-all duration-800 ease-in-out"
          >
            <div className="overflow-hidden mb-8">
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl font-display"
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
                className="text-2xl md:text-3xl font-light tracking-widest uppercase relative z-10 py-4 px-8"
                variants={textReveal}
              >
                {t('home.subtitle')}
              </motion.p>
            </div>
            
            <motion.div 
              variants={fadeIn}
              className="overflow-hidden"
            >
              <Button 
                asChild 
                size="lg"
                className="relative bg-transparent border-2 border-white text-white overflow-hidden group hover:text-black transition-all duration-500 text-lg px-12 py-6 rounded-none"
              >
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section slogan compact à déplacer */}
      <section className="py-1 md:py-2 bg-white">
        <div className="container max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-black mb-1" style={{ fontFamily: 'inherit' }}>
                VIVEZ L'EXCEPTION.
              </h2>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-light text-black leading-relaxed mb-1">
                Profitez de Monaco, sans ses contraintes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8">
        <div className="container max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-stretch min-h-[600px] md:min-h-[700px]">
              <div className="md:col-span-1 h-[350px] md:h-auto relative">
                <Image 
                  src="/images/excellence/interieur/reception.jpeg"
                  alt={t('home.excellence.interior.reception')}
                  fill
                  className="object-cover w-full h-full rounded-none"
                  priority
                />
              </div>
              <div className="md:col-span-1 flex items-center">
                <div>
                  <p className="text-xl leading-relaxed mb-8 text-black text-justify" style={{ fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                    <span className="font-bold italic" style={{ fontSize: '1.3em' }}>« Il y a des lieux où souffle l'esprit. »</span><br />
                    <span className="block font-medium text-right mb-4">— Maurice Barrès</span>
                    <span className="font-light">
                      Certains lieux possèdent une âme rare, une énergie silencieuse qui inspire et apaise. Notre domaine en est l'illustration parfaite : notre domaine vous accueille à seulement <span className="font-bold">5 minutes de l'effervescence monégasque</span>. Ici, la <span className="font-bold">tranquillité absolue</span> règne, tout en offrant un accès immédiat aux plus belles plages, aux boutiques de prestige et aux événements de la Côte d'Azur.<br /><br />
                      Profitez de <span className="font-bold">350 m²</span> répartis sur deux étages, entièrement dédiés à votre confort. <span className="font-bold">Cinq suites privatives</span> avec une literie d'exception, toutes pensées pour conjuguer raffinement et intimité, vous promettent des nuits paisibles et un bien-être total.<br />
                      Une <span className="font-bold">dépendance discrète</span>, blottie dans la végétation méditerranéenne, offre un espace supplémentaire pour accueillir famille ou amis en toute indépendance.<br /><br />
                      Laissez-vous séduire par notre <span className="font-bold">piscine surplombant la mer</span>, un véritable joyau où le bleu du ciel se confond avec celui de l'horizon.<br />
                      Le <span className="font-bold">rooftop</span>, spacieux et aménagé, vous invite à contempler le panorama exceptionnel sur Monaco et la Méditerranée. C'est également l'endroit parfait pour organiser des <span className="font-bold">dîners inoubliables</span> ou des <span className="font-bold">événements privés sous les étoiles</span>.<br /><br />
                      <span className="italic">Entre intimité, élégance et art de vivre, notre domaine est l'adresse idéale pour une escapade unique sur la Riviera.</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ajout de la photo salon.png en full screen avant la section réservation */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image 
          src="/images/excellence/interieur/salon.png"
          alt="Salon luxueux"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-full text-center text-white font-extrabold text-4xl md:text-6xl lg:text-7xl drop-shadow-lg uppercase tracking-tight" style={{letterSpacing: '-0.04em'}}>
            Les Étoiles du Rocher
          </span>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted">
        <div className="container max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <div className="overflow-hidden mb-12">
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-8"
                variants={textReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {t('home.booking.title')}
              </motion.h2>
            </div>
            <Button 
              asChild 
              size="lg"
              className="relative bg-black text-white overflow-hidden group hover:text-black transition-all duration-500 text-lg px-12 py-6 rounded-none"
            >
              <Link href="/contact">
                <span className="relative z-10">{t('common.contactUs')}</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}