import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raketech 3D — Bases e Impresiones en 3D Premium",
  description:
    "Accesorios y soportes impresos en 3D de alta calidad: bases PS5, soportes auriculares, y más. Materiales premium, diseños exclusivos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
