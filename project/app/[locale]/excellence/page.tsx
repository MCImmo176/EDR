"use client";

import { FullscreenVideo } from "@/components/FullscreenVideo";
import { motion } from "framer-motion";

export default function ExcellencePage() {
  return (
    <>
      <FullscreenVideo 
        videoUrl="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
        title="Vidéo excellence"
      />
      
      <div className="relative z-10 h-full flex items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display mb-8">
            Excellence
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest uppercase">
            Découvrez notre univers d'exception
          </p>
        </motion.div>
      </div>
    </>
  );
} 