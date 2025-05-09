"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Footer() {
  const { t } = useLanguage();
  const currentLocale = useParams().locale as string;
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollPosition >= documentHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const flags = [
    { locale: "fr", src: "/images/flags/france.png", alt: "Drapeau français" },
    { locale: "en", src: "/images/flags/etats-unis.png", alt: "Drapeau américain" },
    { locale: "el", src: "/images/flags/grece.png", alt: "Drapeau grec" },
    { locale: "it", src: "/images/flags/italie.png", alt: "Drapeau italien" },
    { locale: "ru", src: "/images/flags/russie.png", alt: "Drapeau russe" }
  ];

  return (
    <footer className={`py-6 transition-colors duration-300 ${isAtBottom ? 'bg-neutral-50' : 'bg-transparent'}`}>
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex flex-col md:flex-row gap-6">
              <Link href={`/${currentLocale}/terms`} className="hover:text-primary transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href={`/${currentLocale}/sales-terms`} className="hover:text-primary transition-colors">
                {t('footer.sales')}
              </Link>
            </div>
          </div>

          <div className="text-center order-last md:order-2">
            <span>© 2025 Les Étoiles du Rocher</span>
          </div>
          
          <div className="flex gap-4 items-center order-2 md:order-last">
            {flags.map((flag) => {
              const pathname = usePathname();
              const currentPath = pathname ? pathname.split('/').slice(2).join('/') : '';
              const newPath = `/${flag.locale}/${currentPath}`;
              
              return (
                <Link 
                  key={flag.locale} 
                  href={newPath}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <div className="w-[35px] h-[25px] relative">
                    <Image
                      src={flag.src}
                      alt={flag.alt}
                      fill
                      sizes="35px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}