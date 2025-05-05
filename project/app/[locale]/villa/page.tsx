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
import SnakeRectangleAnimation from '../../../src/components/SnakeRectangleAnimation';

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

        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-full h-full">
            <SnakeRectangleAnimation 
              textKey="villaException"
            />
          </div>
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
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{room.title}</h3>
                  <p className="text-muted-foreground">{room.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Bouton centré vers la galerie */}
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

      {/* Custom Living Spaces Section */}
      <section className="py-48 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/5 via-transparent to-transparent"></div>
        <div className="container max-w-[1400px] mx-auto px-4 relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {/* Colonne gauche : texte */}
            <div className="pl-8 md:pl-12 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-8 top-0 w-1 h-24 bg-gradient-to-b from-[#b7a66b] via-[#b7a66b]/50 to-transparent"></div>
                <h2 className="text-6xl font-bold mb-10 font-sans text-black tracking-tight">
                  {tVilla('livingSpaces.title')}
                </h2>
                <div className="space-y-10 text-lg font-sans text-black/80 leading-relaxed">
                  {[
                    tVilla('livingSpaces.description1'),
                    tVilla('livingSpaces.description2'),
                    tVilla('livingSpaces.description3'),
                    tVilla('livingSpaces.description4')
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="transform hover:translate-x-6 transition-all duration-700 hover:text-[#b7a66b] relative group"
                    >
                      <span className="absolute -left-6 top-1/2 w-2 h-2 bg-[#b7a66b] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-1/2"></span>
                      {text}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>
            {/* Colonne droite : image avec effet parallaxe */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <Image
                  src="/images/villa/IMG_5967.JPEG"
                  alt={tVilla('images.exterior.alt')}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Practical Information Section */}
      <section className="py-48 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/5 via-transparent to-transparent"></div>
        <div className="container max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <div className="inline-block relative">
              <h2 className="text-7xl font-display mb-10 tracking-tight relative z-10">
                {tVilla('practicalInfo.title')}
              </h2>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#b7a66b] to-transparent"></div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-12">
              {tVilla('practicalInfo.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {practicalInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-lg transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border border-neutral-100/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b7a66b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative mb-10">
                    <info.icon className="h-16 w-16 text-[#b7a66b] transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
                    <div className="absolute -inset-4 bg-[#b7a66b]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  <h3 className="text-2xl font-display mb-6 transform group-hover:translate-x-3 transition-transform duration-700">{info.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{info.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-48 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/5 via-transparent to-transparent"></div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <div className="inline-block relative">
              <h2 className="text-7xl font-display mb-10 tracking-tight relative z-10">
                {tVilla('features.title')}
              </h2>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#b7a66b] to-transparent"></div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-12">
              {tVilla('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group flex justify-center"
              >
                <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border border-neutral-100/50 relative overflow-hidden max-w-xl w-full flex flex-col">
                  <div className="flex items-center mb-4 gap-3">
                    <feature.icon className="h-8 w-8 text-[#b7a66b] flex-shrink-0" />
                    <h3 className="text-xl font-display font-semibold tracking-tight text-black">
                      {feature.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li 
                        key={i} 
                        className="flex items-start text-muted-foreground text-base"
                      >
                        <span className="w-2 h-2 mt-2 bg-[#b7a66b] rounded-full mr-3 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-48 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/5 via-transparent to-transparent"></div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <div className="inline-block relative">
              <h2 className="text-7xl font-display mb-10 tracking-tight relative z-10">
                {tVilla('additionalServices.title')}
              </h2>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#b7a66b] to-transparent"></div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-12">
              {tVilla('additionalServices.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-sm p-14 rounded-2xl shadow-lg transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border border-neutral-100/50 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b7a66b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative mb-12 inline-block">
                    <service.icon className="h-20 w-20 text-[#b7a66b] transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
                    <div className="absolute -inset-4 bg-[#b7a66b]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  <h3 className="text-2xl font-display mb-8 transform group-hover:translate-y-3 transition-transform duration-700">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-32"
          >
            <Button
              asChild
              size="lg"
              className="relative bg-[#b7a66b] text-white border-2 border-[#b7a66b] overflow-hidden group hover:bg-white hover:text-[#b7a66b] transition-all duration-1000 text-lg px-20 py-10 rounded-none"
            >
              <Link href="/contact">
                <span className="relative z-10 transform group-hover:translate-x-4 transition-transform duration-700">
                  {tVilla('bookNow')}
                </span>
                <div className="absolute inset-0 bg-white z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-48 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7a66b]/5 via-transparent to-[#b7a66b]/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/5 via-transparent to-transparent"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative h-[800px] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/images/villa/IMG_2348.JPEG"
                alt={tVilla('images.pool.alt')}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7a66b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div>
                <h2 className="text-7xl font-display tracking-tight mb-10">{tVilla('whyChooseUs.title')}</h2>
                <div className="w-40 h-1 bg-gradient-to-r from-transparent via-[#b7a66b] to-transparent mb-10"></div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {tVilla('whyChooseUs.description')}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-10">
                {[
                  { icon: Pool, text: tVilla('whyChooseUs.features.pool') },
                  { icon: Parking, text: tVilla('whyChooseUs.features.parking') },
                  { icon: Wifi, text: tVilla('whyChooseUs.features.wifi') },
                  { icon: Users, text: tVilla('whyChooseUs.features.capacity') }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center space-x-6 p-6 rounded-xl transition-all duration-700 hover:bg-white/90 hover:shadow-lg">
                      <div className="relative">
                        <feature.icon className="h-12 w-12 text-[#b7a66b] transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
                        <div className="absolute -inset-3 bg-[#b7a66b]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      <span className="text-xl transform group-hover:translate-x-4 transition-transform duration-700 group-hover:text-[#b7a66b]">
                        {feature.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}