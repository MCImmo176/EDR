"use client";

import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('section1.title')}</h2>
          <p className="text-gray-600">{t('section1.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('section2.title')}</h2>
          <p className="text-gray-600">{t('section2.content')}</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('section3.title')}</h2>
          <p className="text-gray-600">{t('section3.content')}</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('section4.title')}</h2>
          <p className="text-gray-600">{t('section4.content')}</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('section5.title')}</h2>
          <p className="text-gray-600">{t('section5.content')}</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('section6.title')}</h2>
          <p className="text-gray-600">{t('section6.content')}</p>
        </section>
      </div>
    </div>
  );
}