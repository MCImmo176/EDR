import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorer les fichiers publics et les routes API
  if (
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname) ||
    pathname.includes('_next')
  ) {
    return NextResponse.next();
  }

  // Vérifier si une locale est déjà présente dans l'URL
  const pathnameIsMissingLocale = /^\/(?![a-z]{2}(\/|$)).*/.test(pathname);

  if (pathnameIsMissingLocale) {
    // 1. Essayer de récupérer la langue depuis le cookie
    const localeFromCookie = req.cookies.get('preferredLocale')?.value;

    // 2. Sinon, utiliser la langue du header
    const localeFromHeader = req.headers.get('accept-language')?.split(',')[0].split('-')[0];

    // 3. Sinon, fallback en français
    const locale = localeFromCookie || localeFromHeader || 'fr';

    // Vérifier que la locale est valide
    const validLocales = ['fr', 'en', 'el', 'ru', 'it'];
    const finalLocale = validLocales.includes(locale) ? locale : 'fr';

    return NextResponse.redirect(new URL(`/${finalLocale}${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 