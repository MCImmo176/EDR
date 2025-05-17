"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export default function MobileHomePage() {
  const { tHome } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  // Écouteur de défilement pour les effets parallaxe simplifiés
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sections optimisées pour mobile
  const features = [
    {
      icon: "/icons/pool.svg",
      title: "Piscine à débordement",
      description: "Vue panoramique sur la mer Méditerranée"
    },
    {
      icon: "/icons/beach.svg",
      title: "Accès privé à la plage",
      description: "À seulement quelques pas de votre terrasse"
    },
    {
      icon: "/icons/bed.svg",
      title: "Suites luxueuses",
      description: "Chambre avec vue mer et salle de bain privative"
    },
    {
      icon: "/icons/chef.svg",
      title: "Chef privé sur demande",
      description: "Cuisine méditerranéenne d'exception"
    }
  ];

  // Affichage adapté au mobile
  return (
    <>
      {/* Hero Section Mobile */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Image de fond optimisée pour mobile (au lieu de vidéo) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-mobile.jpg"
            alt="Vue panoramique de la propriété"
            fill
            priority
            className="object-cover"
            style={{
              objectPosition: "center center",
              filter: "brightness(0.85)"
            }}
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl sm:text-5xl font-light leading-tight mb-4"
          >
            Les Étoiles<br />du Rocher
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-16 h-[1px] bg-[#b7a66b] my-5"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/90 text-base font-light max-w-xs mt-2 mb-8"
          >
            Une expérience luxueuse au cœur de la Méditerranée
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button asChild className="bg-[#b7a66b] hover:bg-[#b7a66b]/90 text-white border-none rounded-none px-6 py-6">
              <Link href="/contact">
                <span className="uppercase text-sm tracking-widest font-light">Réserver maintenant</span>
              </Link>
            </Button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-6 h-6 text-white/80" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-[#1c1c1c] mb-4">Bienvenue au paradis</h2>
            <div className="w-12 h-[1px] bg-[#b7a66b] mx-auto mb-6" />
            <p className="text-[#555] font-light leading-relaxed">
              Nichée sur les falaises méditerranéennes, notre propriété de luxe offre une expérience inoubliable alliant confort exceptionnel et beauté naturelle.
            </p>
          </motion.div>
          
          {/* Image avec effet parallaxe simplifié */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[300px] w-full my-10 overflow-hidden rounded shadow-lg"
          >
            <Image
              src="/images/villa-exterieur.jpg"
              alt="Vue extérieure de la villa"
              fill
              className="object-cover"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                transition: 'transform 0.05s linear'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#f8f7f5] px-6">
        <div className="container mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-light text-[#1c1c1c] mb-4">Services exclusifs</h2>
            <div className="w-12 h-[1px] bg-[#b7a66b] mx-auto mb-6" />
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 bg-white shadow-sm"
              >
                <div className="bg-[#f8f7f5] p-4 rounded-full mb-4">
                  <Image src={feature.icon} alt={feature.title} width={28} height={28} />
                </div>
                <h3 className="text-lg font-medium text-[#1c1c1c] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#666] font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-white px-6">
        <div className="container mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-light text-[#1c1c1c] mb-4">Découvrez notre propriété</h2>
            <div className="w-12 h-[1px] bg-[#b7a66b] mx-auto mb-6" />
          </motion.div>
          
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="relative h-40 overflow-hidden">
              <Image src="/images/gallery/exterieur/1.JPG" alt="Vue extérieure" fill className="object-cover" />
            </div>
            <div className="relative h-40 overflow-hidden">
              <Image src="/images/gallery/interieur/1.JPEG" alt="Salon luxueux" fill className="object-cover" />
            </div>
            <div className="relative h-40 overflow-hidden">
              <Image src="/images/gallery/chambres/1.JPG" alt="Suite principale" fill className="object-cover" />
            </div>
            <div className="relative h-40 overflow-hidden">
              <Image src="/images/gallery/vues/Coucher de soleil.png" alt="Vue mer" fill className="object-cover" />
            </div>
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-transparent hover:bg-[#b7a66b] text-[#b7a66b] hover:text-white border border-[#b7a66b] rounded-none px-5 py-3">
              <Link href="/galerie">
                <span className="text-sm tracking-widest font-light">Voir toutes les photos</span>
                <ArrowRight className="ml-2 w-4 h-4 inline-block" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1c1c1c] px-6 text-white">
        <div className="container mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-light mb-4">Prêt pour une expérience inoubliable?</h2>
            <p className="font-light mb-8 text-white/80">
              Réservez votre séjour dès maintenant et vivez le luxe méditerranéen.
            </p>
            <Button asChild className="bg-[#b7a66b] hover:bg-[#b7a66b]/90 text-white border-none rounded-none px-6 py-6">
              <Link href="/contact">
                <span className="uppercase text-sm tracking-widest font-light">Contactez-nous</span>
                <ArrowRight className="ml-2 w-4 h-4 inline-block" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
} 