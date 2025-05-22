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
  
  // Initialiser avec la locale actuelle
  const [language, setLanguage] = useState<Language>(currentLocale);

  // Fonction pour changer la langue
  const handleLanguageChange = (newLang: Language) => {
    // Mettre à jour le state
    setLanguage(newLang);
    
    // Sauvegarder dans le cookie (prioritaire)
    Cookies.set('NEXT_LOCALE', newLang, { 
      expires: 365,
      path: '/',
      sameSite: 'strict'
    });

    // Sauvegarder dans le localStorage comme backup
    localStorage.setItem('preferredLocale', newLang);

    // Construire le nouveau chemin
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');
    
    // Rediriger
    router.push(newPath);
  };

  // Au chargement initial, vérifier si on a une préférence stockée
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookieLocale = Cookies.get('NEXT_LOCALE') as Language;
      const storedLocale = localStorage.getItem('preferredLocale') as Language;
      
      // Si on a une préférence stockée différente de la locale actuelle
      if (cookieLocale && cookieLocale !== currentLocale) {
        handleLanguageChange(cookieLocale);
      } else if (storedLocale && storedLocale !== currentLocale) {
        handleLanguageChange(storedLocale);
      }
    }
  }, []); // Uniquement au montage du composant

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}
}