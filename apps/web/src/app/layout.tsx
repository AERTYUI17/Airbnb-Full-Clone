import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Full Clone - Microservicios & IA",
  description: "Clon de Airbnb con arquitectura de microservicios | Next.js 15 + NestJS + Prisma + Stripe | JWT Auth, Booking System, Payments, Reviews & Favorites | 33 REST API endpoints | shadcn/ui + TailwindCSS | TypeScript monorepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}