import type { Metadata } from "next";
import "./globals.css";
import { getStorefrontTheme } from "@/lib/storefrontTheme";

export const metadata: Metadata = {
  title: "Raketech 3D — Studio 3D Print",
  description:
    "Accesorios y soportes impresos en 3D de alta calidad. Materiales premium, diseños exclusivos y acabados excepcionales.",
  icons: {
    icon: "/favicon.png",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getStorefrontTheme("physical");

  return (
    <html lang="es" data-theme={theme} suppressHydrationWarning style={{ colorScheme: theme }}>
      <body className="bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
