"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Compass, Clock, Star, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionTitle } from "@/components/ui/section-title";
import { Divider } from "@/components/ui/divider";

export default function InfoPage() {
  const { t } = useLanguage();
  
  const amenities = [
    { title: "Maison", items: ["500m² d'espace habitable", "5 chambres en-suite", "Salon spacieux", "Salle à manger", "Cuisine équipée", "Home cinéma", "Buanderie", "Cave à vin climatisée"] },
    { title: "Extérieur", items: ["Piscine à débordement chauffée", "Terrasses aménagées", "Jardin méditerranéen", "Accès privé à la plage", "Parking sécurisé", "Système d'alarme"] },
    { title: "Services", items: ["Ménage quotidien", "Chef privé (optionnel)", "Majordome (optionnel)", "Service de conciergerie 24/7", "Sécurité", "Transferts aéroport"] },
    { title: "Loisirs", items: ["Équipement fitness", "Kayaks et paddle boards", "Matériel de plongée", "Home cinéma", "Système audio haut de gamme", "Bibliothèque"] }
  ];
  
  const locationDetails = {
    distances: [
      { place: "Plage", distance: "Accès direct" },
      { place: "Monaco", distance: "10 minutes" },
      { place: "Nice Côte d'Azur (Aéroport)", distance: "30 minutes" },
      { place: "Cannes", distance: "45 minutes" },
      { place: "Saint-Tropez", distance: "1h30" }
    ],
    coordinates: {
      lat: 43.756,
      lng: 7.452
    }
  };
  
  const houseRules = [
    "Check-in: 16h00 / Check-out: 10h00",
    "Non-fumeur",
    "Pas d'animaux de compagnie",
    "Pas de fêtes ou événements sans autorisation préalable",
    "Respecter le voisinage et ne pas faire de bruit après 22h00"
  ];

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Informations"
              subtitle="Tout ce que vous devez savoir pour préparer votre séjour à Villa Azur."
              centered
            />
          </motion.div>
        </div>
      </section>
      
      <section className="section-padding bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <Compass className="h-12 w-12 mb-4" />
                <h3 className="text-xl mb-3">Situation</h3>
                <p>
                  Idéalement située à Roquebrune Cap Martin, à quelques minutes de Monaco et des plus belles plages de la Côte d'Azur.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <Clock className="h-12 w-12 mb-4" />
                <h3 className="text-xl mb-3">Disponibilité</h3>
                <p>
                  La villa est disponible à la location toute l'année, avec une durée minimale de séjour d'une semaine.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <Star className="h-12 w-12 mb-4" />
                <h3 className="text-xl mb-3">Équipements</h3>
                <p>
                  Des équipements haut de gamme et des services personnalisés pour un séjour d'exception.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <ShieldCheck className="h-12 w-12 mb-4" />
                <h3 className="text-xl mb-3">Sécurité</h3>
                <p>
                  Propriété entièrement sécurisée avec système d'alarme, vidéosurveillance et service de sécurité sur demande.
                </p>
              </div>
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
            title="Équipements & Services"
            subtitle="Villa Azur offre une gamme complète d'équipements et de services pour répondre à toutes vos attentes."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
            {amenities.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl mb-4 after:content-[''] after:block after:w-12 after:h-px after:bg-primary after:mt-2">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
          <div className="content-grid">
            <div className="col-span-1 md:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src="https://images.pexels.com/photos/2707756/pexels-photo-2707756.jpeg" 
                  alt="Vue aérienne de Roquebrune Cap Martin"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-6 flex flex-col justify-center">
              <h2 className="mb-6">Situation & Accès</h2>
              <p className="text-lg mb-6">
                Villa Azur est située sur les hauteurs de Roquebrune Cap Martin, offrant une vue panoramique sur la Méditerranée tout en étant à proximité des plus beaux sites de la Côte d'Azur.
              </p>
              
              <h3 className="text-xl mb-4">Distances</h3>
              <ul className="space-y-2 mb-8">
                {locationDetails.distances.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.place}</span>
                    <span className="font-medium">{item.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
      
      <section className="section-padding bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionTitle
              title="Règlement de la villa"
              subtitle="Pour garantir le confort de tous, nous vous prions de respecter ces quelques règles pendant votre séjour."
              centered
            />
            
            <div className="max-w-2xl mx-auto mt-12 bg-background p-8">
              <ul className="space-y-4">
                {houseRules.map((rule, index) => (
                  <li key={index} className="flex items-baseline">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-1"></div>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}