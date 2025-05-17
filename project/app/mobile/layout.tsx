import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Playfair_Display, Inter } from 'next/font/google';
import MobileHeader from "@/app/mobile/components/mobile-header";
import { LanguageProvider } from "@/components/providers/language-provider";

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Pied de page simplifié pour mobile
function MobileFooter() {
  return (
    <footer className="py-8 px-6 bg-[#1A1A1A] text-white/70">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <h3 className="text-white text-lg font-light mb-2">Les Étoiles du Rocher</h3>
            <p className="text-sm font-light">
              Méditerranée, France
            </p>
          </div>
          
          <div className="mb-6 text-sm">
            <p>contact@lesetoilesdurocher.com</p>
            <p>+33 (0)4 12 34 56 78</p>
          </div>
          
          <div className="text-xs text-white/50 mt-4">
            © {new Date().getFullYear()} Les Étoiles du Rocher. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'el' }, { locale: 'ru' }, { locale: 'it' }];
}

export default async function MobileLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = await getMessages({ locale: params.locale });
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans min-h-screen flex flex-col`}>
        <LanguageProvider>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <div className="flex flex-col min-h-screen">
              <MobileHeader />
              <main className="flex-grow pt-0">{children}</main>
              <MobileFooter />
            </div>
          </NextIntlClientProvider>
        </LanguageProvider>
      </body>
    </html>
  );
} 