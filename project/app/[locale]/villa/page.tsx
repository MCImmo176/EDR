"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/ui/section-title";
import { Divider } from "@/components/ui/divider";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { useState, useEffect } from "react";

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
        className="flex items-center justify-between cursor-pointer" 
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <div className="mt-3 text-muted-foreground">
          <p>{description}</p>
        </div>
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
      <div className="md:col-span-2 relative h-[500px] rounded-lg overflow-hidden">
        <Image
          src={kitchenData.imagePath}
          alt={tVilla('kitchen.images.alt')}
          fill
          className="object-cover"
        />
        
        {kitchenData.points.map((point: any, index: number) => (
          <div
            key={index}
            className={`absolute w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-transform ${
              activePoint === index ? 'bg-orange-500' : ''
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
          >
            {activePoint === index && (
              <span className="w-3 h-3 rounded-full bg-white"></span>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-muted p-6 rounded-lg">
        {kitchenData.points.map((point: any, index: number) => (
          <div 
            key={index} 
            className={`mb-6 ${activePoint !== null && activePoint !== index ? 'opacity-50' : ''}`}
          >
            <h3 className="text-xl mb-2">{tVilla(`kitchen.${point.id}.title`)}</h3>
            <p className="text-muted-foreground">{tVilla(`kitchen.${point.id}.description`)}</p>
          </div>
        ))}

        {kitchenData.points.length === 0 && (
          <p className="text-muted-foreground">
            {tVilla('kitchen.noPoints')}
          </p>
        )}
      </div>

      {/* Styles pour les effets d'ondes uniquement au survol */}
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
    <div className="bg-neutral-100 rounded-lg p-0 overflow-hidden">
      {kitchenSections.map((section) => (
        <div key={section.id} className={`transition-all ${openSection === section.id ? 'bg-amber-700 text-white' : ''}`}>
          <AccordionItem
            title={section.title}
            description={section.description}
            isOpen={openSection === section.id}
            toggleOpen={() => toggleSection(section.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default function VillaPage() {
  const { tVilla, tCommon } = useLanguage();
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
      title: tVilla('rooms.master.title'),
      description: tVilla('rooms.master.description'),
      src: "https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg",
      alt: tVilla('rooms.master.alt')
    },
    {
      title: tVilla('rooms.main.title'),
      description: tVilla('rooms.main.description'),
      src: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg",
      alt: tVilla('rooms.main.alt')
    },
    {
      title: tVilla('rooms.terrace.title'),
      description: tVilla('rooms.terrace.description'),
      src: "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg",
      alt: tVilla('rooms.terrace.alt')
    },
    {
      title: tVilla('rooms.gourmet.title'),
      description: tVilla('rooms.gourmet.description'),
      src: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      alt: tVilla('rooms.gourmet.alt')
    }
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
            title: "Îlot central",
            description: "Îlot central en marbre avec espace de rangement intégré et tabourets design."
          },
          {
            x: 65,
            y: 40,
            title: "Électroménagers haut de gamme",
            description: "Équipement Gaggenau avec réfrigérateur intégré, four vapeur et plaque à induction."
          },
          {
            x: 20,
            y: 60,
            title: "Espace repas",
            description: "Table en chêne massif pouvant accueillir jusqu'à 8 personnes."
          }
        ]
      });
    };

    loadKitchenData();

    const animateTopBorder = () => {
      return new Promise(resolve => {
        const topBorder = document.querySelector('.border-top');
        if (!topBorder) return resolve();
        let width = 0;
        const interval = setInterval(() => {
          width += 1;
          topBorder.style.width = width + '%';
          if (width >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 5);
      });
    };
    
    const animateRightBorder = () => {
      return new Promise(resolve => {
        const rightBorder = document.querySelector('.border-right');
        if (!rightBorder) return resolve();
        let height = 0;
        const interval = setInterval(() => {
          height += 1;
          rightBorder.style.height = height + '%';
          if (height >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 5);
      });
    };
    
    const animateBottomBorder = () => {
      return new Promise(resolve => {
        const bottomBorder = document.querySelector('.border-bottom');
        if (!bottomBorder) return resolve();
        let width = 0;
        const interval = setInterval(() => {
          width += 1;
          bottomBorder.style.width = width + '%';
          bottomBorder.style.right = 'auto';
          bottomBorder.style.left = (100 - width) + '%';
          if (width >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 5);
      });
    };
    
    const animateLeftBorder = () => {
      return new Promise(resolve => {
        const leftBorder = document.querySelector('.border-left');
        if (!leftBorder) return resolve();
        let height = 0;
        const interval = setInterval(() => {
          height += 1;
          leftBorder.style.height = height + '%';
          leftBorder.style.bottom = 'auto';
          leftBorder.style.top = (100 - height) + '%';
          if (height >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 5);
      });
    };
    
    const animateTextLine = (index: number) => {
      return new Promise(resolve => {
        const textContent = document.querySelectorAll('.text-content')[index];
        if (!textContent) return resolve();
        let position = -100;
        
        const interval = setInterval(() => {
          position += 2;
          (textContent as HTMLElement).style.transform = `translateX(${position}%)`;
          
          if (position >= 0) {
            (textContent as HTMLElement).style.transform = 'translateX(0)';
            clearInterval(interval);
            resolve();
          }
        }, 10);
      });
    };
    
    const animateText = async () => {
      await animateTextLine(0);
      await new Promise(resolve => setTimeout(resolve, 200));
      await animateTextLine(1);
    };
    
    const playAnimation = async () => {
      await animateTopBorder();
      await animateRightBorder();
      await animateBottomBorder();
      await animateLeftBorder();
      await animateText();
    };

    playAnimation();
  }, []);

  return (
    <main>
      <section className="relative h-screen w-full overflow-hidden">
        <ImageCarousel images={villaImages} />
      </section>

      <section className="py-32">
        <div className="container max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl mx-auto text-center mb-16">
              <SectionTitle>{tVilla('title')}</SectionTitle>
              <p className="text-xl text-muted-foreground mt-6">
                {tVilla('description')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {villaFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle
            title="Découvrez nos espaces"
            subtitle="Chaque espace de Villa Azur a été conçu pour vous offrir confort, élégance et moments inoubliables."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {roomImages.map((room, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="image-wrapper mb-6">
                  <Image 
                    src={room.src} 
                    alt={room.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-2xl mb-3">{room.title}</h3>
                <p className="text-muted-foreground">{room.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-padding container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle
            title="Notre Cuisine"
            subtitle="Une cuisine équipée de tout le nécessaire pour un confort optimal"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              {kitchenData ? (
                <div className="relative h-full">
                  <Image
                    src={kitchenData.imagePath}
                    alt="Cuisine de la villa"
                    fill
                    className="object-cover"
                  />
                  
                  {kitchenData.points.map((point: any, index: number) => (
                    <div
                      key={index}
                      className={`absolute w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-transform ${
                        activePoint === index ? 'bg-orange-500' : ''
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
                    >
                      {activePoint === index && (
                        <span className="w-3 h-3 rounded-full bg-white"></span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <p>Chargement de l'image...</p>
                </div>
              )}
              
              {/* Styles pour les effets d'ondes uniquement au survol */}
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
            
            <div>
              <KitchenAccordion />
            </div>
          </div>
        </motion.div>
      </section>
      
      <section className="bg-muted section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">L'expérience Villa Azur</h2>
            <p className="text-lg">
              Séjourner à Villa Azur, c'est vivre une expérience de luxe inégalée, où chaque détail a été pensé pour votre confort et votre plaisir. Notre équipe est à votre disposition pour rendre votre séjour inoubliable, qu'il s'agisse d'organiser des services personnalisés, des excursions ou des événements exceptionnels.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}