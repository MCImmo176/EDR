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

  // Si l'URL a déjà un préfixe de langue, on ne redirige pas
  const isMissingLocale = !/^\/(fr|en|el|ru|it)(\/|$)/.test(pathname);

  if (isMissingLocale) {
    const localeFromCookie = req.cookies.get('NEXT_LOCALE')?.value || 'fr';
    return NextResponse.redirect(new URL(`/${localeFromCookie}${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 