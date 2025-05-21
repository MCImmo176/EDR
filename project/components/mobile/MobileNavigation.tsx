"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Découvrir', href: '/decouvrir' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Contact', href: '/contact' },
];

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // Fermer le menu lors du changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!isMobile) return null;

  return (
    <>
      <button
        className="fixed top-4 right-4 z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg md:hidden focus:outline-none"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span className="block w-7 h-1 bg-luxury-gold rounded transition-all duration-300 mb-1" style={{ transform: isOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
        <span className={`block w-7 h-1 bg-luxury-gold rounded transition-all duration-300 ${isOpen ? 'opacity-0' : 'my-1'}`} />
        <span className="block w-7 h-1 bg-luxury-gold rounded transition-all duration-300" style={{ transform: isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center md:hidden"
            aria-modal="true"
            role="dialog"
          >
            <ul className="space-y-8 text-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={0}
                    className={`text-2xl font-semibold px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-200 ${pathname === item.href ? 'text-luxury-gold' : 'text-luxury-dark hover:text-luxury-gold'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}; 