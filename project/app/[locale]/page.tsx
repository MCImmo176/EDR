"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Sun, Mountain, Landmark, ShoppingBag, Map, Leaf, Flag, School as Pool, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Home() {
  const t = useTranslations('home');
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
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-light text-center mb-6 sm:mb-8 leading-tight tracking-wide luxury-text-shadow">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl font-light text-center max-w-3xl mb-8 sm:mb-12 leading-relaxed tracking-wide luxury-text-shadow">
            {t('hero.subtitle')}
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
                {t('cta.bookStay')}
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 rounded-full px-8 py-6 text-lg transition-all duration-500"
            >
              <Link href="/galerie">
                {t('cta.discoverVilla')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Section Art de vivre - modifiée avec citation inspirante */}
      <section className="py-32 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-light tracking-wide">
                {t('cta.mediterranean')}
              </h1>
              <div className="h-1 w-20 bg-[#b7a66b] mx-auto mt-6"></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 max-w-3xl mx-auto relative py-16"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[80px] text-[#b7a66b]/20 font-serif">"</div>
              <p className="text-2xl md:text-3xl font-light text-neutral-700 italic max-w-3xl mx-auto leading-relaxed">
                {t('quote')}
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                viewport={{ once: true }}
                className="h-px w-16 bg-[#b7a66b]/50 mx-auto my-8 origin-center"
              />
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-sm uppercase tracking-widest text-neutral-400"
              >
                LES ÉTOILES DU ROCHER
              </motion.p>
            </motion.div>
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
                src="/images/villa/alinterieur.jpg"
                alt="La Villa Les Étoiles du Rocher"
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                priority
              />
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
                  {t('villa.title')}
                </h2>
                <div className="h-px w-20 bg-[#b7a66b]"></div>
              </div>
              
              <p className="text-lg md:text-xl text-neutral-800 leading-relaxed">
                {t('villa.description')}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {[ 
                  { icon: <Sun className="w-7 h-7 text-[#b7a66b]" />, text: t('features.panoramicView') },
                  { icon: <Pool className="w-7 h-7 text-[#b7a66b]" />, text: t('features.infinityPool') },
                  { icon: <Leaf className="w-7 h-7 text-[#b7a66b]" />, text: t('features.garden') },
                  { icon: <ShoppingBag className="w-7 h-7 text-[#b7a66b]" />, text: t('features.services') }
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
                    {t('discoverButton')}
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
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">{t('gallery.title')}</h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed max-w-3xl mx-auto">
              {t('gallery.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                src: "/images/gallery/chambres/8.jpeg",
                alt: t('gallery.mainSuite.title'),
                caption: t('gallery.mainSuite.title'),
                category: "Chambres",
                description: t('gallery.mainSuite.description')
              },
              {
                src: "/images/gallery/interieur/3.JPEG",
                alt: t('gallery.livingRoom.title'),
                caption: t('gallery.livingRoom.title'),
                category: "Intérieur",
                description: t('gallery.livingRoom.description')
              },
              {
                src: "/images/gallery/exterieur/2.JPEG",
                alt: t('gallery.terrace.title'),
                caption: t('gallery.terrace.title'),
                category: "Extérieur",
                description: t('gallery.terrace.description')
              }
            ].map((image, index) => (
              <div key={index} className="group relative overflow-hidden h-[450px] md:h-[500px] flex flex-col">
                <div className="relative flex-grow overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                  <div className="h-px w-12 bg-[#b7a66b] mb-4 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2 block">
                    {image.category}
                  </span>
                  <h3 className="text-xl font-light tracking-wide mb-3">{image.caption}</h3>
                  <p className="text-white/80 text-sm font-light transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link 
              href="/galerie" 
              className="inline-flex items-center justify-center bg-transparent border border-[#b7a66b] text-sm text-neutral-700 px-8 py-4 font-light tracking-wider hover:bg-[#b7a66b]/10 transition-all duration-300 max-w-max"
            >
              <span>{t('gallery.seeAll')}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
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
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">{t('surroundings.title')}</h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed max-w-3xl mx-auto">
              {t('surroundings.description')}
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
              <div className="relative h-72 w-full">
                <Image src="/images/discover/F1Monaco.jpg" alt={t('surroundings.monaco.title')} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow">
                  <Landmark className="w-7 h-7 text-[#b7a66b]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-display font-bold text-black mb-2">{t('surroundings.monaco.title')}</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">{t('surroundings.monaco.description')}</p>
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
              <div className="relative h-72 w-full">
                <Image src="/images/discover/plageroquebrune.jpg" alt={t('surroundings.italy.title')} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow">
                  <Flag className="w-7 h-7 text-[#b7a66b]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-display font-bold text-black mb-2">{t('surroundings.italy.title')}</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">{t('surroundings.italy.description')}</p>
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
              <div className="relative h-72 w-full">
                <Image src="/images/discover/sentierdouaniers.jpg" alt={t('surroundings.trails.title')} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow">
                  <Map className="w-7 h-7 text-[#b7a66b]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-display font-bold text-black mb-2">{t('surroundings.trails.title')}</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">{t('surroundings.trails.description')}</p>
                <Button asChild size="sm" className="bg-[#b7a66b] text-white hover:bg-[#a08c4a] rounded-full mt-auto">
                  <Link href="/decouvrir/azur" className="flex items-center gap-2">Nos coins secrets <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-neutral-700 mb-4">{t('surroundings.guide')}</p>
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
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">{t('contact.title')}</h2>
            <div className="h-px w-20 bg-[#b7a66b] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed max-w-3xl mx-auto">
              {t('contact.description')}
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
                  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
                    <Phone className="w-7 h-7 text-[#b7a66b]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Téléphone</h3>
                    <p className="text-neutral-600">{t('contact.phone')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
                    <Mail className="w-7 h-7 text-[#b7a66b]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Email</h3>
                    <p className="text-neutral-600">{t('contact.email')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-[#b7a66b]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Adresse</h3>
                    <p className="text-neutral-600">{t('contact.address')}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500 px-10 py-5 rounded-full font-semibold text-lg shadow-md group w-full"
                >
                  <Link href="/contact" scroll className="flex items-center justify-center gap-2">
                    Planifier une visite privée
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#b7a66b]">10+</div>
                  <div className="text-sm text-neutral-600">{t('contact.stats.experience')}</div>
                </div>
                <div className="h-12 w-px bg-neutral-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#b7a66b]">100%</div>
                  <div className="text-sm text-neutral-600">{t('contact.stats.satisfaction')}</div>
                </div>
                <div className="h-12 w-px bg-neutral-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#b7a66b]">24/7</div>
                  <div className="text-sm text-neutral-600">{t('contact.stats.support')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}