import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar', 'zh', 'sw', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).)*',
    '/(ar|zh|sw|fr|en)/:path*'
  ]
};
