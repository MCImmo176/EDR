import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default createMiddleware({
  // Liste des langues supportées
  locales: ['fr', 'en', 'el', 'ru', 'it'],
  
  // Langue par défaut
  defaultLocale: 'fr',
  
  // Configuration
  localePrefix: 'always',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 