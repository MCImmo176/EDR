import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Compass, Globe } from 'lucide-react';

interface DiscoverVideoOverlayProps {
  textKey?: string;
  accentColor?: string;
  fullWidth?: boolean;
}

const DiscoverVideoOverlay: React.FC<DiscoverVideoOverlayProps> = ({
  textKey = 'discover',
  accentColor = '#b7a66b',
  fullWidth = false
}) => {
  const t = useTranslations('discoverOverlay');
  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);
  
  // Définir les textes et sous-titres
  const mainTitle = t(`${textKey}.title`);
  const subtitle = t(`${textKey}.subtitle`);
  const tagline = t(`${textKey}.tagline`);
  
  useEffect(() => {
    if (!loaded) {
      controls.start('visible');
      setLoaded(true);
    }
  }, [controls, loaded]);

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const drawLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  const locationPoints = [
    { icon: MapPin, label: "Monaco", x: "35%", y: "65%" },
    { icon: Compass, label: "Cap Martin", x: "55%", y: "45%" },
    { icon: Globe, label: "Côte d'Azur", x: "80%", y: "35%" }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className={`${fullWidth ? 'w-full' : 'w-[90%] max-w-[1200px]'} relative z-20 h-full flex items-center`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="w-full px-8 relative"
        >
          {/* Conteneur principal avec fond semi-transparent */}
          <motion.div 
            className="relative w-full max-w-5xl mx-auto overflow-hidden"
            variants={fadeInUpVariants}
          >
            {/* Cercle décoratif */}
            <motion.div 
              className="absolute right-20 top-0 w-[600px] h-[600px] border-2 rounded-full opacity-20"
              style={{ borderColor: accentColor }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Points de carte interactifs - Corrigés pour s'afficher correctement */}
            <div className="absolute inset-0 w-full h-full">
              {locationPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    left: point.x, 
                    top: point.y,
                    zIndex: 30
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.2), duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="relative flex flex-col items-center group">
                    {/* Icône du point avec son cercle */}
                    <div className="relative">
                      <div className="absolute -inset-2.5 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 group-hover:bg-white/30" />
                      <point.icon 
                        className="relative h-5 w-5 z-10" 
                        style={{ color: accentColor }}
                      />
                    </div>
                    
                    {/* Effet de pulsation */}
                    <div 
                      className="absolute w-12 h-12 -inset-3.5 bg-white/10 rounded-full animate-ping" 
                      style={{ 
                        animationDuration: '3s',
                        animationDelay: `${index * 0.2}s`,
                        opacity: 0.5
                      }} 
                    />
                    
                    {/* Étiquette du lieu */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 whitespace-nowrap"
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        {point.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Contenu principal */}
            <div className="flex flex-col items-start text-white p-8 md:p-12 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20">
              {/* Tagline */}
              <motion.div 
                variants={fadeInUpVariants}
                className="mb-2 inline-block"
              >
                <span className="text-sm md:text-base uppercase tracking-widest font-light px-3 py-1 border border-white/30 rounded-full">
                  {tagline}
                </span>
              </motion.div>
              
              {/* Titre principal avec effet de soulignement */}
              <motion.h1 
                variants={titleVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-white mb-6 ml-0"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                {mainTitle}
                <motion.div 
                  className="h-1 w-1/3 mt-2 origin-left"
                  style={{ background: accentColor }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.h1>
              
              {/* Sous-titre */}
              <motion.p 
                variants={fadeInUpVariants}
                className="text-white text-xl md:text-2xl font-light tracking-wide max-w-2xl mb-8"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
              >
                {subtitle}
              </motion.p>
              
              {/* Bouton d'exploration */}
              <motion.div
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <div className="group cursor-pointer px-8 py-3 border border-white/50 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <span className="text-white text-lg font-light group-hover:text-white transition-colors">
                    {t(`${textKey}.exploreButton`)}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiscoverVideoOverlay; 