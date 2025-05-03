import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en', 'el', 'ru', 'it'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  localeDetection: false,
  alternateLinks: false
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 