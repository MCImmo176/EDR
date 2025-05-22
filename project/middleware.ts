import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bypass static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Récupérer la langue du cookie
  const localeFromCookie = req.cookies.get('NEXT_LOCALE')?.value;
  
  // Si l'URL a déjà un préfixe de langue
  const hasLocale = /^\/(fr|en|el|ru|it)(\/|$)/.test(pathname);
  
  if (hasLocale) {
    // Si on a un cookie et que la langue dans l'URL est différente
    if (localeFromCookie) {
      const currentLocale = pathname.split('/')[1];
      if (currentLocale !== localeFromCookie) {
        // Rediriger vers la langue du cookie
        const newPath = pathname.replace(/^\/(fr|en|el|ru|it)/, `/${localeFromCookie}`);
        return NextResponse.redirect(new URL(newPath, req.url));
      }
    }
    return NextResponse.next();
  }

  // Si pas de préfixe de langue, rediriger vers la langue du cookie ou le français par défaut
  const locale = localeFromCookie || 'fr';
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 