import type { Metadata } from "next";
import "./globals.css";
import { getStorefrontTheme } from "@/lib/storefrontTheme";

export const metadata: Metadata = {
  title: "Raketech Digital — Suscripciones al Mejor Precio",
  description:
    "Tu tienda de suscripciones digitales premium: Xbox Game Pass, PlayStation Plus, PC Game Pass y más con entregas inmediatas.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getStorefrontTheme("digital");

  return (
    <html lang="es" data-theme={theme} suppressHydrationWarning style={{ colorScheme: theme }}>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased font-[family-name:var(--font-inter)]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
