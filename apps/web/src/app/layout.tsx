import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajir - Plataforma de Alojamientos",
  description: "Ajir - Plataforma moderna de alojamientos | Disponible en Árabe, Chino, Inglés, Suajili y Francés",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
