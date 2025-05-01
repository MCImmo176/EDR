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

  // Synchroniser la langue avec l'URL
  useEffect(() => {
    const currentLocale = pathname.split('/')[1];
    if (currentLocale !== language) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${language}`);
      router.push(newPath);
    }
  }, [language, pathname, router]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}