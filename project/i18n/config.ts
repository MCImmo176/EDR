export const locales = ['fr', 'en', 'el', 'ru', 'it'] as const;
export const defaultLocale = 'fr' as const;

export type Locale = (typeof locales)[number]; 