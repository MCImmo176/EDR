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
  
  // Extraire la locale de l'URL
  const initialLocale = pathname.split('/')[1] as Language;
  const [language, setLanguage] = useState<Language>(initialLocale || "fr");

  // Fonction pour changer la langue
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    const newPath = pathname.replace(`/${initialLocale}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}