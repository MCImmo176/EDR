"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Compass, Star, Landmark, Mountain, Building, Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import SnakeRectangleAnimation from "../../../src/components/SnakeRectangleAnimation";
import { useRef, useEffect } from "react";

export default function DecouvrirPage() {
  const t = useTranslations("discover");
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

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

      <section className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-display mb-6">{t('enjoy.events.title')}</h2>
            <div className="h-1 w-20 bg-[#b7a66b] mx-auto" />
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
                      className="relative overflow-hidden group/btn bg-white text-[#b7a66b] hover:text-white border-2 border-white transition-all duration-500"
                    >
                      <Link href={event.link} target="_blank">
                        {t('enjoy.events.monacoGP.learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
                        <div className="absolute inset-0 bg-[#b7a66b] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
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
            <h2 className="text-5xl font-display mb-6">{t('enjoy.secrets.title')}</h2>
            <div className="h-1 w-20 bg-[#b7a66b] mx-auto" />
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
                        <Compass className="h-5 w-5 mr-2 text-[#b7a66b]" />
                        <span>{secret.difficulty}</span>
                      </div>
                    )}
                    {secret.duration && (
                      <div className="flex items-center text-sm">
                        <Clock className="h-5 w-5 mr-2 text-[#b7a66b]" />
                        <span>{secret.duration}</span>
                      </div>
                    )}
                    {secret.bestTime && (
                      <div className="flex items-center text-sm">
                        <Star className="h-5 w-5 mr-2 text-[#b7a66b]" />
                        <span>{secret.bestTime}</span>
                      </div>
                    )}
                    {secret.comments && secret.comments.map((comment, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <comment.icon className="mr-2 h-5 w-5 text-[#b7a66b]" />
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