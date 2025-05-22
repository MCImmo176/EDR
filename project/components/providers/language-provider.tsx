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
  
  console.log('🔄 LanguageProvider - Pathname:', pathname);
  console.log('🌍 LanguageProvider - Current Locale:', currentLocale);
  
  // Initialiser avec la locale actuelle
  const [language, setLanguage] = useState<Language>(currentLocale);
  console.log('🎯 LanguageProvider - State Language:', language);

  // Fonction pour changer la langue
  const handleLanguageChange = (newLang: Language) => {
    console.log('🔄 LanguageProvider - Changement de langue demandé:', newLang);
    console.log('📝 LanguageProvider - Ancienne langue:', language);
    
    // Mettre à jour le state
    setLanguage(newLang);
    
    // Sauvegarder dans le cookie
    Cookies.set('NEXT_LOCALE', newLang, { 
      expires: 365,
      path: '/',
      sameSite: 'strict'
    });
    console.log('🍪 LanguageProvider - Cookie mis à jour:', newLang);

    // Construire le nouveau chemin
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');
    console.log('🔗 LanguageProvider - Nouveau chemin:', newPath);
    
    // Rediriger
    router.push(newPath);
  };

  // Vérifier la cohérence de la langue à chaque changement de page
  useEffect(() => {
    console.log('👀 LanguageProvider - Vérification de cohérence');
    const cookieLocale = Cookies.get('NEXT_LOCALE') as Language;
    console.log('🍪 LanguageProvider - Cookie actuel:', cookieLocale);
    console.log('🌍 LanguageProvider - Locale actuelle:', currentLocale);
    
    // Si on a un cookie et que la langue actuelle est différente
    if (cookieLocale && cookieLocale !== currentLocale) {
      console.log('🔄 LanguageProvider - Redirection nécessaire');
      console.log('📝 LanguageProvider - Ancienne URL:', pathname);
      
      // Forcer la redirection vers la langue du cookie
      const segments = pathname.split('/');
      segments[1] = cookieLocale;
      const newPath = segments.join('/');
      console.log('🔗 LanguageProvider - Nouvelle URL:', newPath);
      
      router.replace(newPath);
    }
  }, [pathname, currentLocale]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}