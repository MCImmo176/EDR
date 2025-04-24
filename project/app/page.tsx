"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Divider } from "@/components/ui/divider";

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

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <ReactPlayer
            url="https://player.vimeo.com/video/517031319"
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
                Villa Azur
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
                Vivez le luxe et le confort
              </motion.p>
            </div>
            
            <motion.div 
              variants={fadeIn}
              className="overflow-hidden"
            >
              <Button 
                asChild 
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 text-lg px-12 py-6 rounded-none"
              >
                <Link href="/villa">
                  Découvrir
                  <ArrowRight className="ml-2 h-5 w-5" />
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
                  L'excellence à l'état pur
                </motion.h2>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-24">
                Une villa d'exception de 500m² nichée entre ciel et mer, offrant une expérience de luxe inégalée sur la Côte d'Azur.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <motion.div 
                className="aspect-[4/5] relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg"
                  alt="Villa Azur exterior"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              
              <motion.div 
                className="aspect-[4/5] relative overflow-hidden group lg:translate-y-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg"
                  alt="Luxury interior"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              
              <motion.div 
                className="aspect-[4/5] relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg"
                  alt="Pool view"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 md:py-40 bg-black text-white">
        <div className="container max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <div>
              <div className="overflow-hidden mb-8">
                <motion.h2 
                  className="text-5xl md:text-6xl font-display"
                  variants={textReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Un service sur mesure
                </motion.h2>
              </div>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Chaque séjour à Villa Azur est une expérience unique, avec un service personnalisé pour répondre à vos désirs les plus exigeants.
              </p>
              <ul className="grid grid-cols-2 gap-8 mb-12">
                {[
                  "Conciergerie 24/7",
                  "Chef privé",
                  "Majordome",
                  "Spa & massage",
                  "Chauffeur privé",
                  "Service de sécurité"
                ].map((service, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center text-white/80 text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                    {service}
                  </motion.li>
                ))}
              </ul>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 rounded-none"
              >
                <Link href="/info">
                  En savoir plus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <motion.div 
              className="aspect-square relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image 
                src="https://images.pexels.com/photos/4946956/pexels-photo-4946956.jpeg"
                alt="Luxury service"
                fill
                className="object-cover"
              />
            </motion.div>
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
                Réservez votre séjour d'exception
              </motion.h2>
            </div>
            <Button 
              asChild 
              size="lg"
              className="bg-black text-white hover:bg-black/90 transition-all duration-500 text-lg px-12 py-6 rounded-none"
            >
              <Link href="/contact">
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}