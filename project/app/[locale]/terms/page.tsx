"use client";

import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');
  const content = t('content');

  // Découpage en paragraphes et titres de section
  const blocks = content.split(/\n+/).map((block, idx) => {
    const sectionTitle = block.match(/^\d+\.\s.+/);
    if (sectionTitle) {
      return (
        <h2 key={idx} className="text-2xl font-bold mt-8 mb-2 underline">{block}</h2>
      );
    }
    return (
      <p key={idx} className="mb-4 text-lg leading-relaxed">{block}</p>
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold underline text-center mb-10">{t('title')}</h1>
      <div className="prose prose-lg max-w-none">
        {blocks}
      </div>
    </div>
  );
}