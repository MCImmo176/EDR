"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
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

// Composant pour l'affichage de la cuisine interactive
function InteractiveKitchen({ kitchenData }: { kitchenData: any }) {
  const { tVilla } = useLanguage();
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [hoverPoint, setHoverPoint] = useState<number | null>(null);

  if (!kitchenData) return null;

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="md:col-span-2 relative h-[500px] rounded-lg overflow-hidden group"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <Image
          src={kitchenData.imagePath}
          alt={tVilla('kitchen.images.alt')}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        
        {kitchenData.points.map((point: any, index: number) => (
          <motion.div
            key={index}
            className={`absolute w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 ${
              activePoint === index ? 'bg-orange-500 scale-110' : ''
            }`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onClick={() => {
              if (activePoint === index) {
                setActivePoint(null);
              } else {
                setActivePoint(index);
              }
            }}
            onMouseEnter={() => setHoverPoint(index)}
            onMouseLeave={() => setHoverPoint(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
            aria-label={tVilla(`kitchen.${point.id}.title`)}
            role="button"
            tabIndex={0}
          >
            {activePoint === index && (
              <motion.span 
                className="w-3 h-3 rounded-full bg-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="bg-muted p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        {kitchenData.points.map((point: any, index: number) => (
          <motion.div 
            key={index} 
            className={`mb-6 p-4 rounded-lg transition-all duration-300 ${
              activePoint !== null && activePoint !== index ? 'opacity-50' : ''
            } ${activePoint === index ? 'bg-white shadow-md' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-2">{tVilla(`kitchen.${point.id}.title`)}</h3>
            <p className="text-muted-foreground">{tVilla(`kitchen.${point.id}.description`)}</p>
          </motion.div>
        ))}

        {kitchenData.points.length === 0 && (
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {tVilla('kitchen.noPoints')}
          </motion.p>
        )}
      </motion.div>

      <style jsx>{`
        .absolute {
          overflow: visible;
        }
        .absolute::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transform: scale(1);
          transition: all 0.5s ease-out;
        }
        .absolute:hover::before {
          opacity: 1;
          transform: scale(1.5);
          animation: pulse 1.5s infinite;
        }
        .absolute:not(:hover)::before {
          animation: none;
          opacity: 0;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .bg-orange-500::before {
          background-color: rgba(233, 84, 32, 0.4);
        }
      `}</style>
    </motion.div>
  );
}

// Composant d'accordéon pour les détails de la cuisine
function KitchenAccordion() {
  const { tVilla } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>("caissons");
  
  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };
  
  const kitchenSections = [
    {
      id: "caissons",
      title: tVilla('kitchen.cabinets.title'),
      description: tVilla('kitchen.cabinets.description')
    },
    {
      id: "plan",
      title: tVilla('kitchen.counter.title'),
      description: tVilla('kitchen.counter.description')
    },
    {
      id: "evier",
      title: tVilla('kitchen.sink.title'),
      description: tVilla('kitchen.sink.description')
    },
    {
      id: "lave-vaisselle",
      title: tVilla('kitchen.dishwasher.title'),
      description: tVilla('kitchen.dishwasher.description')
    },
    {
      id: "refrigerateur",
      title: tVilla('kitchen.fridge.title'),
      description: tVilla('kitchen.fridge.description')
    },
    {
      id: "four",
      title: tVilla('kitchen.oven.title'),
      description: tVilla('kitchen.oven.description')
    },
    {
      id: "plaque",
      title: tVilla('kitchen.stove.title'),
      description: tVilla('kitchen.stove.description')
    },
    {
      id: "ilot",
      title: tVilla('kitchen.island.title'),
      description: tVilla('kitchen.island.description')
    }
  ];
  
  return (
    <motion.div 
      className="bg-neutral-100 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {kitchenSections.map((section, index) => (
        <motion.div 
          key={section.id} 
          className={`transition-all duration-300 ${
            openSection === section.id ? 'bg-amber-700 text-white' : 'hover:bg-neutral-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
        >
          <AccordionItem
            title={section.title}
            description={section.description}
            isOpen={openSection === section.id}
            toggleOpen={() => toggleSection(section.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function VillaPage() {
  const { tVilla } = useLanguage();
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
      title: tVilla('spaces.living2.title'),
      description: tVilla('spaces.living2.description'),
      src: "/images/villa/IMG_2286.JPEG",
      alt: tVilla('spaces.living2.alt')
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
            title: "Îlot central",
            description: "Îlot central en marbre avec espace de rangement intégré et tabourets design."
          },
          {
            x: 65,
            y: 40,
            id: "electromenagers",
            title: "Électroménagers haut de gamme",
            description: "Équipement Gaggenau avec réfrigérateur intégré, four vapeur et plaque à induction."
          },
          {
            x: 20,
            y: 60,
            id: "repas",
            title: "Espace repas",
            description: "Table en chêne massif pouvant accueillir jusqu'à 8 personnes."
          }
        ]
      });
    };

    loadKitchenData();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Section Hero avec vidéo YouTube en vrai plein écran */}
      <section className="relative h-screen w-full overflow-hidden p-0 m-0">
        {/* Conteneur vidéo qui couvre tout l'écran */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full w-full" style={{ paddingBottom: '56.25%' }}> {/* Ratio 16:9 */}
            <iframe
              src="https://www.youtube.com/embed/GYvCKCN_J9s?autoplay=1&mute=1&loop=1&playlist=GYvCKCN_J9s&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
              title="Vidéo villa"
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
                <LuxuryTextReveal 
                  textKey="villa"
                  className="text-white text-6xl md:text-7xl font-light tracking-wide"
                />
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
                  className="relative bg-transparent text-white border border-[#b7a66b] overflow-hidden group hover:bg-[#b7a66b] transition-all duration-700 text-lg px-12 py-6 rounded-none"
                >
                  <Link href="/contact">
                    <span className="relative z-10 tracking-wider">{tVilla('hero.ctaButton')}</span>
                    <div className="absolute inset-0 bg-[#b7a66b] z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
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

      {/* Spaces Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {roomImages.map((room, index) => (
                <motion.div 
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
                    <Image 
                      src={room.src} 
                      alt={room.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      priority={index === 0}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-8 left-8 z-10">
                      <span className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-sm text-sm tracking-wide font-light">
                        {room.title.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{room.title}</h3>
                  <p className="text-muted-foreground">{room.description}</p>
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
                  title: "ESPACES INTIMES",
                  description: "Chaque espace a été conçu pour préserver votre intimité tout en offrant des ouvertures sur les extérieurs."
                },
                {
                  title: "DESIGN INTEMPOREL",
                  description: "Les intérieurs allient esthétique contemporaine et matériaux nobles pour un résultat à la fois élégant et chaleureux."
                },
                {
                  title: "CONFORT ABSOLU",
                  description: "Une attention méticuleuse a été portée à chaque détail pour garantir un confort optimal dans tous les espaces de vie."
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
                  L'art de vivre réside dans ces espaces où chaque regard découvre un détail pensé pour votre bien-être.
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
                  LES ÉTOILES DU ROCHER
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="flex justify-center mt-16">
            <Button
              asChild
              size="lg"
              className="relative bg-[#b7a66b] text-white border-2 border-[#b7a66b] overflow-hidden group hover:bg-white hover:text-[#b7a66b] transition-all duration-500 text-lg px-12 py-6 rounded-none"
            >
              <Link href="/galerie">
                <span className="relative z-10">{tVilla('spaces.galleryButton')}</span>
                <div className="absolute inset-0 bg-white z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Practical Information Section - Redesigned for luxury */}
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
            {/* En-tête de section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="mb-32 text-center"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="block text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-8"
              >
                COMMODITÉS
              </motion.span>
              
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-12 tracking-wide"
              >
                L'ART DE RECEVOIR
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px w-16 bg-[#b7a66b]/30 mx-auto my-10 origin-center"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                viewport={{ once: true }}
                className="text-neutral-500 font-light max-w-xl mx-auto text-center text-base leading-relaxed"
              >
                Nous avons pensé à chaque détail pour que votre séjour soit d'un raffinement absolu, 
                alliant quiétude et élégance dans les moindres aspects de votre expérience.
              </motion.p>
            </motion.div>

            {/* Grille de services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#b7a66b]/10">
              {[
                {
                  icon: MapPin,
                  title: "EMPLACEMENT PRESTIGIEUX",
                  description: "À quelques minutes de Monaco, notre villa surplombe la mer dans un écrin de verdure où discrétion et élégance se rencontrent."
                },
                {
                  icon: ShieldCheck,
                  title: "SÉCURITÉ PRIVATIVE",
                  description: "Un système de sécurité de pointe avec surveillance 24/7 et accès privatif pour garantir votre tranquillité absolue."
                },
                {
                  icon: Clock,
                  title: "SERVICE CONCIERGERIE",
                  description: "Notre équipe dédiée se tient à votre disposition pour répondre à toute demande, à n'importe quelle heure du jour ou de la nuit."
                },
                {
                  icon: MapPin,
                  title: "ACCÈS PRIVILÉGIÉ",
                  description: "Bénéficiez d'accès privés aux plus belles plages et établissements de la Côte d'Azur grâce à nos partenariats exclusifs."
                }
              ].map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-10 lg:p-14 xl:p-16 relative overflow-hidden bg-white h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-8 inline-flex">
                        <info.icon className="h-5 w-5 text-[#b7a66b]" />
                      </div>
                      
                      <h3 className="text-sm tracking-widest font-light mb-6 uppercase">{info.title}</h3>
                      <p className="text-neutral-500 leading-relaxed font-light text-sm">{info.description}</p>
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-[#b7a66b]/10">
                      <span className="text-xs uppercase tracking-wide text-[#b7a66b]/70 font-light">Les Étoiles du Rocher</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Section supplémentaire */}
            <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex flex-col justify-center"
              >
                <span className="block text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-6">
                  EXPÉRIENCE
                </span>
                
                <h3 className="text-2xl md:text-3xl font-extralight mb-10 tracking-wide">
                  SERVICE SUR MESURE
                </h3>
                
                <p className="text-neutral-500 font-light leading-relaxed mb-10">
                  Notre équipe dédiée anticipe vos besoins et personnalise chaque aspect de votre séjour. 
                  De l'organisation d'événements privés à la réservation des meilleures tables de la Côte d'Azur, 
                  nous sommes à votre service pour créer des moments d'exception.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Check-in personnalisé et flexible",
                    "Service de conciergerie 24/7",
                    "Chef privé et service d'étage",
                    "Organisation d'excursions exclusives"
                  ].map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-start text-neutral-500 font-light"
                    >
                      <span className="w-1 h-1 mt-3 bg-[#b7a66b] rounded-full mr-3 flex-shrink-0"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
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
      </section>

      {/* Features Section - Completement repensé pour un luxe absolu */}
      <section className="py-32 md:py-56 relative">
        {/* Fond minimaliste avec texture subtile */}
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ 
          backgroundImage: 'url("/images/texture.png")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}></div>

        <div className="container mx-auto px-8 relative max-w-[1600px]">
          {/* Introduction élégante */}
          <div className="max-w-screen-md mx-auto text-center mb-24">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-4"
            >
              Exclusivité
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extralight mb-5 tracking-wide"
            >
              PERFECTION DES DÉTAILS
            </motion.h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className="h-[1px] w-12 bg-[#b7a66b]/30 mx-auto my-6"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-neutral-500 font-light text-sm leading-relaxed"
            >
              Une propriété d'exception pensée pour offrir une expérience incomparable
            </motion.p>
          </div>

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
                title: "Emplacement",
                items: [
                  "10 minutes du centre de Monaco",
                  "30 minutes de l'aéroport de Nice",
                  "45 minutes de Cannes",
                  "15 minutes de l'Italie"
                ]
              },
              {
                title: "Espaces de vie",
                items: [
                  "Salon avec vue panoramique",
                  "Salle à manger ouverte",
                  "Bar et espace lounge",
                  "Cuisine équipée Gaggenau"
                ]
              },
              {
                title: "Chambres",
                items: [
                  "5 suites avec salles de bain",
                  "Terrasses privatives",
                  "Literie haut de gamme italienne",
                  "Dressings sur mesure"
                ]
              },
              {
                title: "Prestations",
                items: [
                  "Piscine à débordement chauffée",
                  "Système domotique intégral",
                  "Climatisation réversible",
                  "Cave à vin climatisée"
                ]
              }
            ].map((category, index) => (
              <div 
                key={index}
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
              </div>
            ))}
          </motion.div>

          {/* Mise en avant sur fond contrasté */}
          <div className="relative py-32 mb-32">
            {/* Fond contrasté */}
            <div className="absolute inset-0 bg-[#f9f7f4]"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-10 lg:gap-20 max-w-screen-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:col-span-2 flex flex-col justify-center"
              >
                <span className="text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-5">
                  Un lieu d'exception
                </span>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide leading-snug mb-10">
                  Séjourner dans une villa où chaque détail<br className="hidden md:block" /> a été pensé pour l'excellence
                </h2>
                
                <p className="text-neutral-500 font-light mb-12 leading-relaxed text-base max-w-2xl">
                  Fraîchement achevée, Les Étoiles du Rocher vous offre un cadre idyllique entre mer et montagne. 
                  Notre villa allie architecture contemporaine et matériaux nobles pour créer une atmosphère 
                  où luxe discret et confort absolu se rencontrent.
                </p>
                
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Users className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">Jusqu'à 10 personnes</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Pool className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">Piscine à débordement</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Parking className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">Parking privé (8 places)</span>
                  </div>
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

          {/* Services personnalisés */}
          <div className="mb-32 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-[#b7a66b]/5">
              {[
                {
                  icon: Chef,
                  title: "CHEF PRIVÉ",
                  description: "Dégustez des créations gastronomiques personnalisées dans l'intimité de votre villa. Notre chef étoilé compose des menus sur mesure selon vos préférences."
                },
                {
                  icon: Car,
                  title: "CONCIERGERIE LUXE",
                  description: "Du service voiturier à la réservation des meilleures tables, notre équipe de conciergerie se charge de tous les détails pour un séjour sans le moindre souci."
                },
                {
                  icon: Home,
                  title: "SERVICE HÔTELIER",
                  description: "Profitez d'un service de ménage quotidien, d'un changement de linge à la demande et d'une préparation sur mesure de votre villa avant votre arrivée."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative bg-white px-10 py-16 group flex flex-col"
                >
                  <div className="mb-12 inline-flex">
                    <service.icon className="h-5 w-5 text-[#b7a66b]" />
                  </div>
                  
                  <h3 className="text-sm tracking-widest font-light mb-5">{service.title}</h3>
                  <p className="text-neutral-500 leading-relaxed font-light text-sm flex-grow">{service.description}</p>
                  
                  <div className="mt-10 pt-6 border-t border-[#b7a66b]/10 flex justify-between items-center">
                    <span className="text-xs text-[#b7a66b]/70 font-light">Service sur demande</span>
                    <ArrowRight className="w-4 h-4 text-[#b7a66b]/40 group-hover:text-[#b7a66b] transition-colors duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Appel à l'action final */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-screen-md mx-auto"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-extralight tracking-wider mb-10"
            >
              UNE VILLA NICHÉE ENTRE CIEL ET MER
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-500 font-light mb-16 leading-relaxed max-w-xl mx-auto"
            >
              Offrez-vous une parenthèse d'exception dans ce havre de paix entre Monaco et Menton, où mer azuréenne et montagnes se rencontrent pour créer un cadre unique.
            </motion.p>
            
            <Button
              asChild
              size="lg"
              className="relative bg-transparent text-black border border-[#b7a66b] overflow-hidden group hover:bg-[#b7a66b] hover:text-white transition-all duration-700 text-xs font-light tracking-widest px-12 py-5 uppercase"
            >
              <Link href="/contact">
                <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-700">
                  Réserver votre séjour
                </span>
                <div className="absolute inset-0 bg-[#b7a66b] z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Additional Services Section - Redesigned for luxury */}
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
                Art de vivre
              </motion.span>
              
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extralight text-center max-w-4xl leading-tight mb-6 tracking-wide"
              >
                POURQUOI CHOISIR LES ÉTOILES DU ROCHER
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className="h-[1px] w-12 bg-[#b7a66b]/30 mx-auto my-8"
              />
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute inset-12 border border-white/20 pointer-events-none"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <p className="text-neutral-500 font-light leading-relaxed text-base">
                  C'est une véritable perle rare, neuve et prête à sublimer votre séjour. En choisissant Les Étoiles du Rocher, vous optez pour bien plus qu'un simple hébergement : une expérience complète où chaque détail a été pensé pour votre satisfaction absolue.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: "UN LIEU PRIVILÉGIÉ",
                    description: "Un environnement exceptionnel entre mer et montagne, offrant une vue imprenable sur la Méditerranée et un accès rapide aux joyaux de la Côte d'Azur."
                  },
                  {
                    title: "DES PRESTATIONS HAUT DE GAMME",
                    description: "Des matériaux et équipements sélectionnés avec le plus grand soin, des technologies dernier cri et des espaces de vie pensés pour le confort absolu."
                  },
                  {
                    title: "INTIMITÉ ET SÉRÉNITÉ",
                    description: "Une propriété totalement privative nichée dans un écrin de verdure méditerranéenne, vous garantissant tranquillité et discrétion."
                  }
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="pb-6 border-b border-[#b7a66b]/10"
                  >
                    <h3 className="text-sm tracking-widest font-light mb-2">{point.title}</h3>
                    <p className="text-neutral-500 font-light text-sm leading-relaxed">{point.description}</p>
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
                <Link 
                  href="/contact" 
                  className="text-xs uppercase tracking-widest font-light text-[#b7a66b] hover:text-black transition-colors duration-300 flex items-center"
                >
                  <span>Réserver maintenant</span>
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}