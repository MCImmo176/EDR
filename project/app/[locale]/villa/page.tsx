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
              {/* Remplacer le composant LuxuryTextReveal par du HTML statique pour correspondre à l'onglet GALERIE */}
              <div className="mb-16">
                <h1 className="text-white text-6xl md:text-7xl font-light tracking-wide">
                  L'expérience<br />
                  ciel et mer
                </h1>
                <div className="h-1 w-20 bg-[#b7a66b] mt-6"></div>
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
              className="relative bg-[#b7a66b] text-white border-2 border-[#b7a66b] rounded-lg overflow-hidden group hover:bg-white hover:text-[#b7a66b] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#b7a66b]/20 hover:-translate-y-1 text-sm font-medium px-8 py-4"
            >
              <Link href="/contact">
                <span className="relative z-10">
                  Réserver votre séjour
                </span>
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
              className="mb-20 text-center"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="block text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-8"
              >
                ESSENCE
              </motion.span>
              
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-6 tracking-wide"
              >
                L'ART DE RECEVOIR
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px w-24 bg-[#b7a66b]/30 mx-auto my-10 origin-center"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                viewport={{ once: true }}
                className="text-neutral-500 font-light max-w-2xl mx-auto text-center text-base md:text-lg leading-relaxed"
              >
                Nous cultivons l'art de l'accueil dans sa forme la plus raffinée. Chaque instant passé aux Étoiles du Rocher 
                devient une mélodie entre quiétude absolue et élégance discrète, où l'excellence s'exprime par l'attention portée aux moindres détails.
              </motion.p>
              
              {/* Galerie d'images élégante */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {[
                  {
                    src: "/images/villa/IMG_2359.jpg",
                    alt: "Réception élégante",
                    caption: "Réception Personnalisée",
                    description: "Une arrivée orchestrée selon vos souhaits, loin des standards hôteliers traditionnels."
                  },
                  {
                    src: "/images/villa/IMG_2326.JPEG",
                    alt: "Service personnalisé",
                    caption: "Service d'Exception",
                    description: "Un personnel dévoué à votre bien-être, anticipant vos désirs avec une discrétion irréprochable."
                  },
                  {
                    src: "/images/villa/IMG_2286.JPEG",
                    alt: "Atmosphère raffinée",
                    caption: "Atmosphère Sensorielle",
                    description: "Un environnement où chaque élément s'harmonise pour éveiller vos sens et apaiser votre esprit."
                  }
                ].map((image, index) => (
                  <div key={index} className="group relative overflow-hidden h-[350px] md:h-[400px] flex flex-col">
                    <div className="relative flex-grow overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                      <div className="h-px w-12 bg-[#b7a66b] mb-4 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500"></div>
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
                className="mt-16 text-center"
              >
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-none bg-transparent border border-[#b7a66b] text-sm text-neutral-700 px-8 py-4 font-light tracking-wider hover:bg-[#b7a66b]/10 transition-all duration-300"
                >
                  <span>Découvrez notre philosophie d'accueil</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Grille de services repensée avec une approche luxe */}
            <div className="pt-12 md:pt-16 pb-24 md:pb-32">
              <div className="max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#b7a66b]/5">
                  {[
                    {
                      icon: MapPin,
                      title: "ADRESSE D'EXCEPTION",
                      description: "À quelques minutes de Monaco, surplombant la Méditerranée dans un écrin de verdure préservé où l'élégance s'épanouit en toute intimité."
                    },
                    {
                      icon: ShieldCheck,
                      title: "SÉCURITÉ ABSOLUE",
                      description: "Un système de protection sophistiqué vous garantissant une tranquillité parfaite. Gardiennage discret et technologies de pointe pour votre sérénité."
                    },
                    {
                      icon: Clock,
                      title: "CONCIERGERIE DÉDIÉE",
                      description: "Notre équipe d'exception anticipe vos moindres souhaits à chaque instant de votre séjour, avec une disponibilité permanente et personnalisée."
                    },
                    {
                      icon: Star,
                      title: "ACCÈS PRIVILÉGIÉS",
                      description: "Nos relations privilégiées vous ouvrent les portes des établissements les plus exclusifs de la Côte d'Azur et des expériences confidentielles."
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
                          <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f8f7f5]">
                            <info.icon className="h-5 w-5 text-[#b7a66b]" />
                          </div>
                          
                          <h3 className="text-sm tracking-widest font-light mb-6 uppercase">{info.title}</h3>
                          <p className="text-neutral-500 leading-relaxed font-light text-sm">{info.description}</p>
                        </div>
                        
                        <div className="mt-10 pt-6 border-t border-[#b7a66b]/10 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wide text-[#b7a66b]/70 font-light">Les Étoiles du Rocher</span>
                          <div className="w-6 h-6 rounded-full border border-[#b7a66b]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="h-3 w-3 text-[#b7a66b]" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

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
                  PERSONNALISATION
                </motion.span>
                
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-extralight mb-8 tracking-wide"
                >
                  SERVICES SUR MESURE
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
                  Notre démarche s'articule autour de vos désirs. Nous orchestrons chaque détail pour vous offrir 
                  une expérience où l'exceptionnel devient norme, et l'inattendu, une délicate attention.
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
                    L'EXCELLENCE À VOTRE SERVICE
                  </h3>
                  
                  <p className="text-neutral-500 font-light leading-relaxed mb-12">
                    Notre équipe d'exception anticipe vos souhaits avec une subtile intuition. Des événements privés 
                    aux réservations dans les établissements les plus prisés, nous nous chargeons de l'organisation 
                    parfaite de chaque moment de votre séjour.
                  </p>
                  
                  <ul className="space-y-6 mb-16">
                    {[
                      "Accueil personnalisé et check-in privatif",
                      "Service de conciergerie disponible 24h/24",
                      "Chef étoilé et service en chambre",
                      "Organisation d'excursions confidentielles"
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
                    <span>Personnalisez votre expérience</span>
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
              
              {/* Services premium */}
              <div className="mt-24 mb-16 md:mt-40 max-w-screen-xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-20 text-center"
                >
                  <h3 className="text-xl md:text-2xl font-light mb-4 tracking-wide">
                    NOS ATTENTIONS PARTICULIÈRES
                  </h3>
                  <div className="h-px w-12 bg-[#b7a66b]/30 mx-auto"></div>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#b7a66b]/5">
                  {[
                    {
                      icon: Chef,
                      title: "CHEF PRIVÉ",
                      description: "Savourez une gastronomie d'exception dans l'intimité de votre villa. Notre chef étoilé compose des menus raffinés selon vos préférences et votre palette gustative."
                    },
                    {
                      icon: Car,
                      title: "CONCIERGERIE EXCLUSIVE",
                      description: "Un service sur mesure prenant en charge les moindres détails de votre séjour, des transferts en voiture de luxe aux réservations dans les établissements les plus prisés."
                    },
                    {
                      icon: Home,
                      title: "SERVICE MAJORDOME",
                      description: "Une présence discrète et attentionnée veillant à la perfection quotidienne de votre environnement, du linge frais aux arrangements floraux, en passant par vos préférences personnelles."
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
                      <div className="mb-12 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f8f7f5]">
                        <service.icon className="h-5 w-5 text-[#b7a66b]" />
                      </div>
                      
                      <h3 className="text-sm tracking-widest font-light mb-5 uppercase">{service.title}</h3>
                      <p className="text-neutral-500 leading-relaxed font-light text-sm flex-grow">{service.description}</p>
                      
                      <div className="mt-10 pt-6 border-t border-[#b7a66b]/10 flex justify-between items-center">
                        <span className="text-xs text-[#b7a66b]/70 font-light uppercase tracking-wider">Sur demande</span>
                        <ArrowRight className="w-4 h-4 text-[#b7a66b]/40 group-hover:text-[#b7a66b] transition-colors duration-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center mt-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center justify-center px-8 py-4 bg-[#b7a66b] text-white text-sm font-light tracking-wider border border-[#b7a66b] hover:bg-transparent hover:text-[#b7a66b] transition-all duration-300"
                    >
                      <span>Réservez ces prestations d'exception</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </div>
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
          <div className="max-w-screen-md mx-auto text-center mb-28">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-[#b7a66b] font-light tracking-[0.25em] text-xs uppercase mb-6"
            >
              CARACTÉRISTIQUES
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extralight mb-8 tracking-wide"
            >
              DÉTAILS DE LA PROPRIÉTÉ
            </motion.h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className="h-[1px] w-16 bg-[#b7a66b]/30 mx-auto my-8"
            />
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
                title: "Situation",
                items: [
                  "À 10 min du centre de Monaco",
                  "À 30 min de l'aéroport de Nice",
                  "À 45 min de Cannes",
                  "À 15 min de la frontière italienne"
                ]
              },
              {
                title: "Espaces de vie",
                items: [
                  "Salon panoramique de 150m²",
                  "Salle à manger avec vue mer",
                  "Bar et salon de réception",
                  "Cuisine Gaggenau sur mesure"
                ]
              },
              {
                title: "Suites",
                items: [
                  "5 suites avec salles de bain privatives",
                  "Terrasses individuelles vue mer",
                  "Literie Hästens sur mesure",
                  "Dressings en bois précieux"
                ]
              },
              {
                title: "Extérieurs",
                items: [
                  "Piscine à débordement chauffée",
                  "Pool house avec cuisine d'été",
                  "Jardin méditerranéen paysager",
                  "Terrasses en pierre naturelle"
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
                  EXCELLENCE TECHNIQUE
                </span>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide leading-snug mb-10">
                  Confort et technologies<br className="hidden md:block" /> au service de votre bien-être
                </h2>
                
                <p className="text-neutral-500 font-light mb-12 leading-relaxed text-base max-w-2xl">
                  Les Étoiles du Rocher bénéficie des dernières innovations pour vous garantir un confort absolu. 
                  Système domotique de pointe, climatisation invisible, isolation phonique parfaite... 
                  Chaque détail technique a été pensé pour se faire oublier et vous laisser profiter pleinement de l'instant présent.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Users className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">10 personnes</span>
                  </div>
                  
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Pool className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">Piscine 15m x 6m</span>
                  </div>
                  
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Parking className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">8 places de parking</span>
                  </div>
                  
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Wifi className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">Wi-Fi ultra-rapide</span>
                  </div>
                  
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <Home className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">Domotique intégrée</span>
                  </div>
                  
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b7a66b]/10 mr-4">
                      <ShieldCheck className="w-4 h-4 text-[#b7a66b]" />
                    </div>
                    <span className="text-neutral-700 text-sm">Sécurité 24/7</span>
                  </div>
                </div>
                
                <div className="mt-14">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center rounded-none border border-[#b7a66b] text-sm text-neutral-700 px-8 py-4 font-light tracking-wider hover:bg-[#b7a66b]/10 transition-all duration-300"
                  >
                    <span>Découvrez tous nos équipements</span>
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
                EXPÉRIENCE UNIQUE
              </motion.span>
              
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extralight text-center max-w-4xl leading-tight mb-8 tracking-wide"
              >
                POURQUOI CHOISIR LES ÉTOILES DU ROCHER
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
                Au-delà d'un simple hébergement, Les Étoiles du Rocher incarne une philosophie où chaque élément a 
                été imaginé pour créer une expérience de séjour exceptionnelle, alliant la quintessence du 
                raffinement méditerranéen à un service personnalisé inégalé.
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
                  <h3 className="text-xl font-light tracking-wide mb-4">Notre Engagement</h3>
                  <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed">
                    "Offrir à nos hôtes l'expérience d'un séjour inoubliable, où le luxe se mesure par 
                    l'authenticité des moments vécus et la discrétion d'un service d'exception."
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
                    title: "UNE PROPRIÉTÉ EXCEPTIONNELLE",
                    description: "Un véritable joyau architectural récemment achevé, offrant une vue à couper le souffle sur la Méditerranée depuis chaque espace de vie, dans un environnement privilégiant votre intimité absolue."
                  },
                  {
                    title: "L'ALLIANCE DU LUXE ET DE L'AUTHENTICITÉ",
                    description: "Une symphonie de matériaux nobles, de technologies discrètes et d'aménagements raffinés, au service d'une expérience sensorielle harmonieuse où rien n'est laissé au hasard."
                  },
                  {
                    title: "UN SERVICE SUR MESURE",
                    description: "Une équipe dévouée qui fait de votre bien-être sa priorité absolue, anticipant vos désirs et créant pour vous des moments d'exception adaptés à vos envies les plus personnelles."
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
                    <span className="relative z-10">Réservez votre expérience d'exception</span>
                    <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Emplacement d'Exception */}
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
              RIVIERA FRANÇAISE
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extralight mb-10 tracking-wide">
              EMPLACEMENT D'EXCEPTION
            </h2>
            
            <div className="h-px w-16 bg-[#b7a66b]/30 mb-10"></div>
            
            <p className="text-neutral-600 font-light leading-relaxed mb-12 text-base max-w-xl">
              Nichée au cœur d'un rivage légendaire entre Monaco et Menton, Les Étoiles du Rocher 
              offre un point de vue privilégié sur la Méditerranée. Un emplacement rarissime qui 
              conjugue l'intimité d'un jardin méditerranéen privatif à la proximité des lieux les 
              plus prestigieux de la Côte d'Azur.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium text-neutral-700 mb-6">Distances</h3>
                <ul className="space-y-5">
                  {[
                    { destination: "Monaco", duration: "10 min" },
                    { destination: "Nice", duration: "30 min" },
                    { destination: "Aéroport", duration: "35 min" },
                    { destination: "Cannes", duration: "50 min" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600 font-light">{item.destination}</span>
                      <span className="text-neutral-400 font-light">{item.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium text-neutral-700 mb-6">À proximité</h3>
                <ul className="space-y-5">
                  {[
                    { place: "Plages", distance: "5 min" },
                    { place: "Golf", distance: "15 min" },
                    { place: "Italie", distance: "15 min" },
                    { place: "St-Tropez", distance: "1h30" },
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
                <span>Découvrez les environs</span>
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
                alt="Vue panoramique sur la mer Méditerranée"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-sm text-xs tracking-wider uppercase">
                  Vue Panoramique
                </span>
              </div>
            </div>
            
            <div className="relative h-[220px] md:h-[280px] overflow-hidden group">
              <Image
                src="/images/villa/exterieur.jpg"
                alt="Jardins méditerranéens"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-sm text-xs tracking-wider uppercase">
                  Jardins
                </span>
              </div>
            </div>
            
            <div className="relative h-[220px] md:h-[280px] overflow-hidden group">
              <Image
                src="/images/villa/IMG_8032.jpg"
                alt="Rooftop avec vue"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-sm text-xs tracking-wider uppercase">
                  Terrasses
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Appel à l'action final */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center max-w-screen-md mx-auto py-24 md:py-40"
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
          className="relative bg-[#b7a66b] text-white border-2 border-[#b7a66b] rounded-lg overflow-hidden group hover:bg-white hover:text-[#b7a66b] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#b7a66b]/20 hover:-translate-y-1 text-sm font-medium px-8 py-4"
        >
          <Link href="/contact">
            <span className="relative z-10">
              Réserver votre séjour
            </span>
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}