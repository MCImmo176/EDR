"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { SectionTitle } from "@/components/ui/section-title";
import { Divider } from "@/components/ui/divider";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Compass, Clock, Star, ShieldCheck, MapPin, Users, Key, Volume2, ArrowRight, Car, ChefHat as Chef, Home, ParkingMeter as Parking, School as Pool, Wifi } from "lucide-react";
import LuxuryTextReveal from '../../../src/components/LuxuryTextReveal';

// Composant pour un élément d'accordéon
function AccordionItem({ title, description, isOpen, toggleOpen }: { 
  title: string;
  description: string;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  return (
    <motion.div 
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center justify-between cursor-pointer px-6 py-2 transition-all duration-300 hover:bg-opacity-10 hover:bg-white"
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleOpen();
          }
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <motion.span 
          className="text-2xl"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </motion.div>
      {isOpen && (
        <motion.div 
          className="mt-3 text-muted-foreground px-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p>{description}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function VillaPage() {
  const tVilla = useTranslations('villa');
  const [kitchenData, setKitchenData] = useState<any>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [hoverPoint, setHoverPoint] = useState<number | null>(null);
  
  // Example villa data - would come from CMS in a real app
  const villaImages = [
    {
      src: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      alt: tVilla('images.exterior.alt')
    },
    {
      src: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      alt: tVilla('images.living.alt')
    },
    {
      src: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
      alt: tVilla('images.bedroom.alt')
    }
  ];
  
  const features = [
    {
      icon: MapPin,
      title: tVilla('features.location.title'),
      items: [
        tVilla('features.location.items.monaco'),
        tVilla('features.location.items.airport'),
        tVilla('features.location.items.cannes'),
        tVilla('features.location.items.italy')
      ]
    },
    {
      icon: Home,
      title: tVilla('features.interior.title'),
      items: [
        tVilla('features.interior.items.living'),
        tVilla('features.interior.items.dining'),
        tVilla('features.interior.items.bar'),
        tVilla('features.interior.items.tv'),
        tVilla('features.interior.items.kitchen')
      ]
    },
    {
      icon: Users,
      title: tVilla('features.bedrooms.title'),
      items: [
        tVilla('features.bedrooms.items.total'),
        tVilla('features.bedrooms.items.sea'),
        tVilla('features.bedrooms.items.pine'),
        tVilla('features.bedrooms.items.bedding'),
        tVilla('features.bedrooms.items.amenities')
      ]
    },
    {
      icon: Star,
      title: tVilla('features.services.title'),
      items: [
        tVilla('features.services.items.bathrooms'),
        tVilla('features.services.items.wc'),
        tVilla('features.services.items.wellness'),
        tVilla('features.services.items.wifi'),
        tVilla('features.services.items.safe')
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Chef,
      title: tVilla('additionalServices.chef.title'),
      description: tVilla('additionalServices.chef.description')
    },
    {
      icon: Car,
      title: tVilla('additionalServices.valet.title'),
      description: tVilla('additionalServices.valet.description')
    },
    {
      icon: Home,
      title: tVilla('additionalServices.cleaning.title'),
      description: tVilla('additionalServices.cleaning.description')
    }
  ];

  const roomImages = [
    {
      title: tVilla('spaces.living.title'),
      description: tVilla('spaces.living.description'),
      src: "/images/villa/IMG_2409.JPEG",
      alt: tVilla('spaces.living.alt')
    },
    {
      title: tVilla('spaces.pool.title'),
      description: tVilla('spaces.pool.description'),
      src: "/images/villa/IMG_2348.JPEG",
      alt: tVilla('spaces.pool.alt')
    },
    {
      title: tVilla('spaces.suites.title'),
      description: tVilla('spaces.suites.description'),
      src: "/images/villa/IMG_2359.jpg",
      alt: tVilla('spaces.suites.alt')
    }
  ];

  const practicalInfo = [
    {
      icon: MapPin,
      title: tVilla('practicalInfo.location.title'),
      description: tVilla('practicalInfo.location.description')
    },
    {
      icon: Clock,
      title: tVilla('practicalInfo.availability.title'),
      description: tVilla('practicalInfo.availability.description')
    },
    {
      icon: Star,
      title: tVilla('practicalInfo.equipment.title'),
      description: tVilla('practicalInfo.equipment.description')
    },
    {
      icon: ShieldCheck,
      title: tVilla('practicalInfo.security.title'),
      description: tVilla('practicalInfo.security.description')
    }
  ];

  const houseRules = [
    {
      icon: Users,
      title: tVilla('houseRules.checkin.title'),
      description: tVilla('houseRules.checkin.description')
    },
    {
      icon: Key,
      title: tVilla('houseRules.access.title'),
      description: tVilla('houseRules.access.description')
    },
    {
      icon: Volume2,
      title: tVilla('houseRules.quiet.title'),
      description: tVilla('houseRules.quiet.description')
    }
  ];

  const distances = [
    { destination: tVilla('distances.monaco'), duration: "10 min" },
    { destination: tVilla('distances.nice'), duration: "30 min" },
    { destination: tVilla('distances.cannes'), duration: "45 min" },
    { destination: tVilla('distances.saintTropez'), duration: "1h30" },
    { destination: tVilla('distances.airport'), duration: "30 min" },
    { destination: tVilla('distances.beach'), duration: "5 min" }
  ];

  useEffect(() => {
    // Simuler le chargement des données de la cuisine
    const loadKitchenData = async () => {
      // En production, vous feriez une requête API ici
      setKitchenData({
        imagePath: "/images/villa-kitchen.jpg", // Remplacez par votre image
        points: [
          {
            x: 30,
            y: 25,
            id: "ilot",
            title: tVilla('kitchen.island.title'),
            description: tVilla('kitchen.island.description')
          },
          {
            x: 65,
            y: 40,
            id: "electromenagers",
            title: tVilla('kitchen.appliances.title'),
            description: tVilla('kitchen.appliances.description')
          },
          {
            x: 20,
            y: 60,
            id: "repas",
            title: tVilla('kitchen.dining.title'),
            description: tVilla('kitchen.dining.description')
          }
        ]
      });
    };

    loadKitchenData();
  }, [tVilla]);

  return (
    <main className="min-h-screen bg-white">
      {/* Section Hero avec vidéo YouTube en vrai plein écran */}
      <section className="relative h-screen w-full overflow-hidden p-0 m-0">
        {/* Conteneur vidéo qui couvre tout l'écran */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full w-full" style={{ paddingBottom: '56.25%' }}> {/* Ratio 16:9 */}
            <iframe
              src="https://www.youtube.com/embed/GYvCKCN_J9s?autoplay=1&mute=1&loop=1&playlist=GYvCKCN_J9s&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
              title={tVilla('hero.videoTitle')}
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

        {/* Contenu principal */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full h-full flex flex-col justify-center items-start">
            <div className="pl-[15%] md:pl-[10%] w-full max-w-[80%] md:max-w-[60%]">
              {/* Titre principal avec animation */}
              <div className="mb-16">
                <h1 className="text-white text-6xl md:text-7xl font-light tracking-wide">
                  {tVilla('hero.experienceTitle')}<br />
                  {tVilla('hero.experienceSubtitle')}
                </h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-[1px] bg-gradient-to-r from-[#BC9A6B] to-[#BC9A6B]/30 mt-8"
                ></motion.div>
              </div>
              
              {/* Texte secondaire avec animation de fondu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-6 max-w-xl"
              >
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                  {tVilla('hero.subtitle')}
                </p>
              </motion.div>
              
              {/* Bouton stylisé pour correspondre à l'onglet GALERIE */}
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
                    <span className="relative z-10 tracking-wider font-medium">{tVilla('hero.ctaButton')}</span>
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
            <span className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2 font-light">{tVilla('hero.scrollText')}</span>
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

      {/* 1. Spaces Section */}
      <section className="py-32 bg-white">
        <div className="container max-w-[1400px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionTitle
              title={tVilla('spaces.title')}
              subtitle={tVilla('spaces.subtitle')}
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
              {roomImages.map((room, index) => (
                <motion.div 
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Augmenter la hauteur des images de 300px à 450px avec adaptation aux écrans mobiles */}
                  <div className="relative h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden">
                    <Image 
                      src={room.src} 
                      alt={room.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                      priority={index === 0}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-sm text-sm tracking-wide font-light">
                        {room.title.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-28"
            >
              {[
                {
                  title: tVilla('features.privacy.title'),
                  description: tVilla('features.privacy.description')
                },
                {
                  title: tVilla('features.harmony.title'),
                  description: tVilla('features.harmony.description')
                },
                {
                  title: tVilla('features.wellness.title'),
                  description: tVilla('features.wellness.description')
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative p-6"
                >
                  <div className="absolute top-0 left-0 w-12 h-12">
                    <div className="absolute top-0 left-0 w-px h-8 bg-[#b7a66b]/60"></div>
                    <div className="absolute top-0 left-0 w-8 h-px bg-[#b7a66b]/60"></div>
                  </div>
                  
                  <h3 className="text-2xl font-serif mb-8 pt-6">{item.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-base">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="mt-32 text-center max-w-4xl mx-auto"
            >
              <div className="relative py-16">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[80px] text-[#b7a66b]/20 font-serif">"</div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-light text-neutral-700 italic max-w-3xl mx-auto leading-relaxed"
                >
                  {tVilla('features.artOfLiving')}
                </motion.p>
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
                  {tVilla('features.signature')}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Section Emplacement d'Exception */}
      <div className="py-40 relative max-w-screen-xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white pointer-events-none"></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[url('/images/map-bg.jpg')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-center px-8 lg:px-0 lg:pl-8"
          >
            <span className="text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-6">
              {tVilla('location.region')}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extralight mb-10 tracking-wide">
              {tVilla('location.title')}
            </h2>
            
            <div className="h-px w-16 bg-[#b7a66b]/30 mb-10"></div>
            
            <p className="text-neutral-600 font-light leading-relaxed mb-12 text-base max-w-xl">
              {tVilla('location.description')}
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium text-neutral-700 mb-6">{tVilla('location.distances.title')}</h3>
                <ul className="space-y-5">
                  {[
                    { destination: tVilla('location.distances.monaco.name'), duration: tVilla('location.distances.monaco.time') },
                    { destination: tVilla('location.distances.nice.name'), duration: tVilla('location.distances.nice.time') },
                    { destination: tVilla('location.distances.airport.name'), duration: tVilla('location.distances.airport.time') },
                    { destination: tVilla('location.distances.cannes.name'), duration: tVilla('location.distances.cannes.time') },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600 font-light">{item.destination}</span>
                      <span className="text-neutral-400 font-light">{item.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium text-neutral-700 mb-6">{tVilla('location.nearby.title')}</h3>
                <ul className="space-y-5">
                  {[
                    { place: tVilla('location.nearby.beaches.name'), distance: tVilla('location.nearby.beaches.time') },
                    { place: tVilla('location.nearby.golf.name'), distance: tVilla('location.nearby.golf.time') },
                    { place: tVilla('location.nearby.italy.name'), distance: tVilla('location.nearby.italy.time') },
                    { place: tVilla('location.nearby.saintTropez.name'), distance: tVilla('location.nearby.saintTropez.time') },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600 font-light">{item.place}</span>
                      <span className="text-neutral-400 font-light">{item.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-16">
              <Link 
                href="/decouvrir" 
                className="inline-flex items-center justify-center rounded-none bg-[#b7a66b] text-white px-8 py-4 text-sm font-light tracking-wider hover:bg-[#a89659] transition-all duration-300"
              >
                <span>{tVilla('location.exploreButton')}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 px-8 lg:pr-8"
          >
            <div className="relative h-[300px] md:h-[400px] overflow-hidden group sm:col-span-2">
              <Image
                src="/images/villa/DJI_0004.JPG"
                alt={tVilla('location.features.panoramic.alt')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-sm text-xs tracking-wider uppercase">
                  {tVilla('location.features.panoramic.title')}
                </span>
              </div>
            </div>
            
            <div className="relative h-[220px] md:h-[280px] overflow-hidden group">
              <Image
                src="/images/villa/exterieur.jpg"
                alt={tVilla('location.features.gardens.alt')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-sm text-xs tracking-wider uppercase">
                  {tVilla('location.features.gardens.title')}
                </span>
              </div>
            </div>
            
            <div className="relative h-[220px] md:h-[280px] overflow-hidden group">
              <Image
                src="/images/villa/IMG_8032.jpg"
                alt={tVilla('location.features.terraces.alt')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-sm text-xs tracking-wider uppercase">
                  {tVilla('location.features.terraces.title')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Section L'excellence à votre service */}
      <section className="py-32 md:py-56 relative">
        {/* Arrière-plan sophistiqué */}
        <div className="absolute inset-0 bg-[#f8f7f5]"></div>
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ 
          backgroundImage: 'url("/images/texture.png")',
          backgroundSize: '300px',
          backgroundRepeat: 'repeat'
        }}></div>
        
        <div className="container mx-auto relative">
          <div className="max-w-screen-xl mx-auto">
            {/* Section Services Sur Mesure */}
            <div className="pt-16 md:pt-32 pb-32 md:pb-48">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="block text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-6"
                >
                  {tVilla('services.customization')}
                </motion.span>
                
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-extralight mb-8 tracking-wide"
                >
                  {tVilla('services.title')}
                </motion.h2>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-px w-20 bg-[#b7a66b]/30 mx-auto my-8 origin-center"
                />
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-neutral-500 font-light max-w-2xl mx-auto text-center text-base md:text-lg leading-relaxed"
                >
                  {tVilla('services.description')}
                </motion.p>
              </motion.div>
              
              <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-screen-xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="flex flex-col justify-center"
                >
                  <h3 className="text-2xl md:text-3xl font-extralight mb-10 tracking-wide">
                    {tVilla('services.excellence.title')}
                  </h3>
                  
                  <p className="text-neutral-500 font-light leading-relaxed mb-12">
                    {tVilla('services.excellence.description')}
                  </p>
                  
                  <ul className="space-y-6 mb-16">
                    {[
                      tVilla('services.welcome'),
                      tVilla('services.concierge'),
                      tVilla('services.chef'),
                      tVilla('services.excursions')
                    ].map((item, i) => (
                      <li 
                        key={i} 
                        className="flex items-start text-neutral-600 font-light"
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f8f7f5] flex-shrink-0 mr-4">
                          <span className="w-1.5 h-1.5 bg-[#b7a66b] rounded-full"></span>
                        </div>
                        <span className="mt-1.5">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center bg-transparent border border-[#b7a66b] text-sm text-neutral-700 px-8 py-4 font-light tracking-wider hover:bg-[#b7a66b]/10 transition-all duration-300 max-w-max"
                  >
                    <span>{tVilla('services.customizeButton')}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/5] bg-neutral-100"
                >
                  {/* Image avec cadre */}
                  <div className="absolute inset-0 transform translate-x-4 translate-y-4">
                    <div className="absolute inset-0 bg-white shadow-sm">
                      <Image
                        src="/images/villa/IMG_2286.JPEG"
                        alt="Service personnalisé"
                        fill
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  </div>
                  
                  {/* Cadre décoratif */}
                  <div className="absolute inset-0 border border-[#b7a66b]/20"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section - Détails de la propriété */}
      <section className="py-32 md:py-56 relative">
        {/* Fond minimaliste avec texture subtile */}
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ 
          backgroundImage: 'url("/images/texture.png")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}></div>

        <div className="container mx-auto px-8 relative max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="block text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-4"
            >
              {tVilla('property.category')}
            </motion.span>
            
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extralight mb-8 tracking-wide"
            >
              {tVilla('property.title')}
            </motion.h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              viewport={{ once: true }}
              className="h-px w-20 bg-[#b7a66b]/30 mx-auto my-8 origin-center"
            />
          </motion.div>

          {/* Grille de caractéristiques principale - Design premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-0.5 bg-[#b7a66b]/5 mb-32"
          >
            {[
              {
                title: tVilla('property.location.title'),
                items: [
                  tVilla('property.location.monaco'),
                  tVilla('property.location.airport'),
                  tVilla('property.location.cannes'),
                  tVilla('property.location.italy')
                ]
              },
              {
                title: tVilla('property.livingSpace.title'),
                items: [
                  tVilla('property.livingSpace.livingRoom'),
                  tVilla('property.livingSpace.diningRoom'),
                  tVilla('property.livingSpace.bar'),
                  tVilla('property.livingSpace.kitchen')
                ]
              },
              {
                title: tVilla('property.suites.title'),
                items: [
                  tVilla('property.suites.count'),
                  tVilla('property.suites.terraces'),
                  tVilla('property.suites.bedding'),
                  tVilla('property.suites.dressing')
                ]
              },
              {
                title: tVilla('property.exterior.title'),
                items: [
                  tVilla('property.exterior.pool'),
                  tVilla('property.exterior.poolhouse'),
                  tVilla('property.exterior.garden'),
                  tVilla('property.exterior.terraces')
                ]
              }
            ].map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white px-10 py-14 group`}
              >
                <div className="relative mb-10 pb-8 border-b border-[#b7a66b]/10">
                  <h3 className="text-base uppercase tracking-widest font-light">{category.title}</h3>
                  <div className="absolute bottom-[-1px] left-0 w-8 h-[1px] bg-[#b7a66b] group-hover:w-16 transition-all duration-700"></div>
                </div>
                
                <ul className="space-y-5">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="block w-0.5 h-0.5 mt-2.5 bg-[#b7a66b] mr-3"></span>
                      <span className="text-neutral-600 font-light text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Section Excellence technique */}
      <section className="py-32 relative bg-[#f9f7f4]">
        <div className="container mx-auto px-8 relative max-w-[1600px]">
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-10 lg:gap-20 max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:col-span-2 flex flex-col justify-center"
            >
              <span className="text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-5">
                {tVilla('property.technical.category')}
              </span>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide leading-snug mb-10">
                {tVilla('property.technical.title')}
              </h2>
              
              <p className="text-neutral-500 font-light mb-12 leading-relaxed text-base max-w-2xl">
                {tVilla('property.technical.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                    <Users className="w-4 h-4 text-[#b7a66b]" />
                  </div>
                  <span className="text-neutral-700 text-sm">{tVilla('property.capacity.people')}</span>
                </div>
                
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                    <Pool className="w-4 h-4 text-[#b7a66b]" />
                  </div>
                  <span className="text-neutral-700 text-sm">{tVilla('property.capacity.pool')}</span>
                </div>
                
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                    <Parking className="w-4 h-4 text-[#b7a66b]" />
                  </div>
                  <span className="text-neutral-700 text-sm">{tVilla('property.capacity.parking')}</span>
                </div>
                
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                    <Wifi className="w-4 h-4 text-[#b7a66b]" />
                  </div>
                  <span className="text-neutral-700 text-sm">{tVilla('property.capacity.wifi')}</span>
                </div>
                
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                    <Home className="w-4 h-4 text-[#b7a66b]" />
                  </div>
                  <span className="text-neutral-700 text-sm">{tVilla('property.capacity.automation')}</span>
                </div>
                
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                    <ShieldCheck className="w-4 h-4 text-[#b7a66b]" />
                  </div>
                  <span className="text-neutral-700 text-sm">{tVilla('property.capacity.security')}</span>
                </div>
              </div>
              
              <div className="mt-14">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-none border border-[#b7a66b] text-sm text-neutral-700 px-8 py-4 font-light tracking-wider hover:bg-[#b7a66b]/10 transition-all duration-300"
                >
                  <span>{tVilla('property.allEquipments')}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="aspect-[3/4] relative"
            >
              <div className="absolute inset-0 border border-[#b7a66b]/20 transform translate-x-5 translate-y-5"></div>
              <div className="absolute inset-0 bg-white">
                <Image
                  src="/images/villa/IMG_5967.JPEG"
                  alt="Vue extérieure de la villa"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Section Pourquoi choisir les étoiles du rocher */}
      <section className="py-32 md:py-48 relative">
        <div className="absolute inset-0 bg-[#f8f7f5]"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ 
          backgroundImage: 'url("/images/texture.png")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}></div>
        
        <div className="container mx-auto px-8 relative max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-28 overflow-hidden"
          >
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="block font-light tracking-[0.25em] text-xs uppercase mb-4 text-[#b7a66b]"
              >
                {tVilla('experience.category')}
              </motion.span>
              
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extralight text-center max-w-4xl leading-tight mb-8 tracking-wide"
              >
                {tVilla('experience.title')}
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className="h-[1px] w-32 bg-[#b7a66b] mx-auto my-10"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-neutral-600 font-light max-w-3xl mx-auto text-center text-base md:text-lg leading-relaxed mb-20"
              >
                {tVilla('experience.description')}
              </motion.p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative h-[650px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/villa/IMG_2348.JPEG"
                  alt={tVilla('images.pool.alt')}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              
              {/* Overlay et cadre élégant */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute inset-12 border border-white/20 pointer-events-none"></div>
              
              <div className="absolute inset-0 flex items-end p-12">
                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-10 max-w-md">
                  <h3 className="text-xl font-light tracking-wide mb-4">{tVilla('experience.commitment.title')}</h3>
                  <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed">
                    {tVilla('experience.commitment.quote')}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-10"
            >              
              <div className="space-y-12">
                {[
                  {
                    title: tVilla('experience.exceptional.title'),
                    description: tVilla('experience.exceptional.description')
                  },
                  {
                    title: tVilla('experience.harmony.title'),
                    description: tVilla('experience.harmony.description')
                  },
                  {
                    title: tVilla('experience.service.title'),
                    description: tVilla('experience.service.description')
                  }
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="pb-8 border-b border-[#b7a66b]/10"
                  >
                    <h3 className="text-lg font-medium tracking-wide mb-4 text-[#343434]">{point.title}</h3>
                    <p className="text-neutral-500 font-light text-base leading-relaxed">{point.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <Button
                  asChild
                  className="relative bg-[#b7a66b] text-white border border-[#b7a66b] overflow-hidden group hover:bg-white hover:text-[#b7a66b] transition-all duration-300 rounded-none px-8 py-4 text-sm font-light tracking-wider"
                >
                  <Link href="/contact">
                    <span className="relative z-10">{tVilla('experience.bookButton')}</span>
                    <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}