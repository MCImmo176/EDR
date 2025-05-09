"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Compass, Star, Landmark, Mountain, Building, Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import SnakeRectangleAnimation from "../../../src/components/SnakeRectangleAnimation";
import { useRef, useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty?: string;
  duration?: string;
  bestTime?: string;
  comments?: Array<{
    icon: any;
    text: string;
  }>;
}

export default function DecouvrirPage() {
  const t = useTranslations("discover");
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const adjustVideoSize = () => {
    if (!videoContainerRef.current || !videoRef.current) return;

    const container = videoContainerRef.current;
    const video = videoRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const containerRatio = containerWidth / containerHeight;
    const videoRatio = 16 / 9;

    if (containerRatio > videoRatio) {
      const newHeight = containerWidth / videoRatio;
      video.style.width = '100%';
      video.style.height = `${newHeight}px`;
      video.style.left = '0';
      video.style.top = `${(containerHeight - newHeight) / 2}px`;
    } else {
      const newWidth = containerHeight * videoRatio;
      video.style.width = `${newWidth}px`;
      video.style.height = '100%';
      video.style.left = `${(containerWidth - newWidth) / 2}px`;
      video.style.top = '0';
    }
  };

  useEffect(() => {
    adjustVideoSize();
    window.addEventListener('resize', adjustVideoSize);
    return () => window.removeEventListener('resize', adjustVideoSize);
  }, []);

  const unmissableEvents = [
    {
      title: t('enjoy.events.monacoGP.title'),
      description: t('enjoy.events.monacoGP.description'),
      image: "/images/discover/F1Monaco.jpg",
      date: t('enjoy.events.monacoGP.date'),
      category: t('enjoy.events.monacoGP.type'),
      link: "https://www.formula1.com/monaco"
    },
    {
      title: t('enjoy.events.casino.title'),
      description: t('enjoy.events.casino.description'),
      image: "/images/discover/Casio.jpg",
      category: t('enjoy.events.casino.type'),
      schedule: t('enjoy.events.casino.hours'),
      link: "https://www.montecarlosbm.com"
    },
    {
      title: t('enjoy.events.oceanographic.title'),
      description: t('enjoy.events.oceanographic.description'),
      image: "/images/discover/musee.jpg",
      category: t('enjoy.events.oceanographic.type'),
      schedule: t('enjoy.events.oceanographic.hours'),
      link: "https://www.oceano.mc"
    },
    {
      title: t('enjoy.events.rally.title'),
      description: t('enjoy.events.rally.description'),
      image: "/images/discover/rallyhistorique.jpg",
      date: t('enjoy.events.rally.date'),
      category: t('enjoy.events.rally.type'),
      link: "https://acm.mc"
    }
  ];

  const insiderSecrets = [
    {
      title: t('enjoy.secrets.customsPath.title'),
      description: t('enjoy.secrets.customsPath.description'),
      image: "/images/discover/sentierdouaniers.jpg",
      category: t('enjoy.secrets.customsPath.category'),
      difficulty: t('enjoy.secrets.customsPath.difficulty'),
      duration: t('enjoy.secrets.customsPath.duration'),
      bestTime: t('enjoy.secrets.customsPath.bestTime')
    },
    {
      title: t('enjoy.secrets.ezeVillage.title'),
      description: t('enjoy.secrets.ezeVillage.description'),
      image: "/images/discover/eze.jpg",
      category: t('enjoy.secrets.ezeVillage.category'),
      comments: [
        { icon: Landmark, text: t('enjoy.secrets.ezeVillage.comments.medieval') },
        { icon: Mountain, text: t('enjoy.secrets.ezeVillage.comments.view') }
      ]
    },
    {
      title: t('enjoy.secrets.littleAfrica.title'),
      description: t('enjoy.secrets.littleAfrica.description'),
      image: "/images/discover/beaulieu.jpg",
      category: t('enjoy.secrets.littleAfrica.category'),
      difficulty: t('enjoy.secrets.littleAfrica.difficulty'),
      duration: t('enjoy.secrets.littleAfrica.duration'),
      bestTime: t('enjoy.secrets.littleAfrica.bestTime')
    },
    {
      title: t('enjoy.secrets.corbusier.title'),
      description: t('enjoy.secrets.corbusier.description'),
      image: "/images/discover/sentierlecorbusier.jpg",
      category: t('enjoy.secrets.corbusier.category'),
      difficulty: t('enjoy.secrets.corbusier.difficulty'),
      duration: t('enjoy.secrets.corbusier.duration'),
      bestTime: t('enjoy.secrets.corbusier.bestTime')
    },
    {
      title: t('enjoy.secrets.garnier.title'),
      description: t('enjoy.secrets.garnier.description'),
      image: "/images/discover/theatre.jpg",
      category: t('enjoy.secrets.garnier.category'),
      comments: [
        { icon: Building, text: t('enjoy.secrets.garnier.comments.opera') },
        { icon: Sparkles, text: t('enjoy.secrets.garnier.comments.decor') }
      ]
    },
    {
      title: t('enjoy.secrets.blueGulf.title'),
      description: t('enjoy.secrets.blueGulf.description'),
      image: "/images/discover/plageroquebrune.jpg",
      category: t('enjoy.secrets.blueGulf.category'),
      bestTime: t('enjoy.secrets.blueGulf.bestTime')
    }
  ];

  const cultureEvents: Article[] = [
    {
      title: "Forum Grimaldi",
      description: "Centre de congrès prestigieux accueillant de nombreux événements internationaux, comme le Festival International de la Télévision de Monte-Carlo.",
      image: "/images/discover/forum-grimaldi.jpg",
      category: "Culture & Événements"
    },
    {
      title: "Top Marques Monaco",
      description: "Salon de luxe dédié aux supercars, montres, yachts et innovations technologiques.",
      image: "/images/discover/top-marques.jpg",
      category: "Culture & Événements"
    },
    {
      title: "Jumping International de Monte-Carlo",
      description: "Compétition équestre de haut niveau sur le port Hercule.",
      image: "/images/discover/jumping.jpg",
      category: "Culture & Événements"
    },
    {
      title: "Monaco Yacht Show & Monaco Classic Week",
      description: "En partenariat avec le Yacht Club de Monaco, découvrez les plus beaux yachts modernes et voiliers d'époque.",
      image: "/images/discover/yacht-show.jpg",
      category: "Culture & Événements"
    },
    {
      title: "E-Prix de Monaco",
      description: "Grand Prix de Formule E dans les rues de la principauté.",
      image: "/images/discover/e-prix.jpg",
      category: "Culture & Événements"
    },
    {
      title: "Concerts au Palais Princier",
      description: "Soirées classiques dans la cour d'honneur du Palais, en été.",
      image: "/images/discover/palais-concerts.jpg",
      category: "Culture & Événements"
    }
  ];

  const sportsLoisirs: Article[] = [
    {
      title: "Rolex Monte-Carlo Masters",
      description: "Tournoi international de tennis sur terre battue, à deux pas de votre villa.",
      image: "/images/discover/tennis.jpg",
      category: "Sport & Loisirs"
    },
    {
      title: "Golf, voile, plongée, paddle",
      description: "Activités sur demande, avec partenaires locaux.",
      image: "/images/discover/activites.jpg",
      category: "Sport & Loisirs"
    }
  ];

  const naturePaysages: Article[] = [
    {
      title: "Jardin Exotique de Monaco",
      description: "Collection botanique spectaculaire suspendue au-dessus de la mer.",
      image: "/images/discover/jardin-exotique.jpg",
      category: "Nature & Paysages"
    },
    {
      title: "Le Rocher & le Palais Princier",
      description: "Visite historique et relève de la garde.",
      image: "/images/discover/rocher.jpg",
      category: "Nature & Paysages"
    },
    {
      title: "La Vallée des Merveilles",
      description: "Randonnée dans l'arrière-pays avec gravures rupestres.",
      image: "/images/discover/vallee-merveilles.jpg",
      category: "Nature & Paysages"
    },
    {
      title: "Crique secrète de Monaco",
      description: "Petite plage confidentielle pour une baignade discrète.",
      image: "/images/discover/crique.jpg",
      category: "Nature & Paysages"
    },
    {
      title: "Baie de Villefranche, Beaulieu & Cap Martin",
      description: "Panorama méditerranéen d'exception.",
      image: "/images/discover/baie.jpg",
      category: "Nature & Paysages"
    }
  ];

  const villagesArtVivre: Article[] = [
    {
      title: "Vieux Village de Roquebrune-Cap-Martin",
      description: "Rues médiévales et olivier millénaire.",
      image: "/images/discover/roquebrune.jpg",
      category: "Villages & Art de Vivre"
    },
    {
      title: "Èze",
      description: "Village perché avec jardins exotiques et vue vertigineuse.",
      image: "/images/discover/eze.jpg",
      category: "Villages & Art de Vivre"
    },
    {
      title: "Saint-Paul de Vence",
      description: "Haut lieu artistique, galeries et Fondation Maeght.",
      image: "/images/discover/saint-paul.jpg",
      category: "Villages & Art de Vivre"
    },
    {
      title: "Mougins",
      description: "Village de charme, connu pour ses restaurants et ses artistes.",
      image: "/images/discover/mougins.jpg",
      category: "Villages & Art de Vivre"
    },
    {
      title: "Saint-Tropez",
      description: "Accessible en hélicoptère, yacht privé ou voiture avec chauffeur.",
      image: "/images/discover/saint-tropez.jpg",
      category: "Villages & Art de Vivre"
    }
  ];

  const premiumExperiences: Article[] = [
    {
      title: "Héliport de Monaco",
      description: "Liaison directe depuis l'aéroport de Nice (7 min de vol).",
      image: "/images/discover/helicoptere.jpg",
      category: "Transferts & Expériences Premium"
    },
    {
      title: "Croisières privées & transferts VIP",
      description: "Croisières privées, transferts VIP, guides culturels & conciergerie sur-mesure disponibles.",
      image: "/images/discover/croisiere.jpg",
      category: "Transferts & Expériences Premium"
    }
  ];

  const categories = [
    { code: "culture-monaco", title: "🎭 Culture & Événements à Monaco" },
    { code: "sport-loisirs", title: "🎾 Sport & Loisirs" },
    { code: "nature-paysages", title: "🏞 Excursions Nature & Paysages" },
    { code: "villages-art-vivre", title: "🏘 Villages & Art de Vivre" },
    { code: "premium-experiences", title: "✈ Transferts & Expériences Premium" },
    { code: "secrets", title: "🔍 Secrets d'Initiés" }
  ];

  const allArticles = [
    ...cultureEvents.map(event => ({ ...event, category: "culture-monaco" })),
    ...sportsLoisirs.map(event => ({ ...event, category: "sport-loisirs" })),
    ...naturePaysages.map(event => ({ ...event, category: "nature-paysages" })),
    ...villagesArtVivre.map(event => ({ ...event, category: "villages-art-vivre" })),
    ...premiumExperiences.map(event => ({ ...event, category: "premium-experiences" })),
    ...insiderSecrets.map(event => ({ ...event, category: "secrets" }))
  ];

  const filteredArticles = activeCategory === null
    ? allArticles
    : allArticles.filter(article => article.category === activeCategory);

  const renderSection = (title: string, items: any[], icon: any) => (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-4 sm:mb-6">{title}</h2>
          <div className="h-1 w-20 bg-[#b7a66b] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 sm:h-96">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-3 sm:px-4 py-2 rounded-full text-sm font-medium">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6 sm:p-8 bg-white">
                <h3 className="text-xl sm:text-2xl font-display mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden p-0 m-0">
        <div 
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/KC_DhNv3iM4?autoplay=1&mute=1&loop=1&playlist=KC_DhNv3iM4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
            title="Vidéo découvrir villa"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute object-cover"
            style={{
              filter: 'brightness(100%)',
              border: 'none'
            }}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-full h-full">
            <SnakeRectangleAnimation 
              textKey="discover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-4 sm:mb-6">{t('enjoy.events.title')}</h2>
            <div className="h-1 w-20 bg-[#b7a66b] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base ${
                activeCategory === null
                  ? "bg-[#b7a66b] text-white"
                  : "bg-muted hover:bg-[#b7a66b] hover:text-white"
              }`}
            >
              Tous
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category.code)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base ${
                  activeCategory === category.code
                    ? "bg-[#b7a66b] text-white"
                    : "bg-muted hover:bg-[#b7a66b] hover:text-white"
                }`}
              >
                {category.title}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-64 sm:h-96">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-3 sm:px-4 py-2 rounded-full text-sm font-medium">
                    {categories.find(cat => cat.code === article.category)?.title}
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 bg-white">
                  <h3 className="text-xl sm:text-2xl font-display mb-3 sm:mb-4">{article.title}</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6">{article.description}</p>
                  {article.difficulty && (
                    <div className="flex items-center text-sm">
                      <Compass className="h-5 w-5 mr-2 text-[#b7a66b]" />
                      <span>{article.difficulty}</span>
                    </div>
                  )}
                  {article.duration && (
                    <div className="flex items-center text-sm">
                      <Clock className="h-5 w-5 mr-2 text-[#b7a66b]" />
                      <span>{article.duration}</span>
                    </div>
                  )}
                  {article.bestTime && (
                    <div className="flex items-center text-sm">
                      <Star className="h-5 w-5 mr-2 text-[#b7a66b]" />
                      <span>{article.bestTime}</span>
                    </div>
                  )}
                  {article.comments && article.comments.map((comment, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <comment.icon className="mr-2 h-5 w-5 text-[#b7a66b]" />
                      <span>{comment.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}