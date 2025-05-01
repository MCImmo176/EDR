"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { usePathname } from 'next/navigation';

export function Footer() {
  const { tCommon } = useLanguage();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  const flags = [
    { locale: "fr", src: "/images/flags/france.png", alt: "Drapeau français" },
    { locale: "en", src: "/images/flags/etats-unis.png", alt: "Drapeau américain" },
    { locale: "el", src: "/images/flags/grece.png", alt: "Drapeau grec" },
    { locale: "it", src: "/images/flags/italie.png", alt: "Drapeau italien" },
    { locale: "ru", src: "/images/flags/russie.png", alt: "Drapeau russe" }
  ];

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex flex-col md:flex-row gap-6">
              <Link href={`/${currentLocale}/terms`} className="hover:text-primary transition-colors">
                {tCommon('footer.terms')}
              </Link>
              <Link href={`/${currentLocale}/sales-terms`} className="hover:text-primary transition-colors">
                {tCommon('footer.sales')}
              </Link>
              <Link href={`/${currentLocale}/galerie`} className="hover:text-primary transition-colors">
                {tCommon('footer.gallery')}
              </Link>
              <Link href={`/${currentLocale}/decouvrir`} className="hover:text-primary transition-colors">
                {tCommon('footer.discover')}
              </Link>
            </div>
          </div>

          <div className="text-center order-last md:order-2">
            <span>© 2025 {tCommon('footer.villaName')}</span>
          </div>
          
          <div className="flex gap-4 items-center order-2 md:order-last">
            {flags.map((flag) => {
              // Extraire le chemin actuel sans la locale
              const currentPath = pathname.split('/').slice(2).join('/');
              // Construire le nouveau chemin avec la nouvelle locale
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