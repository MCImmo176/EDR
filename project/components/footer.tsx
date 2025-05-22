"use client";

import { useLanguageContext } from "./providers/language-provider";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Footer() {
  const { language, setLanguage } = useLanguageContext();
  const router = useRouter();
  const pathname = usePathname();

  console.log('👣 Footer - Pathname:', pathname);
  console.log('🌍 Footer - Langue actuelle:', language);

  const handleLanguageChange = (newLang: string) => {
    console.log('🔄 Footer - Changement de langue demandé:', newLang);
    console.log('📝 Footer - Ancienne langue:', language);
    
    // Mettre à jour le cookie
    Cookies.set('NEXT_LOCALE', newLang, { 
      expires: 365,
      path: '/',
      sameSite: 'strict'
    });
    console.log('🍪 Footer - Cookie mis à jour:', newLang);

    // Mettre à jour la langue dans le contexte
    setLanguage(newLang as any);
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Les Étoiles du Rocher</h3>
            <p className="text-sm mt-2">© 2024 Tous droits réservés</p>
          </div>
          <div className="flex space-x-4">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-gray-700 text-white px-3 py-1 rounded"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="it">Italiano</option>
              <option value="el">Ελληνικά</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
} 