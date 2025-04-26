"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Compass, Star } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DecouvrirPage() {
  const t = useTranslations("discover");

  const unmissableEvents = [
    {
      title: "Grand Prix de Monaco 2025",
      description: "Vivez la course mythique dans les rues de la Principauté. Une expérience unique mêlant adrénaline, luxe et prestige.",
      image: "https://images.pexels.com/photos/12718068/pexels-photo-12718068.jpeg",
      date: "22-25 Mai 2025",
      category: "Événement Sportif",
      link: "https://www.formula1.com/monaco"
    },
    {
      title: "Casino de Monte-Carlo",
      description: "Chef-d'œuvre architectural Belle Époque et temple du jeu de prestige, le Casino de Monte-Carlo est une expérience incontournable.",
      image: "https://images.pexels.com/photos/5087174/pexels-photo-5087174.jpeg",
      category: "Culture & Histoire",
      schedule: "14h - 4h",
      link: "https://www.montecarlosbm.com"
    },
    {
      title: "Musée Océanographique",
      description: "Découvrez les merveilles des océans dans ce musée centenaire surplombant la Méditerranée.",
      image: "https://images.pexels.com/photos/2122926/pexels-photo-2122926.jpeg",
      category: "Culture",
      schedule: "10h - 18h",
      link: "https://www.oceano.mc"
    },
    {
      title: "Rallye Monte-Carlo Historique",
      description: "Un voyage dans le temps avec les plus belles voitures de collection sur les routes légendaires de Monaco.",
      image: "https://images.pexels.com/photos/12165038/pexels-photo-12165038.jpeg",
      date: "31 Jan - 5 Fév 2025",
      category: "Sport Automobile",
      link: "https://acm.mc"
    }
  ];

  const insiderSecrets = [
    {
      title: "Sentier des Douaniers",
      description: "Découvrez la partie cachée du Cap Martin, entre la Pointe du Cap et la Villa E-1027. Un parcours sauvage ponctué de criques secrètes idéales pour la baignade.",
      image: "https://images.pexels.com/photos/4319752/pexels-photo-4319752.jpeg",
      category: "Randonnée",
      difficulty: "Modérée",
      duration: "2-3h",
      bestTime: "Lever du soleil"
    },
    {
      title: "Vallon de la Petite Afrique",
      description: "Une jungle méditerranéenne secrète nichée entre les falaises de Beausoleil. Sentiers ombragés et vue imprenable sur la mer, loin des circuits touristiques.",
      image: "https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg",
      category: "Nature",
      difficulty: "Facile",
      duration: "1h",
      bestTime: "Matinée"
    },
    {
      title: "Rocher du Corbusier",
      description: "Un lieu de méditation privilégié surplombant la mer, accessible par un sentier discret. Un spot paisible connu des seuls initiés.",
      image: "https://images.pexels.com/photos/1751482/pexels-photo-1751482.jpeg",
      category: "Point de vue",
      difficulty: "Facile",
      duration: "30min",
      bestTime: "Coucher du soleil"
    },
    {
      title: "Salle Garnier",
      description: "L'opéra de Monaco, un joyau architectural caché dans le Casino. Une salle intimiste aux dorures somptueuses, souvent méconnue des visiteurs.",
      image: "https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg",
      category: "Culture",
      schedule: "Visites guidées sur réservation"
    },
    {
      title: "Plage du Golfe Bleu",
      description: "Une plage préservée entre Monaco et Cap-Martin, idéale pour échapper à la foule. Un spot parfait pour les couchers de soleil.",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
      category: "Plage",
      bestTime: "Coucher du soleil"
    },
    {
      title: "Crique de Cap Martin",
      description: "Entre la Plage du Buse et la Villa E-1027, découvrez des criques sauvages accessibles par des sentiers discrets. Le secret le mieux gardé de la côte.",
      image: "https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg",
      category: "Baignade",
      bestTime: "Matin tôt"
    }
  ];

  return (
    <>
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg"
          alt="Monaco vue panoramique"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-4">
              Découvrez Monaco & Roquebrune
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Entre événements prestigieux et secrets bien gardés
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-display mb-6">Événements à ne pas manquer</h2>
            <div className="h-1 w-20 bg-primary" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {unmissableEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {event.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display mb-4">{event.title}</h3>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  {event.date && (
                    <div className="flex items-center text-sm mb-4">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      {event.date}
                    </div>
                  )}
                  {event.schedule && (
                    <div className="flex items-center text-sm mb-4">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      {event.schedule}
                    </div>
                  )}
                  <Button asChild variant="default" className="mt-2">
                    <Link href={event.link} target="_blank">
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl mb-16">
              <h2 className="text-4xl font-display mb-6">Secrets d'Initiés</h2>
              <div className="h-1 w-20 bg-primary mb-6" />
              <p className="text-lg text-muted-foreground">
                Découvrez les trésors cachés de Monaco et Roquebrune, loin des sentiers battus.
                Des spots confidentiels pour vivre des expériences authentiques.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insiderSecrets.map((secret, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
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
                <div className="p-8">
                  <h3 className="text-xl font-display mb-4">{secret.title}</h3>
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