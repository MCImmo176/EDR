import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('🔍 Middleware - Pathname:', pathname);

  // Bypass static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname)
  ) {
    console.log('⏭️ Middleware - Bypass pour fichier statique ou API');
    return NextResponse.next();
  }

  // Récupérer la langue du cookie
  const localeFromCookie = req.cookies.get('NEXT_LOCALE')?.value;
  console.log('🍪 Middleware - Cookie NEXT_LOCALE:', localeFromCookie);
  
  // Si pas de cookie, on utilise le français par défaut
  const locale = localeFromCookie || 'fr';
  console.log('🌍 Middleware - Langue choisie:', locale);
  
  // Extraire la langue actuelle de l'URL
  const currentLocale = pathname.split('/')[1];
  console.log('🔗 Middleware - Langue actuelle dans l\'URL:', currentLocale);
  
  // Si la langue dans l'URL ne correspond pas au cookie, on redirige
  if (currentLocale !== locale) {
    console.log('🔄 Middleware - Redirection nécessaire');
    console.log('📝 Middleware - Ancienne URL:', pathname);
    
    const newPath = pathname.replace(/^\/(fr|en|el|ru|it)/, `/${locale}`);
    console.log('📝 Middleware - Nouvelle URL:', newPath);
    
    const response = NextResponse.redirect(new URL(newPath, req.url));
    
    // S'assurer que le cookie est bien défini
    if (!localeFromCookie) {
      console.log('🍪 Middleware - Définition du cookie NEXT_LOCALE');
      response.cookies.set('NEXT_LOCALE', locale, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        path: '/',
        sameSite: 'strict'
      });
    }
    
    return response;
  }

  console.log('✅ Middleware - Pas de redirection nécessaire');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 