"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  
  // On peut extraire la locale actuelle du chemin
  const getLocaleFromPath = (path: string) => {
    const match = path.match(/^\/(fr|en|el|ru|it)/);
    return match ? match[1] : 'fr';
  };
  
  const locale = getLocaleFromPath(pathname);
  
  // Fonction pour changer de langue
  const switchLanguage = (newLocale: string) => {
    // Construire le nouveau chemin avec la nouvelle locale
    const pathWithoutLocale = pathname.replace(/^\/(fr|en|el|ru|it)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };
  
  // Surveiller le défilement pour changer l'apparence de l'en-tête
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu lors d'un changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Menu de navigation simplifié pour mobile
  const navItems = [
    { href: "/", label: t('header.home') },
    { href: "/galerie", label: t('header.gallery') },
    { href: "/services", label: t('header.services') },
    { href: "/contact", label: t('header.contact') }
  ];
  
  // Langues disponibles
  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
    { code: "el", label: "Ελληνικά" },
    { code: "it", label: "Italiano" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-[60]">
          <div className="relative h-10 w-auto">
            <Image 
              src="/logo-white.png" 
              alt="Les Étoiles du Rocher" 
              width={120} 
              height={40}
              className="object-contain"
            />
          </div>
        </Link>
        
        {/* Burger Menu Toggle */}
        <button 
          className="relative z-[60] p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      {/* Menu Mobile Plein Écran */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 pt-20 pb-10 px-6 flex flex-col"
          >
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-6 mt-8">
              {navItems.map((item) => (
                <Link 
                  href={item.href} 
                  key={item.href}
                  className={`text-2xl font-light text-white/90 hover:text-white transition-colors ${pathname === item.href ? 'text-[#b7a66b]' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Language Selector */}
            <div className="mt-auto">
              <div className="relative">
                <button 
                  className="flex items-center justify-between w-full py-3 text-white/80 text-lg"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <span>{languages.find(lang => lang.code === locale)?.label || "Français"}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 bottom-full mb-2 bg-white/10 backdrop-blur-lg rounded overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`block w-full text-left py-3 px-4 text-white/90 hover:bg-white/20 ${locale === lang.code ? 'text-[#b7a66b]' : ''}`}
                          onClick={() => {
                            switchLanguage(lang.code);
                            setShowLanguageMenu(false);
                          }}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 