"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type Language = "fr" | "en" | "it" | "el" | "ru";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// This is a simplified version for demonstration
// In a production app, you'd likely use a more robust i18n solution like next-intl
const translations: Record<Language, Record<string, string>> = {
  fr: {
    "nav.home": "Accueil",
    "nav.villa": "Notre Villa",
    "nav.gallery": "Galerie",
    "nav.discover": "Découvrir",
    "nav.info": "Informations",
    "nav.contact": "Contact",
    "footer.terms": "Conditions Générales",
    "footer.sales": "Conditions de Vente",
    "hero.title": "Les Étoiles du Rocher",
    "hero.subtitle": "Une expérience unique à Roquebrune Cap Martin",
    "hero.cta": "Découvrir",
    // Add more translations as needed
  },
  en: {
    "nav.home": "Home",
    "nav.villa": "Our Villa",
    "nav.gallery": "Gallery",
    "nav.discover": "Discover",
    "nav.info": "Information",
    "nav.contact": "Contact",
    "footer.terms": "Terms of Use",
    "footer.sales": "Terms of Sale",
    "hero.title": "Les Étoiles du Rocher",
    "hero.subtitle": "A unique experience in Roquebrune Cap Martin",
    "hero.cta": "Discover",
    // Add more translations as needed
  },
  it: {
    "nav.home": "Home",
    "nav.villa": "La Nostra Villa",
    "nav.gallery": "Galleria",
    "nav.discover": "Scoprire",
    "nav.info": "Informazioni",
    "nav.contact": "Contatto",
    "footer.terms": "Termini di Utilizzo",
    "footer.sales": "Termini di Vendita",
    "hero.title": "Les Étoiles du Rocher",
    "hero.subtitle": "Un'esperienza unica a Roquebrune Cap Martin",
    "hero.cta": "Scoprire",
    // Add more translations as needed
  },
  el: {
    "nav.home": "Αρχική",
    "nav.villa": "Η Βίλα μας",
    "nav.gallery": "Εκθέσεις",
    "nav.discover": "Ανακαλύψτε",
    "nav.info": "Πληροφορίες",
    "nav.contact": "Επικοινωνία",
    "footer.terms": "Όροι Χρήσης",
    "footer.sales": "Όροι Πώλησης",
    "hero.title": "Les Étoiles du Rocher",
    "hero.subtitle": "Μια μοναδική εμπειρία στο Roquebrune Cap Martin",
    "hero.cta": "Ανακαλύψτε",
    // Add more translations as needed
  },
  ru: {
    "nav.home": "Главная",
    "nav.villa": "Наша Вилла",
    "nav.gallery": "Галерея",
    "nav.discover": "Открыть",
    "nav.info": "Информация",
    "nav.contact": "Контакт",
    "footer.terms": "Условия использования",
    "footer.sales": "Условия продажи",
    "hero.title": "Les Étoiles du Rocher",
    "hero.subtitle": "Уникальный опыт в Рокебрюн-Кап-Мартен",
    "hero.cta": "Открыть",
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

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

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}