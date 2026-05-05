import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raketech | Suscripciones de juegos",
  description:
    "Landing de suscripciones gaming con catálogo destacado y productos populares.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#030305] text-white">
        {children}
      </body>
    </html>
  );
}
