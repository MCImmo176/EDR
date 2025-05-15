import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface GalleryVideoOverlayProps {
  textKey?: string;
  accentColor?: string;
  fullWidth?: boolean;
}

const GalleryVideoOverlay: React.FC<GalleryVideoOverlayProps> = ({
  textKey = 'gallery',
  accentColor = '#b7a66b',
  fullWidth = false
}) => {
  const t = useTranslations('galleryOverlay');
  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);
  
  // Définir les textes et sous-titres
  const mainTitle = t(`${textKey}.title`);
  const subtitle = t(`${textKey}.subtitle`);
  
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
        staggerChildren: 0.12,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`${fullWidth ? 'w-full' : 'w-[90%] max-w-[1200px]'} relative z-20`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative px-8 py-12 md:px-20 md:py-16 overflow-hidden"
        >
          {/* Overlay semi-transparent */}
          <motion.div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            variants={fadeInVariants}
            style={{ borderRadius: '2px' }}
          />
          
          {/* Ligne d'accent horizontale supérieure */}
          <motion.div
            className="absolute top-0 left-[10%] right-[10%] h-[1px]"
            style={{ background: accentColor }}
            variants={lineVariants}
            custom={0}
          />
          
          {/* Ligne d'accent verticale gauche */}
          <motion.div
            className="absolute left-0 top-[10%] bottom-[10%] w-[1px]"
            style={{ background: accentColor }}
            variants={lineVariants}
            custom={1}
          />
          
          {/* Contenu principal */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white mb-4"
              variants={titleVariants}
            >
              {mainTitle}
            </motion.h1>
            
            <motion.div 
              className="w-20 h-[2px] bg-white/80 my-6"
              variants={lineVariants}
            />
            
            <motion.p 
              className="text-white/90 text-xl md:text-2xl font-light tracking-wide max-w-2xl"
              variants={titleVariants}
            >
              {subtitle}
            </motion.p>
          </div>
          
          {/* Ligne d'accent horizontale inférieure */}
          <motion.div
            className="absolute bottom-0 left-[10%] right-[10%] h-[1px]"
            style={{ background: accentColor }}
            variants={lineVariants}
            custom={2}
          />
          
          {/* Ligne d'accent verticale droite */}
          <motion.div
            className="absolute right-0 top-[10%] bottom-[10%] w-[1px]"
            style={{ background: accentColor }}
            variants={lineVariants}
            custom={3}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryVideoOverlay; 