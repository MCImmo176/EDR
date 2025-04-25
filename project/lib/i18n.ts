import { createI18n } from 'next-intl';
import en from '../messages/en.json';
import fr from '../messages/fr.json';

export const i18n = createI18n({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  messages: {
    en,
    fr,
  },
});

export function getTranslations(locale: string) {
  return locale === 'en' ? en : fr;
}