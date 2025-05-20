import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Découvrir', href: '/decouvrir' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Contact', href: '/contact' },
];

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu lors du changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm md:hidden">
      <div className="flex items-center justify-between px-4 h-16">
        <Link href="/" className="text-xl font-display text-luxury-dark">
          Les Étoiles du Rocher
        </Link>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
        >
          <div className="w-6 h-5 relative">
            <span 
              className={`absolute w-full h-0.5 bg-luxury-gold transition-all duration-300 ${
                isOpen ? 'rotate-45 top-2' : 'top-0'
              }`} 
            />
            <span 
              className={`absolute w-full h-0.5 bg-luxury-gold transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'top-2'
              }`} 
            />
            <span 
              className={`absolute w-full h-0.5 bg-luxury-gold transition-all duration-300 ${
                isOpen ? '-rotate-45 top-2' : 'top-4'
              }`} 
            />
          </div>
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-white shadow-lg"
          >
            <ul className="py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-6 py-3 text-lg ${
                      pathname === item.href
                        ? 'text-luxury-gold font-medium'
                        : 'text-luxury-dark hover:text-luxury-gold'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}; 