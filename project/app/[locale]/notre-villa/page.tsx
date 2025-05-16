"use client";

import { useState, useEffect } from "react";
import { FullscreenVideo } from "@/components/FullscreenVideo";
import { motion } from "framer-motion";

export default function NotreVillaPage() {
  const [isVisible, setIsVisible] = useState(false);

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
                  Notre Villa<br />
                  <span className="font-extralight tracking-wide">un écrin d'exception</span>
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
                  Réveillez-vous avec le doux murmure des vagues et une vue imprenable sur la Méditerranée.
                </p>
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
    </>
  );
} 