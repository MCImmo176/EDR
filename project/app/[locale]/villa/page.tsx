"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/ui/section-title";
import { Divider } from "@/components/ui/divider";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Compass, Clock, Star, ShieldCheck, MapPin, Users, Key, Volume2, ArrowRight } from "lucide-react";
import SnakeRectangleAnimation from '../../../src/components/SnakeRectangleAnimation';

// Composant pour un élément d'accordéon
function AccordionItem({ title, description, isOpen, toggleOpen }: { 
  title: string;
  description: string;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex items-center justify-between cursor-pointer px-6 py-2 transition-all duration-300 hover:bg-opacity-10 hover:bg-white"
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleOpen();
          }
        }}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <motion.span 
          className="text-2xl"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </div>
      {isOpen && (
        <motion.div 
          className="mt-3 text-muted-foreground px-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{description}</p>
        </motion.div>
      )}
    </div>
  );
}

// Composant pour l'affichage de la cuisine interactive
function InteractiveKitchen({ kitchenData }: { kitchenData: any }) {
  const { tVilla } = useLanguage();
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [hoverPoint, setHoverPoint] = useState<number | null>(null);

  if (!kitchenData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      <div className="md:col-span-2 relative h-[500px] rounded-lg overflow-hidden group">
        <Image
          src={kitchenData.imagePath}
          alt={tVilla('kitchen.images.alt')}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
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
            aria-label={tVilla(`kitchen.${point.id}.title`)}
            role="button"
            tabIndex={0}
          >
            {activePoint === index && (
              <motion.span 
                className="w-3 h-3 rounded-full bg-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="bg-muted p-6 rounded-lg shadow-lg">
        {kitchenData.points.map((point: any, index: number) => (
          <motion.div 
            key={index} 
            className={`mb-6 p-4 rounded-lg transition-all duration-300 ${
              activePoint !== null && activePoint !== index ? 'opacity-50' : ''
            } ${activePoint === index ? 'bg-white shadow-md' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2">{tVilla(`kitchen.${point.id}.title`)}</h3>
            <p className="text-muted-foreground">{tVilla(`kitchen.${point.id}.description`)}</p>
          </motion.div>
        ))}

        {kitchenData.points.length === 0 && (
          <p className="text-muted-foreground">
            {tVilla('kitchen.noPoints')}
          </p>
        )}
      </div>

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
    </div>
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
    <div className="bg-neutral-100 rounded-lg shadow-lg overflow-hidden">
      {kitchenSections.map((section) => (
        <motion.div 
          key={section.id} 
          className={`transition-all duration-300 ${
            openSection === section.id ? 'bg-amber-700 text-white' : 'hover:bg-neutral-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AccordionItem
            title={section.title}
            description={section.description}
            isOpen={openSection === section.id}
            toggleOpen={() => toggleSection(section.id)}
          />
        </motion.div>
      ))}
    </div>
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
  
  const villaFeatures = [
    { title: tVilla('features.area'), value: "500 m²" },
    { title: tVilla('features.bedrooms'), value: "5" },
    { title: tVilla('features.bathrooms'), value: "6" },
    { title: tVilla('features.pool'), value: tVilla('features.poolType') },
    { title: tVilla('features.view'), value: tVilla('features.viewType') },
    { title: tVilla('features.beach'), value: tVilla('features.beachType') }
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
      src: "/images/villa/IMG_2359.JPG",
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
              title="Découvrez nos espaces"
              subtitle="Chaque espace des Étoiles du Rocher a été conçu pour vous offrir confort, élégance et moments inoubliables."
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
              className="relative bg-transparent border-2 border-black text-black overflow-hidden group hover:text-white transition-all duration-500 text-lg px-12 py-6 rounded-none"
            >
              <Link href="/galerie">
                <span className="relative z-10">{tVilla('common.gallery')}</span>
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Living Spaces Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche : texte */}
            <div className="pl-8 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 font-sans text-black" style={{ fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                {tVilla('livingSpaces.title')}
              </h2>
              <p className="text-lg mb-10 font-sans text-black" style={{ fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                {tVilla('livingSpaces.description1')}<br /><br />
                {tVilla('livingSpaces.description2')}<br /><br />
                {tVilla('livingSpaces.description3')}<br /><br />
                {tVilla('livingSpaces.description4')}
              </p>
            </div>
            {/* Colonne droite : image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/villa/IMG_5967.JPEG"
                  alt={tVilla('images.exterior.alt')}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Information Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display mb-6">{tVilla('practicalInfo.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {tVilla('practicalInfo.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practicalInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:transform hover:-translate-y-2"
              >
                <info.icon className="h-12 w-12 mb-6 text-primary" />
                <h3 className="text-xl font-display mb-4">{info.title}</h3>
                <p className="text-muted-foreground">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}