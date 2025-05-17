import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Fonction pour détecter les appareils mobiles
function isMobileDevice(userAgent: string) {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  );
}

// Middleware pour la redirection mobile et l'internationalisation
export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = isMobileDevice(userAgent);
  const hostname = request.headers.get('host') || '';
  
  // Vérifier si nous sommes déjà sur le sous-domaine mobile
  const isMobileSubdomain = hostname.startsWith('m.');
  
  // Si mobile et pas sur sous-domaine mobile, rediriger
  if (isMobile && !isMobileSubdomain && !url.pathname.includes('/api/')) {
    // Si le chemin commence par une locale, la préserver dans la redirection
    const pathWithoutLocale = url.pathname.replace(/^\/(fr|en|el|ru|it)/, '');
    
    // Construire l'URL du sous-domaine mobile avec le bon protocole
    let mobileUrl = `${url.protocol}//m.${hostname.replace(/^www\./, '')}`;
    
    // Réappliquer la locale au début du chemin si elle existait
    const locale = url.pathname.match(/^\/(fr|en|el|ru|it)/)?.[1];
    if (locale) {
      mobileUrl += `/${locale}`;
    }
    
    // Ajouter le chemin sans la locale et les paramètres de requête
    mobileUrl += pathWithoutLocale + url.search;
    
    return NextResponse.redirect(mobileUrl);
  }
  
  // Si nous sommes sur le sous-domaine mobile
  if (isMobileSubdomain) {
    // Extraire la locale et le reste du chemin
    const localeMatch = url.pathname.match(/^\/(fr|en|el|ru|it)/) || [null, null];
    const locale = localeMatch[1];
    const pathWithoutLocale = locale ? url.pathname.replace(/^\/(fr|en|el|ru|it)/, '') : url.pathname;
    
    // Pages qui ont une version mobile dédiée
    const mobilePagePaths = ['/galerie', '/'];
    
    // Si le chemin correspond à une page qui a une version mobile
    if (mobilePagePaths.includes(pathWithoutLocale)) {
      // Si le chemin n'est pas encore dans le format mobile
      if (!pathWithoutLocale.startsWith('/mobile')) {
        // Reconstruire le chemin pour pointer vers la version mobile
        let newPath = locale ? `/${locale}/mobile${pathWithoutLocale}` : `/mobile${pathWithoutLocale}`;
        url.pathname = newPath;
        return NextResponse.rewrite(url);
      }
    }
  }
  
  // Pour toutes les autres requêtes, utiliser le middleware d'internationalisation
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