"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Compass, Star, Landmark, Mountain, Building, Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FullscreenVideo } from "@/components/FullscreenVideo";
import { useState } from "react";

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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
      image: "/images/discover/sentier_des_douaniers.png",
      category: t('enjoy.secrets.customsPath.category'),
      difficulty: t('enjoy.secrets.customsPath.difficulty'),
      duration: t('enjoy.secrets.customsPath.duration'),
      bestTime: t('enjoy.secrets.customsPath.bestTime')
    },
    {
      title: t('enjoy.secrets.ezeVillage.title'),
      description: t('enjoy.secrets.ezeVillage.description'),
      image: "/images/discover/eze.png",
      category: t('enjoy.secrets.ezeVillage.category'),
      comments: [
        { icon: Landmark, text: t('enjoy.secrets.ezeVillage.comments.medieval') },
        { icon: Mountain, text: t('enjoy.secrets.ezeVillage.comments.view') }
      ]
    },
    {
      title: t('enjoy.secrets.littleAfrica.title'),
      description: t('enjoy.secrets.littleAfrica.description'),
      image: "/images/discover/petite_afrique.png",
      category: t('enjoy.secrets.littleAfrica.category'),
      difficulty: t('enjoy.secrets.littleAfrica.difficulty'),
      duration: t('enjoy.secrets.littleAfrica.duration'),
      bestTime: t('enjoy.secrets.littleAfrica.bestTime')
    },
    {
      title: t('enjoy.secrets.corbusier.title'),
      description: t('enjoy.secrets.corbusier.description'),
      image: "/images/discover/le_corbusier.png",
      category: t('enjoy.secrets.corbusier.category'),
      difficulty: t('enjoy.secrets.corbusier.difficulty'),
      duration: t('enjoy.secrets.corbusier.duration'),
      bestTime: t('enjoy.secrets.corbusier.bestTime')
    },
    {
      title: t('enjoy.secrets.garnier.title'),
      description: t('enjoy.secrets.garnier.description'),
      image: "/images/discover/opera.png",
      category: t('enjoy.secrets.garnier.category'),
      comments: [
        { icon: Building, text: t('enjoy.secrets.garnier.comments.opera') },
        { icon: Sparkles, text: t('enjoy.secrets.garnier.comments.decor') }
      ]
    },
    {
      title: t('enjoy.secrets.blueGulf.title'),
      description: t('enjoy.secrets.blueGulf.description'),
      image: "/images/discover/golfe_bleu.png",
      category: t('enjoy.secrets.blueGulf.category'),
      bestTime: t('enjoy.secrets.blueGulf.bestTime')
    }
  ];

  const cultureEvents: Article[] = [
    {
      title: "Forum Grimaldi",
      description: "Centre de congrès accueillant le Festival International de la Télévision et d'autres événements exclusifs de la Principauté.",
      image: "/images/discover/grimaldi.png",
      category: "Culture & Événements",
      comments: [
        { icon: Building, text: "Architecture contemporaine" },
        { icon: Star, text: "Événements prestigieux" }
      ]
    },
    {
      title: t('enjoy.events.fortAntoine.title'),
      description: t('enjoy.events.fortAntoine.description'),
      image: "/images/discover/fort_antoine_nuit.png",
      category: t('enjoy.events.fortAntoine.type'),
      bestTime: t('enjoy.events.fortAntoine.date'),
      comments: [
        { icon: Building, text: t('enjoy.events.fortAntoine.comments.theater') },
        { icon: Mountain, text: t('enjoy.events.fortAntoine.comments.view') }
      ]
    },
    {
      title: "Top Marques Monaco",
      description: "Salon de luxe où vous pourrez admirer et même essayer les hypercars, montres et yachts les plus exclusifs au monde.",
      image: "/images/discover/top_marques.png",
      category: "Culture & Événements",
      bestTime: "Juin chaque année",
      comments: [
        { icon: Sparkles, text: "Expérience immersive" }
      ]
    },
    {
      title: "Jumping International de Monte-Carlo",
      description: "Compétition équestre prestigieuse sur le port Hercule attirant les meilleurs cavaliers mondiaux dans un cadre exceptionnel.",
      image: "/images/discover/jumping.png",
      category: "Culture & Événements",
      bestTime: "Juillet chaque année"
    },
    {
      title: "Monaco Yacht Show",
      description: "Le rendez-vous incontournable du yachting de luxe, présentant les plus beaux navires et voiliers d'exception.",
      image: "/images/discover/yatch_show.png",
      category: "Culture & Événements",
      bestTime: "Septembre chaque année",
      comments: [
        { icon: Star, text: "120+ superyachts exposés" }
      ]
    },
    {
      title: "E-Prix de Monaco",
      description: "Course électrisante de Formule E sur le mythique circuit de Monaco, alliant innovation et tradition du sport automobile.",
      image: "/images/discover/e_prix.png",
      category: "Culture & Événements",
      bestTime: "Mai chaque année"
    },
    {
      title: "Concerts au Palais Princier",
      description: "Soirées musicales d'exception dans la cour d'honneur du Palais sous les étoiles monégasques.",
      image: "/images/discover/concert_palais_princier.png",
      category: "Culture & Événements",
      bestTime: "Saison estivale"
    }
  ];

  const sportsLoisirs: Article[] = [
    {
      title: "Rolex Monte-Carlo Masters",
      description: "Prestigieux tournoi de tennis sur terre battue au Monte-Carlo Country Club, avec vue imprenable sur la Méditerranée.",
      image: "/images/discover/newpiscine.JPG",
      category: "Sport & Loisirs",
      bestTime: "Avril chaque année"
    },
    {
      title: "Activités nautiques & sportives",
      description: "Expériences sur-mesure organisées par notre conciergerie : golf, voilier privatisé, plongée ou paddle au lever du soleil.",
      image: "/images/discover/criquecapmartin.jpg",
      category: "Sport & Loisirs",
      difficulty: "Tous niveaux",
      bestTime: "Sur réservation"
    }
  ];

  const naturePaysages: Article[] = [
    {
      title: "Jardin Exotique de Monaco",
      description: "Collection spectaculaire de plantes succulentes avec vue panoramique sur la Principauté et grottes préhistoriques à explorer.",
      image: "/images/discover/jardin_exotique.png",
      category: "Nature & Paysages",
      duration: "1-2 heures",
      bestTime: "Matinée"
    },
    {
      title: "Le Rocher & le Palais Princier",
      description: "Promontoire historique abritant le Palais Princier. Ne manquez pas la relève de la garde des Carabiniers du Prince.",
      image: "/images/discover/palais_princier.png",
      category: "Nature & Paysages",
      bestTime: "Relève de la garde à 11h55"
    },
    {
      title: "La Vallée des Merveilles",
      description: "Site archéologique fascinant avec 40 000+ gravures rupestres datant de l'âge du Bronze, niché dans un paysage alpin grandiose.",
      image: "/images/discover/vallee_des_merveilles.png",
      category: "Nature & Paysages",
      difficulty: "Modérée à difficile",
      duration: "Journée complète",
      bestTime: "Été (juin-septembre)"
    },
    {
      title: "Crique secrète de Monaco",
      description: "Plage confidentielle aux eaux turquoise accessible par un sentier discret ou par la mer, loin de l'agitation.",
      image: "/images/discover/criques_secretes.png",
      category: "Nature & Paysages",
      difficulty: "Facile",
      bestTime: "Début de matinée"
    },
    {
      title: "Les Joyaux de la Riviera",
      description: "Découvrez la Baie de Villefranche, Beaulieu-sur-Mer et les jardins du Cap Martin lors d'une excursion panoramique.",
      image: "/images/discover/baie_villefranche.png",
      category: "Nature & Paysages",
      duration: "Demi-journée",
      bestTime: "Fin d'après-midi"
    }
  ];

  const villagesArtVivre: Article[] = [
    {
      title: "Roquebrune-Cap-Martin",
      description: "Village médiéval authentique avec château du Xe siècle et olivier millénaire, plus vieux spécimen d'Europe.",
      image: "/images/discover/DJI_0017.JPG",
      category: "Villages & Art de Vivre",
      duration: "2 heures",
      bestTime: "Déjeuner dans le village"
    },
    {
      title: "Èze, le nid d'aigle",
      description: "Village perché offrant une vue spectaculaire, avec ruelles pavées, boutiques d'artisans et le célèbre Jardin Exotique.",
      image: "/images/discover/eze.png",
      category: "Villages & Art de Vivre",
      difficulty: "Montée raide",
      bestTime: "Lever de soleil"
    },
    {
      title: "Saint-Paul de Vence",
      description: "Musée à ciel ouvert abritant galeries prestigieuses et la Fondation Maeght. Ne manquez pas La Colombe d'Or et ses œuvres d'art.",
      image: "/images/discover/st_paul_de_vence.png",
      category: "Villages & Art de Vivre",
      duration: "Demi-journée",
      bestTime: "Après-midi"
    },
    {
      title: "Mougins",
      description: "Village pittoresque devenu la Mecque de la gastronomie française, avec restaurants étoilés et ateliers d'artistes.",
      image: "/images/discover/beaulieu.jpg",
      category: "Villages & Art de Vivre",
      bestTime: "Dîner gastronomique"
    },
    {
      title: "Saint-Tropez",
      description: "De votre villa, rejoignez ce village mythique en hélicoptère ou yacht. Flânez sur le port et profitez des plages de Pampelonne.",
      image: "/images/discover/cou.png",
      category: "Villages & Art de Vivre",
      duration: "Journée complète",
      bestTime: "Arrivée par la mer"
    }
  ];

  const premiumExperiences: Article[] = [
    {
      title: "Transferts héliportés",
      description: "Liaison directe avec l'aéroport de Nice en 7 minutes ou excursions panoramiques pour découvrir la Côte d'Azur vue du ciel.",
      image: "/images/discover/DJI_0017.JPG",
      category: "Transferts & Expériences Premium",
      duration: "7min depuis Nice",
      bestTime: "Jour clair"
    },
    {
      title: "Expériences nautiques",
      description: "Croisière privée au coucher du soleil, excursion vers les îles de Lérins ou transfert VIP vers les destinations côtières exclusives.",
      image: "/images/discover/ile_de_lerons.png",
      category: "Transferts & Expériences Premium",
      bestTime: "Crépuscule"
    }
  ];

  const categories = [
    { code: "sport-loisirs", title: t('enjoy.categories.sports'), icon: Star },
    { code: "villages-art-vivre", title: t('enjoy.categories.villages'), icon: Landmark },
    { code: "secrets", title: t('enjoy.categories.secrets'), icon: MapPin },
    { code: "culture-monaco", title: t('enjoy.categories.culture'), icon: Building },
    { code: "nature-paysages", title: t('enjoy.categories.nature'), icon: Mountain },
    { code: "premium-experiences", title: t('enjoy.categories.premium'), icon: Compass }
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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/images/texture-dots.png')] opacity-5 pointer-events-none"></div>
      
      <section className="relative h-screen w-full overflow-hidden p-0 m-0">
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/KC_DhNv3iM4?autoplay=1&mute=1&loop=1&playlist=KC_DhNv3iM4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
              title="Vidéo découvrir"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{
                transform: 'scale(1.2)',
                transformOrigin: 'center center'
              }}
            />
          </div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full h-full flex flex-col justify-center items-start">
            <div className="pl-[15%] md:pl-[10%] w-full max-w-[80%] md:max-w-[60%]">
              <div className="mb-16">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="text-white text-6xl md:text-7xl font-light tracking-wider"
                >
                  L'expérience<br />
                  <span className="font-extralight tracking-wide">ciel et mer</span>
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-[1px] bg-gradient-to-r from-[#BC9A6B] to-[#BC9A6B]/30 mt-8"
                ></motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-6 max-w-xl"
              >
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                  Profitez des hauteurs de la Côte d'Azur, un havre de paix avec vue imprenable sur la Méditerranée.
                </p>
              </motion.div>
              
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
                    <span className="relative z-10 tracking-wider font-medium">Réserver maintenant</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2 font-light">Découvrir plus</span>
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

      <section className="py-16 sm:py-20 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#b7a66b]/5 to-transparent opacity-30 pointer-events-none"></div>
        
        <div className="absolute top-32 left-10 w-64 h-64 bg-[#b7a66b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-64 h-64 bg-[#b7a66b]/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm pt-8 pb-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-4 sm:mb-6 text-gray-900">{t('enjoy.events.title')}</h2>
            <div className="h-1 w-20 bg-[#b7a66b] mx-auto" />
            <p className="text-gray-700 mt-6 max-w-3xl mx-auto text-lg font-light">{t('enjoy.events.description')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto px-2">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(null)}
                  className={`p-2 sm:p-3 rounded-full transition-all duration-300 flex flex-col items-center justify-center w-[120px] sm:w-[130px] h-14 sm:h-16 ${
                    activeCategory === null
                      ? "bg-[#b7a66b] text-white shadow-lg shadow-[#b7a66b]/30"
                      : "bg-white text-gray-700 hover:bg-[#b7a66b]/80 hover:text-white border border-gray-200 shadow-sm"
                  }`}
                >
                  <Star className={`h-4 sm:h-5 w-4 sm:w-5 mb-1 ${activeCategory === null ? "text-white" : "text-[#b7a66b]"}`} />
                  <span className="text-xs font-medium">{t('enjoy.events.allPlaces')}</span>
                </motion.button>
                
                {categories.slice(0, 3).map((category, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCategory(category.code)}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 flex flex-col items-center justify-center w-[120px] sm:w-[130px] h-14 sm:h-16 ${
                      activeCategory === category.code
                        ? "bg-[#b7a66b] text-white shadow-lg shadow-[#b7a66b]/30"
                        : "bg-white text-gray-700 hover:bg-[#b7a66b]/80 hover:text-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-medium">{category.title}</span>
                  </motion.button>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-2 md:mt-3">
                {categories.slice(3).map((category, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCategory(category.code)}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 flex flex-col items-center justify-center w-[120px] sm:w-[130px] h-14 sm:h-16 ${
                      activeCategory === category.code
                        ? "bg-[#b7a66b] text-white shadow-lg shadow-[#b7a66b]/30"
                        : "bg-white text-gray-700 hover:bg-[#b7a66b]/80 hover:text-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-medium">{category.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {activeCategory && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="inline-block px-6 py-2 bg-white rounded-full text-gray-700 text-sm border border-gray-200 shadow-sm">
                {t('enjoy.filters.placesCount', { count: filteredArticles.length })}
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl bg-white border border-gray-200"
              >
                <div className="relative h-48 xs:h-56 sm:h-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority={true}
                    className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-xl"
                  />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 px-2 xs:px-3 sm:px-4 py-1 xs:py-2 rounded-full text-xs xs:text-sm font-medium shadow-md transform transition-all duration-300 group-hover:scale-105">
                    {categories.find(cat => cat.code === article.category)?.title}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-display mb-1 text-white drop-shadow-md">{article.title}</h3>
                    <div className="h-0.5 w-12 bg-[#b7a66b] mt-2 mb-2 transform origin-left transition-all duration-300 group-hover:w-24"></div>
                  </div>
                </div>
                
                <div className="p-4 xs:p-5 sm:p-6 bg-white rounded-b-xl">
                  <p className="text-sm xs:text-base text-gray-700 mb-4 sm:mb-6 font-light leading-relaxed">{article.description}</p>
                  
                  <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 text-gray-600">
                    {article.difficulty && (
                      <div className="flex items-center text-xs sm:text-sm group-hover:text-gray-900 transition-colors duration-300">
                        <Mountain className="mr-2 sm:mr-3 h-3 sm:h-4 w-3 sm:w-4 text-[#b7a66b]" />
                        <span className="tracking-wide">{article.difficulty}</span>
                      </div>
                    )}
                    {article.duration && (
                      <div className="flex items-center text-xs sm:text-sm group-hover:text-gray-900 transition-colors duration-300">
                        <Clock className="mr-2 sm:mr-3 h-3 sm:h-4 w-3 sm:w-4 text-[#b7a66b]" />
                        <span className="tracking-wide">{article.duration}</span>
                      </div>
                    )}
                    {article.bestTime && (
                      <div className="flex items-center text-xs sm:text-sm group-hover:text-gray-900 transition-colors duration-300">
                        <Calendar className="mr-2 sm:mr-3 h-3 sm:h-4 w-3 sm:w-4 text-[#b7a66b]" />
                        <span className="tracking-wide">{article.bestTime}</span>
                      </div>
                    )}
                    {article.comments && article.comments.map((comment, i) => (
                      <div key={i} className="flex items-center text-xs sm:text-sm group-hover:text-gray-900 transition-colors duration-300">
                        <comment.icon className="mr-2 sm:mr-3 h-3 sm:h-4 w-3 sm:w-4 text-[#b7a66b]" />
                        <span className="tracking-wide">{comment.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center text-[#b7a66b] text-xs sm:text-sm font-medium cursor-pointer group-hover:translate-x-1 transition-transform duration-300">
                      <span>{t('enjoy.filters.learnMore')}</span>
                      <ArrowRight className="ml-2 h-3 sm:h-4 w-3 sm:w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden bg-gray-50">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#b7a66b]/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[#b7a66b]/10 blur-3xl"></div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="w-20 h-20 text-[#b7a66b]/40 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/>
                </svg>
              </div>
            </motion.div>
            
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-light italic mb-8"
            >
              {t('quote.text')}
            </motion.blockquote>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="w-10 h-0.5 bg-[#b7a66b] mr-4"></div>
              <span className="text-gray-500 uppercase tracking-widest text-sm">{t('quote.author')}</span>
              <div className="w-10 h-0.5 bg-[#b7a66b] ml-4"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/discover/luxury-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-[#b7a66b]/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-[#b7a66b]" />
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-900 leading-tight"
            >
              {t('cta.title')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-700 text-lg mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t('cta.description')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-[#b7a66b] rounded-lg hover:bg-[#b7a66b]/90 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                {t('cta.bookNow')}
              </Link>
              
              <Link
                href="/galerie"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-[#b7a66b] border-2 border-[#b7a66b] rounded-lg hover:bg-[#b7a66b]/10 transition-all duration-300 ease-in-out"
              >
                {t('cta.exploreGallery')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}