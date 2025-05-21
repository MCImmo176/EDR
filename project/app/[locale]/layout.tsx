import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { ContactFormProvider } from "@/components/providers/contact-form-provider";
import { ContactForm } from "@/components/contact-form";

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

export const metadata: Metadata = {
  title: 'Les Étoiles du Rocher - Roquebrune Cap Martin',
  description: "Villa d'exception située à Roquebrune Cap Martin, destinée à la location de luxe",
};

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'el' }, { locale: 'ru' }, { locale: 'it' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ContactFormProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <ContactForm />
              </ContactFormProvider>
            </NextIntlClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 