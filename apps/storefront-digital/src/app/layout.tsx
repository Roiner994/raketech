import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raketech Digital — Suscripciones al Mejor Precio",
  description:
    "Tu tienda de suscripciones digitales premium: Xbox Game Pass, PlayStation Plus, PC Game Pass y más con entregas inmediatas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased font-[family-name:var(--font-inter)]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
