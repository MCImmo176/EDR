import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple middleware that could be expanded to handle
// more sophisticated language detection and routing in a production app

export function middleware(request: NextRequest) {
  // Example of getting preferred language from header
  // In a real app, you might also use a cookie or URL path
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Simplified language detection
  // In a production app, you'd likely have a more sophisticated approach
  let preferredLanguage = 'fr'; // Default to French
  
  if (acceptLanguage.includes('en')) {
    preferredLanguage = 'en';
  } else if (acceptLanguage.includes('it')) {
    preferredLanguage = 'it';
  } else if (acceptLanguage.includes('el')) {
    preferredLanguage = 'el';
  } else if (acceptLanguage.includes('ru')) {
    preferredLanguage = 'ru';
  }
  
  // Example of setting a cookie with language preference
  // In a real app with next-intl, you'd likely use paths like /en/about, /fr/about
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', preferredLanguage, { 
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};