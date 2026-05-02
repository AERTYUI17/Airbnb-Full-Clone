import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { locales } from "@/i18n";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Ajir - Plataforma de Alojamientos",
  description: "Ajir - Plataforma moderna de alojamientos con arquitectura de microservicios",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";
  const actualLocale = await getLocale();

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link
          rel="preload"
          href="/fonts/AirbnbCereal-Bk.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AirbnbCereal-Md.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
