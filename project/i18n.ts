import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Liste des langues supportées
  locales: ['fr', 'en', 'el', 'it', 'ru'],

  // Langue par défaut
  defaultLocale: 'fr',

  // Chemins des pages
  pathnames: {
    '/': '/',
    '/villa': '/villa',
    '/about': '/about',
    '/contact': '/contact'
  }
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en|el|it|ru)/:path*']
}; 