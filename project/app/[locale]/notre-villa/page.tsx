"use client";

import { useState, useEffect } from "react";
import { FullscreenVideo } from "@/components/FullscreenVideo";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotreVillaPage() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('villa');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden p-0 m-0">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
            title="Vidéo notre villa"
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

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-[5]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-[5]"></div>
        
        {/* Hero Content */}
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
                  {t('hero.title')}
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
                  {t('hero.description')}
                </p>
                <div className="flex space-x-4 mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/50 rounded-full px-8 py-6 text-lg transition-all duration-500"
                  >
                    <Link href="/contact">
                      {t('hero.bookNow')}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg"
                    variant="outline"
                    className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 rounded-full px-8 py-6 text-lg transition-all duration-500"
                  >
                    <Link href="#discover">
                      {t('hero.discoverMore')}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2 font-light">{t('hero.scrollDown')}</span>
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

      {/* Espaces conçus pour inspirer */}
      <section id="discover" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-light mb-6">{t('spaces.title')}</h2>
            <p className="text-lg text-gray-700">{t('spaces.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3">{t('spaces.livingRoom.title')}</h3>
              <p className="text-gray-600">{t('spaces.livingRoom.description')}</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3">{t('spaces.pool.title')}</h3>
              <p className="text-gray-600">{t('spaces.pool.description')}</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3">{t('spaces.suites.title')}</h3>
              <p className="text-gray-600">{t('spaces.suites.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intimité, Harmonie, Bien-être */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="p-6">
              <h3 className="text-2xl font-light mb-4">{t('features.privacy.title')}</h3>
              <p className="text-gray-600">{t('features.privacy.description')}</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-light mb-4">{t('features.harmony.title')}</h3>
              <p className="text-gray-600">{t('features.harmony.description')}</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-light mb-4">{t('features.wellness.title')}</h3>
              <p className="text-gray-600">{t('features.wellness.description')}</p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-center mt-16">
            <p className="text-lg text-gray-700 italic">{t('features.artOfLiving')}</p>
            <p className="text-lg font-light text-[#b7a66b] mt-6">{t('features.signature')}</p>
          </div>
        </div>
      </section>

      {/* Riviera française */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light mb-6">{t('location.title')}</h2>
            <p className="text-lg text-gray-700 mb-12">{t('location.description')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-xl font-medium mb-6">{t('location.distances.title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.distances.monaco.name')} :</span>
                    <span className="ml-2">{t('location.distances.monaco.time')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.distances.nice.name')} :</span>
                    <span className="ml-2">{t('location.distances.nice.time')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.distances.airport.name')} :</span>
                    <span className="ml-2">{t('location.distances.airport.time')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.distances.cannes.name')} :</span>
                    <span className="ml-2">{t('location.distances.cannes.time')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-6">{t('location.nearby.title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.nearby.beaches.name')} :</span>
                    <span className="ml-2">{t('location.nearby.beaches.time')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.nearby.golf.name')} :</span>
                    <span className="ml-2">{t('location.nearby.golf.time')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.nearby.italy.name')} :</span>
                    <span className="ml-2">{t('location.nearby.italy.time')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium">{t('location.nearby.saintTropez.name')} :</span>
                    <span className="ml-2">{t('location.nearby.saintTropez.time')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-[#b7a66b] text-white hover:bg-[#a08c4a] rounded-full mt-auto">
                <Link href="/decouverte" className="flex items-center gap-2">
                  {t('location.exploreButton')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services sur mesure */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light mb-6">{t('services.title')}</h2>
            <p className="text-lg text-gray-700 mb-12">{t('services.description')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <ul className="space-y-6">
                  <li>
                    <p className="text-lg">{t('services.welcome')}</p>
                  </li>
                  <li>
                    <p className="text-lg">{t('services.concierge')}</p>
                  </li>
                  <li>
                    <p className="text-lg">{t('services.chef')}</p>
                  </li>
                  <li>
                    <p className="text-lg">{t('services.excursions')}</p>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Button asChild size="lg" className="bg-[#b7a66b] text-white hover:bg-[#a08c4a] rounded-full">
                  <Link href="/contact" className="flex items-center gap-2">
                    {t('services.customizeButton')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center">{t('property.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-xl font-medium mb-6">{t('property.location.title')}</h3>
                <ul className="space-y-3">
                  <li>{t('property.location.monaco')}</li>
                  <li>{t('property.location.airport')}</li>
                  <li>{t('property.location.cannes')}</li>
                  <li>{t('property.location.italy')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-6">{t('property.livingSpace.title')}</h3>
                <ul className="space-y-3">
                  <li>{t('property.livingSpace.livingRoom')}</li>
                  <li>{t('property.livingSpace.diningRoom')}</li>
                  <li>{t('property.livingSpace.bar')}</li>
                  <li>{t('property.livingSpace.kitchen')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-6">{t('property.suites.title')}</h3>
                <ul className="space-y-3">
                  <li>{t('property.suites.count')}</li>
                  <li>{t('property.suites.terraces')}</li>
                  <li>{t('property.suites.bedding')}</li>
                  <li>{t('property.suites.dressing')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-6">{t('property.exterior.title')}</h3>
                <ul className="space-y-3">
                  <li>{t('property.exterior.pool')}</li>
                  <li>{t('property.exterior.poolhouse')}</li>
                  <li>{t('property.exterior.garden')}</li>
                  <li>{t('property.exterior.terraces')}</li>
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-medium mb-6">{t('property.technical.title')}</h3>
              <p className="text-lg text-gray-700 mb-8">{t('property.technical.description')}</p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div className="p-4">
                  <p className="font-medium">{t('property.capacity.people')}</p>
                </div>
                <div className="p-4">
                  <p className="font-medium">{t('property.capacity.pool')}</p>
                </div>
                <div className="p-4">
                  <p className="font-medium">{t('property.capacity.parking')}</p>
                </div>
                <div className="p-4">
                  <p className="font-medium">{t('property.capacity.automation')}</p>
                </div>
                <div className="p-4">
                  <p className="font-medium">{t('property.capacity.security')}</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" className="bg-white border-2 border-[#b7a66b] text-[#b7a66b] hover:bg-[#b7a66b] hover:text-white transition-all duration-500">
                  <Link href="/galerie" className="flex items-center gap-2">
                    {t('property.allEquipments')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expérience signature */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light mb-6">{t('experience.title')}</h2>
            <p className="text-lg text-gray-700 mb-12">{t('experience.description')}</p>

            <div className="bg-white p-10 rounded-lg shadow-sm text-center mb-16">
              <p className="text-xl italic">{t('experience.commitment.quote')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-6">
                <h3 className="text-xl font-medium mb-4">{t('experience.exceptional.title')}</h3>
                <p className="text-gray-600">{t('experience.exceptional.description')}</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-4">{t('experience.harmony.title')}</h3>
                <p className="text-gray-600">{t('experience.harmony.description')}</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-4">{t('experience.service.title')}</h3>
                <p className="text-gray-600">{t('experience.service.description')}</p>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button asChild size="lg" className="bg-[#b7a66b] text-white hover:bg-[#a08c4a] rounded-full">
                <Link href="/contact" className="flex items-center gap-2">
                  {t('experience.bookButton')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 