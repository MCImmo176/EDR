"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import Cookies from 'js-cookie';

type Language = "fr" | "en" | "it" | "el" | "ru";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}

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
      
      // Sauvegarder dans un cookie qui expire dans 1 an
      Cookies.set('NEXT_LOCALE', newLang, { 
        expires: 365,
        path: '/',
        sameSite: 'strict'
      });
    }

    // Construire le nouveau chemin en préservant le reste de l'URL
    const segments = pathname.split('/');
    segments[1] = newLang; // Remplacer la locale dans l'URL
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  // Synchroniser avec la locale de l'URL et les préférences stockées
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem('preferredLocale') as Language;
      const cookieLocale = Cookies.get('NEXT_LOCALE') as Language;
      
      // Priorité : 1. Cookie, 2. localStorage, 3. URL actuelle
      const preferredLocale = cookieLocale || storedLocale || currentLocale;
      
      if (preferredLocale && preferredLocale !== currentLocale) {
        handleLanguageChange(preferredLocale);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}