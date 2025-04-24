"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
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
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [hoverPoint, setHoverPoint] = useState<number | null>(null);

  if (!kitchenData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      <div className="md:col-span-2 relative h-[500px] rounded-lg overflow-hidden">
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
      
      <div className="bg-muted p-6 rounded-lg">
        {kitchenData.points.map((point: any, index: number) => (
          <div 
            key={index} 
            className={`mb-6 ${activePoint !== null && activePoint !== index ? 'opacity-50' : ''}`}
          >
            <h3 className="text-xl mb-2">{point.title}</h3>
            <p className="text-muted-foreground">{point.description}</p>
          </div>
        ))}

        {kitchenData.points.length === 0 && (
          <p className="text-muted-foreground">
            Cliquez sur un des points pour afficher les détails spécifiques de cette partie de la cuisine.
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
      title: "Caissons hauts et bas",
      description: "Caissons hauts avec fixations invisibles et vitres fumées au centre, caissons bas surélevés avec deux étagères et 15% d'espace supplémentaire."
    },
    {
      id: "plan",
      title: "Plan de travail et crédence",
      description: "Plan de travail en quartz noir avec finition mate anti-traces, crédence en verre trempé pour un entretien facile."
    },
    {
      id: "evier",
      title: "Évier et mitigeur",
      description: "Évier sous plan en inox brossé avec mitigeur extractible à jet variable pour une plus grande flexibilité."
    },
    {
      id: "lave-vaisselle",
      title: "Lave-vaisselle intelligent",
      description: "Lave-vaisselle intégré avec programme éco et détection automatique de charge pour une consommation optimisée."
    },
    {
      id: "refrigerateur",
      title: "Réfrigérateurs combinés",
      description: "Réfrigérateur-congélateur combiné avec compartiments No-Frost et zone fraîcheur spéciale pour les aliments délicats."
    },
    {
      id: "four",
      title: "Four et Micro-ondes",
      description: "Four multifonction avec fonction vapeur et micro-ondes combiné pour une cuisson rapide et saine."
    },
    {
      id: "plaque",
      title: "Plaque de cuisson",
      description: "Plaque à induction avec 5 zones de cuisson et pont modulable pour s'adapter à tous les types de récipients."
    },
    {
      id: "ilot",
      title: "Îlot central",
      description: "Îlot central avec rangements intégrés et prises électriques dissimulées pour plus de praticité au quotidien."
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
  const { t } = useLanguage();
  const [kitchenData, setKitchenData] = useState<any>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [hoverPoint, setHoverPoint] = useState<number | null>(null);
  
  // Example villa data - would come from CMS in a real app
  const villaImages = [
    {
      src: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      alt: "Villa exterior with pool and sea view"
    },
    {
      src: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      alt: "Luxury living room with panoramic windows"
    },
    {
      src: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
      alt: "Master bedroom with sea view"
    }
  ];
  
  const villaFeatures = [
    { title: "Surface", value: "500 m²" },
    { title: "Chambres", value: "5" },
    { title: "Salles de bain", value: "6" },
    { title: "Piscine", value: "Infinity" },
    { title: "Vue", value: "Mer" },
    { title: "Accès plage", value: "Privé" }
  ];
  
  const roomImages = [
    {
      title: "Master Suite",
      description: "Une master suite spacieuse avec vue panoramique sur la mer, salle de bain en marbre et dressing.",
      src: "https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg",
      alt: "Master bedroom suite"
    },
    {
      title: "Salon Principal",
      description: "Un salon élégant avec baies vitrées offrant une vue imprenable sur la Méditerranée.",
      src: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg",
      alt: "Main living room"
    },
    {
      title: "Terrasse & Piscine",
      description: "Une terrasse spacieuse avec piscine à débordement et espace détente face à la mer.",
      src: "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg",
      alt: "Terrace with infinity pool"
    },
    {
      title: "Cuisine Gourmet",
      description: "Une cuisine entièrement équipée avec îlot central et équipements haut de gamme.",
      src: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      alt: "Gourmet kitchen"
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
    <>
      <section className="pt-24 md:pt-32">
        <div className="container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Notre Villa"
              subtitle="Découvrez le lieu où le luxe rencontre l'art de vivre méditerranéen."
              centered
            />
          </motion.div>
        </div>

        <div className="relative h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg"
              alt="Villa exterior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container">
              <div className="rectangle-container relative w-[350px] h-[250px] text-white">
                <div className="snake-border absolute inset-0">
                  <div className="border-segment border-top absolute top-0 left-0 h-[2px] w-0 bg-white" />
                  <div className="border-segment border-right absolute top-0 right-0 w-[2px] h-0 bg-white" />
                  <div className="border-segment border-bottom absolute bottom-0 right-0 h-[2px] w-0 bg-white" />
                  <div className="border-segment border-left absolute bottom-0 left-0 w-[2px] h-0 bg-white" />
                </div>
                <div className="text-container flex flex-col items-center justify-center h-full">
                  <div className="text-line overflow-hidden">
                    <span className="text-content inline-block transform -translate-x-full text-2xl font-light uppercase tracking-wider">
                      Vivez le luxe
                    </span>
                  </div>
                  <div className="text-line overflow-hidden mt-2">
                    <span className="text-content inline-block transform -translate-x-full text-2xl font-light uppercase tracking-wider">
                      et le confort
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="content-grid">
            <div className="col-span-1 md:col-span-6 lg:col-span-7">
              <h2 className="mb-6">Un havre de paix sur la Côte d'Azur</h2>
              <p className="text-lg mb-6">
                Nichée sur les hauteurs de Roquebrune Cap Martin, Villa Azur offre une vue imprenable sur la Méditerranée et les côtes italiennes. Cette propriété d'exception de 500m² a été conçue pour offrir une expérience de luxe inégalée.
              </p>
              <p className="text-lg mb-6">
                Avec son architecture contemporaine, ses vastes espaces de vie baignés de lumière et ses finitions haut de gamme, Villa Azur incarne l'élégance et le raffinement. Chaque détail a été soigneusement pensé pour créer un cadre de vie exceptionnel.
              </p>
              <p className="text-lg">
                La villa dispose de 5 suites luxueuses, d'un salon spacieux avec cheminée, d'une salle à manger pouvant accueillir jusqu'à 12 personnes, d'une cuisine gourmet et d'un home cinéma. À l'extérieur, une piscine à débordement, plusieurs terrasses et un jardin méditerranéen complètent ce havre de paix.
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-6 lg:col-span-4 lg:col-start-9 flex flex-col justify-center">
              <div className="bg-muted p-8">
                <h3 className="text-xl mb-6">Caractéristiques</h3>
                <ul className="space-y-4">
                  {villaFeatures.map((feature, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{feature.title}</span>
                      <span className="font-medium">{feature.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      <Divider className="container mx-auto" />
      
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
    </>
  );
}