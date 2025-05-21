"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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
  
  // Extraire la locale de l'URL, du localStorage ou du cookie
  const getInitialLocale = () => {
    if (typeof window !== 'undefined') {
      // 1. Vérifier le localStorage
      const savedLocale = localStorage.getItem('preferredLocale');
      if (savedLocale && ['fr', 'en', 'el', 'ru', 'it'].includes(savedLocale)) {
        return savedLocale as Language;
      }

      // 2. Vérifier le cookie
      const cookies = document.cookie.split(';');
      const localeCookie = cookies.find(cookie => cookie.trim().startsWith('preferredLocale='));
      if (localeCookie) {
        const locale = localeCookie.split('=')[1].trim();
        if (['fr', 'en', 'el', 'ru', 'it'].includes(locale)) {
          return locale as Language;
        }
      }
    }
    return pathname.split('/')[1] as Language || "fr";
  };

  const [language, setLanguage] = useState<Language>(getInitialLocale());

  // Fonction pour changer la langue
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    
    if (typeof window !== 'undefined') {
      // Sauvegarder dans le localStorage
      localStorage.setItem('preferredLocale', newLang);
      
      // Sauvegarder dans le cookie (expire dans 1 an)
      document.cookie = `preferredLocale=${newLang}; path=/; max-age=31536000`;
    }

    const newPath = pathname.replace(`/${pathname.split('/')[1]}`, `/${newLang}`);
    router.push(newPath);
  };

  // Effet pour synchroniser la langue avec l'URL
  useEffect(() => {
    const currentLocale = pathname.split('/')[1] as Language;
    if (currentLocale && currentLocale !== language) {
      setLanguage(currentLocale);
    }
  }, [pathname]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}