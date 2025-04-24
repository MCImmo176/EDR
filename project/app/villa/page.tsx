"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionTitle } from "@/components/ui/section-title";
import { Divider } from "@/components/ui/divider";
import { ImageCarousel } from "@/components/ui/image-carousel";

export default function VillaPage() {
  const { t } = useLanguage();
  
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
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ImageCarousel 
            images={villaImages} 
            aspectRatio="wide"
            className="w-full"
          />
        </motion.div>
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