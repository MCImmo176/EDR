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
  
  // Si pas de cookie, on utilise le français par défaut
  const locale = localeFromCookie || 'fr';
  
  // Extraire la langue actuelle de l'URL
  const currentLocale = pathname.split('/')[1];
  
  // Si la langue dans l'URL ne correspond pas au cookie, on redirige
  if (currentLocale !== locale) {
    const newPath = pathname.replace(/^\/(fr|en|el|ru|it)/, `/${locale}`);
    const response = NextResponse.redirect(new URL(newPath, req.url));
    
    // S'assurer que le cookie est bien défini
    if (!localeFromCookie) {
      response.cookies.set('NEXT_LOCALE', locale, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        path: '/',
        sameSite: 'strict'
      });
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 