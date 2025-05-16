// Ce composant a été remplacé par une approche différente dans la galerie.
// Le fichier est conservé pour référence mais n'est plus utilisé dans l'application.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Photo {
  src: string;
  alt: string;
  category: string;
  size: string;
}

interface DynamicBottomGalleryProps {
  lastThreePhotos: Photo[];
  shouldSeparateLastThree: boolean;
  filteredPhotos: Photo[];
  setSelectedImage: (index: number | null) => void;
}

const DynamicBottomGallery = ({ 
  lastThreePhotos, 
  shouldSeparateLastThree, 
  filteredPhotos, 
  setSelectedImage 
}: DynamicBottomGalleryProps) => {
  // Composant conservé pour référence mais plus utilisé
  return null;
};

export default DynamicBottomGallery; 