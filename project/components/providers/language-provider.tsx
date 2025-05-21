"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from 'next-intl';

type Language = "fr" | "en" | "it" | "el" | "ru";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
});

export const useLanguageContext = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Language;
  
  const [language, setLanguage] = useState<Language>(currentLocale);

  // Fonction pour changer la langue
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    
    if (typeof window !== 'undefined') {
      // Sauvegarder dans le localStorage
      localStorage.setItem('preferredLocale', newLang);
    }

    // Construire le nouveau chemin en préservant le reste de l'URL
    const segments = pathname.split('/');
    segments[1] = newLang; // Remplacer la locale dans l'URL
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  // Synchroniser avec la locale de l'URL
  useEffect(() => {
    if (currentLocale !== language) {
      setLanguage(currentLocale);
    }
  }, [currentLocale]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}