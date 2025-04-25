import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import LanguageSelector from '@/components/LanguageSelector';

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
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="flex justify-between items-center p-4">
            <LanguageSelector />
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 