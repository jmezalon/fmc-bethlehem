import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ht', 'fr', 'en'],

  // Used when no locale matches
  defaultLocale: 'ht',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ht|fr|en)/:path*'],
};
