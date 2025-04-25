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
import { images } from "@/config/images";

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

  const excellenceImages = {
    interior: [
      {
        src: "/images/excellence/interieur/reception.jpeg",
        alt: t('home.excellence.interior.reception'),
        description: t('home.excellence.interior.receptionDesc')
      },
      {
        src: "/images/excellence/interieur/exterieur.jpeg",
        alt: t('home.excellence.interior.exterior'),
        description: t('home.excellence.interior.exteriorDesc')
      },
      {
        src: "/images/excellence/interieur/nuit.png",
        alt: t('home.excellence.interior.night'),
        description: t('home.excellence.interior.nightDesc')
      }
    ]
  };

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <ReactPlayer
            url={images.home.hero.video}
            playing
            loop
            muted
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            config={{
              vimeo: {
                playerOptions: {
                  background: true,
                  quality: "1080p",
                }
              }
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
            className="text-center px-6"
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
                <Link href="/villa">
                  <span className="relative z-10">{t('home.discover')}</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="mouse-scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-32 md:py-40">
        <div className="container max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="overflow-hidden mb-8">
                <motion.h2 
                  className="text-5xl md:text-6xl lg:text-7xl font-display"
                  variants={textReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {t('home.excellence')}
                </motion.h2>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-24">
                {t('home.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {excellenceImages.interior.map((image, index) => (
              <motion.div 
                  key={index}
                className="aspect-[4/5] relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Image 
                    src={image.src}
                    alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-lg font-medium">{image.alt}</p>
                    <p className="text-sm opacity-75">{image.description}</p>
                  </div>
              </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 md:py-40">
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
                className="text-5xl md:text-6xl lg:text-7xl font-display"
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