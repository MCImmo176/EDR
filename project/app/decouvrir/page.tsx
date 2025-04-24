"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

export default function DecouvrirPage() {
  const activities = [
    {
      title: "Monaco",
      description: "Découvrez la principauté de Monaco, ses casinos légendaires, le Palais Princier et le Grand Prix de Formule 1.",
      image: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg",
      distance: "10 minutes",
      link: "https://www.visitmonaco.com"
    },
    {
      title: "Nice",
      description: "Flânez sur la Promenade des Anglais, visitez le Vieux Nice et profitez de la gastronomie locale.",
      image: "https://images.pexels.com/photos/4179480/pexels-photo-4179480.jpeg",
      distance: "30 minutes",
      link: "https://www.nicetourisme.com"
    },
    {
      title: "Èze Village",
      description: "Village médiéval perché offrant une vue imprenable sur la Méditerranée et abritant le célèbre Jardin Exotique.",
      image: "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
      distance: "15 minutes",
      link: "https://www.eze-tourisme.com"
    },
    {
      title: "Saint-Paul-de-Vence",
      description: "Village des artistes avec ses galeries d'art, ses remparts et sa Fondation Maeght.",
      image: "https://images.pexels.com/photos/5759949/pexels-photo-5759949.jpeg",
      distance: "45 minutes",
      link: "https://www.saint-pauldevence.com"
    },
    {
      title: "Menton",
      description: "La perle de la France, connue pour ses jardins, son festival du citron et ses plages.",
      image: "https://images.pexels.com/photos/5490356/pexels-photo-5490356.jpeg",
      distance: "15 minutes",
      link: "https://www.menton-riviera-merveilles.fr"
    },
    {
      title: "Antibes",
      description: "Découvrez le Port Vauban, le Fort Carré et le musée Picasso dans cette ville historique.",
      image: "https://images.pexels.com/photos/4179489/pexels-photo-4179489.jpeg",
      distance: "40 minutes",
      link: "https://www.antibes-juanlespins.com"
    }
  ];

  const experiences = [
    {
      title: "Activités nautiques",
      items: [
        "Location de yachts",
        "Plongée sous-marine",
        "Paddle et kayak",
        "Jet ski"
      ]
    },
    {
      title: "Culture & Histoire",
      items: [
        "Musées",
        "Sites historiques",
        "Galeries d'art",
        "Concerts"
      ]
    },
    {
      title: "Gastronomie",
      items: [
        "Restaurants étoilés",
        "Marchés locaux",
        "Dégustations de vins",
        "Cours de cuisine"
      ]
    },
    {
      title: "Nature & Sport",
      items: [
        "Randonnées",
        "Golf",
        "Tennis",
        "VTT électrique"
      ]
    }
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
              title="Découvrir"
              subtitle="Explorez les merveilles de la Côte d'Azur depuis Villa Azur."
              centered
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activities.map((activity, index) => (
              <div 
                key={index}
                className="group bg-background border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {activity.distance}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground mb-4">{activity.description}</p>
                  <Button asChild variant="minimal" className="group/button">
                    <Link href={activity.link} target="_blank">
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionTitle
              title="Expériences"
              subtitle="Une multitude d'activités pour rendre votre séjour inoubliable."
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {experiences.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-6 rounded-lg"
                >
                  <h3 className="text-xl mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}