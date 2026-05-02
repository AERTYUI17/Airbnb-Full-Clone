import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'ar', 'zh', 'sw', 'fr'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is valid
  const validLocale = locale && locales.includes(locale as any) ? (locale as string) : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./locales/${validLocale}.json`)).default
  };
});
