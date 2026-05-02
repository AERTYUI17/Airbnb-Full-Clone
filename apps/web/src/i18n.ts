import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'ar', 'zh', 'sw', 'fr'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    return {};
  }

  return {
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
