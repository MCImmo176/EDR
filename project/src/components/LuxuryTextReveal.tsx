import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface LuxuryTextRevealProps {
  textKey?: string;
  textLine?: string;
  accentColor?: string;
  className?: string;
}

const LuxuryTextReveal: React.FC<LuxuryTextRevealProps> = ({
  textKey = 'villa',
  textLine,
  accentColor = '#b7a66b',
  className = ''
}) => {
  const t = useTranslations('luxuryText');
  const text = textLine || t(`${textKey}.line1`);
  
  // Séparation intelligente du texte en lignes
  const lines = text.split(' ').reduce((acc: string[][], word: string) => {
    const currentLine = acc[acc.length - 1];
    const currentLineLength = currentLine.join(' ').length;
    
    if (currentLineLength + word.length > 15 && acc.length < 3) {
      acc.push([word]);
    } else {
      currentLine.push(word);
    }
    return acc;
  }, [[]]);

  // Animation pour chaque ligne
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Effet de lumière ambiant */}
      <div className="absolute -inset-20 bg-gradient-radial from-white/5 via-transparent to-transparent opacity-50 blur-3xl"></div>
      
      {/* Ligne décorative */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-8 top-0 w-0.5 h-full"
        style={{
          background: `linear-gradient(to bottom, ${accentColor}, transparent)`
        }}
      />

      {/* Conteneur principal du texte */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col space-y-2"
      >
        {lines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            variants={lineVariants}
            className="overflow-hidden relative"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 1,
                delay: 0.2 + (lineIndex * 0.15),
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative"
            >
              <span className="block text-[2.5em] md:text-[3.5em] lg:text-[4.5em] font-light tracking-wide leading-[1.1]">
                {line.join(' ')}
              </span>

              {/* Effet de soulignement subtil */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.8 + (lineIndex * 0.2),
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="absolute bottom-0 left-0 w-full h-[1px] origin-left"
                style={{ 
                  background: `linear-gradient(to right, ${accentColor}20, transparent)`,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LuxuryTextReveal; 