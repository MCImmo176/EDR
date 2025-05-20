import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Middleware pour l'internationalisation uniquement
export default async function middleware(request: NextRequest) {
  const intlMiddleware = createMiddleware({
    locales: ['fr', 'en', 'el', 'ru', 'it'],
    defaultLocale: 'fr',
    localePrefix: 'always',
    localeDetection: false,
    alternateLinks: false
  });
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
}; 