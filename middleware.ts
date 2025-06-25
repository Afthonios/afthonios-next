import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr'
});

export const config = {
  // The new matcher ignores files (e.g., .png) and system folders
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)']
};