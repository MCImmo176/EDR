"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Compass, Star, Landmark, Mountain, Building, Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import SnakeRectangleAnimation from "../../../src/components/SnakeRectangleAnimation";

export default function DecouvrirPage() {
  const t = useTranslations("discover");

  const unmissableEvents = [
    {
      title: "Grand Prix de Monaco 2025",
      description: "Vivez la course mythique dans les rues de la Principauté. Une expérience unique mêlant adrénaline, luxe et prestige.",
      image: "/images/discover/F1Monaco.jpg",
      date: "22-25 Mai 2025",
      category: "Événement Sportif",
      link: "https://www.formula1.com/monaco"
    },
    {
      title: "Casino de Monte-Carlo",
      description: "Chef-d'œuvre architectural Belle Époque et temple du jeu de prestige, le Casino de Monte-Carlo est une expérience incontournable.",
      image: "/images/discover/Casio.jpg",
      category: "Jeux de hasard",
      schedule: "14h - 4h",
      link: "https://www.montecarlosbm.com"
    },
    {
      title: "Musée Océanographique",
      description: "Découvrez les merveilles des océans dans ce musée centenaire surplombant la Méditerranée.",
      image: "/images/discover/musee.jpg",
      category: "Culture",
      schedule: "10h - 18h",
      link: "https://www.oceano.mc"
    },
    {
      title: "Rallye Monte-Carlo Historique",
      description: "Un voyage dans le temps avec les plus belles voitures de collection sur les routes légendaires de Monaco.",
      image: "/images/discover/rallyhistorique.jpg",
      date: "31 Jan - 5 Fév 2025",
      category: "Sport Automobile",
      link: "https://acm.mc"
    }
  ];

  const insiderSecrets = [
    {
      title: "Sentier des Douaniers",
      description: "Découvrez la partie cachée du Cap Martin, entre la Pointe du Cap et la Villa E-1027. Un parcours sauvage ponctué de criques secrètes idéales pour la baignade.",
      image: "/images/discover/sentierdouaniers.jpg",
      category: "Randonnée",
      difficulty: "Modérée",
      duration: "2-3h",
      bestTime: "Lever du soleil"
    },
    {
      title: "Visiter le village d'Èze",
      description: "Parcourez les ruelles pittoresques d'Èze, village médiéval perché avec une vue imprenable sur la Méditerranée.",
      image: "/images/discover/eze.jpg",
      category: "Découverte",
      comments: [
        { icon: Landmark, text: "Village médiéval" },
        { icon: Mountain, text: "Vue panoramique sur la Méditerranée" }
      ]
    },
    {
      title: "Vallon de la Petite Afrique",
      description: "Une jungle méditerranéenne secrète nichée à Beaulieu-sur-Mer. Sentiers ombragés et vue imprenable sur la mer, loin des circuits touristiques.",
      image: "/images/discover/beaulieu.jpg",
      category: "Nature",
      difficulty: "Facile",
      duration: "1h",
      bestTime: "Matinée"
    },
    {
      title: "Rocher du Corbusier",
      description: "Un lieu de méditation privilégié surplombant la mer, accessible par un sentier discret. Un spot paisible connu des seuls initiés.",
      image: "/images/discover/sentierlecorbusier.jpg",
      category: "Point de vue",
      difficulty: "Facile",
      duration: "30min",
      bestTime: "Coucher du soleil"
    },
    {
      title: "Salle Garnier",
      description: "L'opéra de Monaco, un joyau architectural caché dans le Casino. Une salle intimiste aux dorures somptueuses, souvent méconnue des visiteurs.",
      image: "/images/discover/theatre.jpg",
      category: "Culture",
      schedule: "Visites guidées sur réservation",
      comments: [
        { icon: Building, text: "Opéra Belle Époque" },
        { icon: Sparkles, text: "Décor somptueux" }
      ]
    },
    {
      title: "Plage du Golfe Bleu",
      description: "Une plage préservée entre Monaco et Cap-Martin, idéale pour échapper à la foule. Un spot parfait pour les couchers de soleil.",
      image: "/images/discover/plageroquebrune.jpg",
      category: "Plage",
      bestTime: "Coucher du soleil"
    }
  ];

  return (
    <>
      <section className="relative h-screen w-screen overflow-hidden p-0 m-0">
        <iframe
          src="https://www.youtube.com/embed/KC_DhNv3iM4?autoplay=1&mute=1&loop=1&playlist=KC_DhNv3iM4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
          title="Vidéo découvrir villa"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full">
            <SnakeRectangleAnimation 
              textLine1="Profitez de"
              textLine2="Notre localisation"
            />
          </div>
        </div>
      </section>

      {/* Section Événements à ne pas manquer - Redesigned */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-display mb-6">Événements à ne pas manquer</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {unmissableEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-[400px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium">
                    {event.category}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-display mb-4">{event.title}</h3>
                    {/* <p className="text-lg text-white/80 mb-6">{event.description}</p> */}
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      {event.date && (
                        <div className="flex items-center text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date}
                        </div>
                      )}
                      {event.schedule && (
                        <div className="flex items-center text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.schedule}
                        </div>
                      )}
                    </div>

                    <Button
                      asChild
                      className="relative overflow-hidden group/btn bg-white text-black hover:text-white border-2 border-white transition-all duration-500"
                    >
                      <Link href={event.link} target="_blank">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
                        <div className="absolute inset-0 bg-black transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-display mb-6">Secrets d'Initiés</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insiderSecrets.map((secret, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-96">
                  <Image
                    src={secret.image}
                    alt={secret.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium">
                    {secret.category}
                  </div>
                </div>
                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-display mb-4">{secret.title}</h3>
                  <p className="text-muted-foreground mb-6">{secret.description}</p>
                  <div className="space-y-3">
                    {secret.difficulty && (
                      <div className="flex items-center text-sm">
                        <Compass className="h-5 w-5 mr-2 text-primary" />
                        <span>Difficulté : {secret.difficulty}</span>
                      </div>
                    )}
                    {secret.duration && (
                      <div className="flex items-center text-sm">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <span>Durée : {secret.duration}</span>
                      </div>
                    )}
                    {secret.bestTime && (
                      <div className="flex items-center text-sm">
                        <Star className="h-5 w-5 mr-2 text-primary" />
                        <span>Meilleur moment : {secret.bestTime}</span>
                      </div>
                    )}
                    {secret.comments && secret.comments.map((comment, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <comment.icon className="mr-2 h-5 w-5 text-primary" />
                        <span>{comment.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}