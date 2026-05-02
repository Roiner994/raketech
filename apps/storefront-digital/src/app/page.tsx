"use client";

import { useState } from "react";
import { Cloud, Gamepad2, Monitor } from "lucide-react";
import {
  CartDrawer,
  StorefrontFooter,
  StorefrontHeader,
  StorefrontHeroGrid,
  StorefrontShowcaseCard,
  ToastList,
  useCart,
  useToast,
} from "@raketech/ui";
import type { StorefrontHeroItem, StorefrontNavLink } from "@raketech/ui";

type ShowcaseProduct = {
  id: string;
  brand: string;
  title: string;
  accent: string;
  priceLabel: string;
  price: number;
  badge: string;
  image: string;
  imageAlt: string;
  platform: string;
  tone: "green" | "blue" | "charcoal";
  actionTheme: "light" | "gold";
  icon: "gamepad" | "monitor" | "cloud";
};

const NAV_LINKS: StorefrontNavLink[] = [
  { label: "Suscripciones Digitales", href: "#subscriptions" },
  { label: "Impresion 3D", href: "#featured" },
  { label: "Nosotros", href: "#footer" },
];

const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "xbox-1m",
    brand: "XBOX",
    title: "GAME PASS",
    accent: "ULTIMATE",
    priceLabel: "Precio Regular",
    price: 3.99,
    badge: "1 MES",
    image: "/images/xbox_game_pass.png",
    imageAlt: "Tarjeta Xbox Game Pass",
    platform: "Xbox",
    tone: "green",
    actionTheme: "light",
    icon: "gamepad",
  },
  {
    id: "psplus-3m",
    brand: "PLAYSTATION",
    title: "PS PLUS",
    accent: "DELUXE",
    priceLabel: "Precio Final",
    price: 15.5,
    badge: "3 MESES",
    image: "/images/ps5_3d_stand.png",
    imageAlt: "Tarjeta PlayStation Plus",
    platform: "PlayStation",
    tone: "blue",
    actionTheme: "gold",
    icon: "monitor",
  },
  {
    id: "icloud-1m",
    brand: "APPLE",
    title: "iCLOUD+",
    accent: "200 GB",
    priceLabel: "Precio Final",
    price: 2.99,
    badge: "1 MES",
    image: "/images/apple_icloud.png",
    imageAlt: "Tarjeta Apple iCloud Plus",
    platform: "Apple",
    tone: "charcoal",
    actionTheme: "light",
    icon: "cloud",
  },
];

function iconForProduct(icon: ShowcaseProduct["icon"]) {
  if (icon === "gamepad") {
    return <Gamepad2 className="h-4 w-4" />;
  }

  if (icon === "monitor") {
    return <Monitor className="h-4 w-4" />;
  }

  return <Cloud className="h-4 w-4" />;
}

export default function DigitalStorefrontPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const toast = useToast();

  const heroItems: StorefrontHeroItem[] = [
    {
      id: "hero-subscriptions",
      badge: "Destacado",
      title: "Suscripciones al Mejor Precio",
      accent: "Mejor Precio",
      description:
        "Accede a miles de juegos y beneficios exclusivos con Xbox Game Pass, PS Plus y mas. Entrega inmediata.",
      ctaLabel: "Ver Catalogo",
      image: "/images/xbox_game_pass.png",
      imageAlt: "Control de videojuegos con iluminacion verde",
      tone: "green",
      featured: true,
      onCtaClick: () =>
        document
          .getElementById("subscriptions")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "hero-print",
      badge: "Nuevo",
      title: "Bases y Soportes en Impresion 3D",
      accent: "Impresion 3D",
      description:
        "Eleva tu setup al siguiente nivel con soportes personalizados y de alta resistencia para tus consolas y controles.",
      ctaLabel: "Explorar Accesorios",
      image: "/images/ps5_3d_stand.png",
      imageAlt: "Soporte de impresion 3D para consola",
      tone: "blue",
      onCtaClick: () =>
        document
          .getElementById("footer")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const handleAddToCart = (product: ShowcaseProduct) => {
    cart.addItem({
      id: product.id,
      title: `${product.title} ${product.accent}`,
      price: product.price,
      type: "digital",
      platform: product.platform,
      duration: product.badge,
      image: product.image,
    });

    toast.showToast("Producto agregado al carrito", {
      description: `${product.title} ${product.accent}`,
      variant: "success",
    });
  };

  return (
    <>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        onRemove={cart.removeItem}
        onUpdateQuantity={cart.updateQuantity}
        total={cart.total}
        whatsappNumber="1234567890"
        storeName="Raketech Digital"
      />

      <main
        id="top"
        className="min-h-screen"
      >
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
        />

        <div className="mx-auto max-w-[1640px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <section id="featured">
            <StorefrontHeroGrid items={heroItems} />
          </section>

          <section id="subscriptions" className="pt-12">
            <div className="mb-7 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  Suscripciones Digitales
                </h1>
                <p className="text-sm text-[var(--text-muted)] sm:text-base">
                  Codigos originales con entrega instantanea.
                </p>
              </div>

              <a
                href="#top"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-primary)] transition hover:text-[var(--accent-primary-hover)] sm:text-base"
              >
                Ver todas las suscripciones
              </a>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {SHOWCASE_PRODUCTS.map((product) => (
                <StorefrontShowcaseCard
                  key={product.id}
                  brand={product.brand}
                  title={product.title}
                  accent={product.accent}
                  priceLabel={product.priceLabel}
                  price={product.price}
                  badge={product.badge}
                  image={product.image}
                  imageAlt={product.imageAlt}
                  tone={product.tone}
                  actionTheme={product.actionTheme}
                  icon={iconForProduct(product.icon)}
                  onAction={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </section>
        </div>

        <StorefrontFooter
          storeName="Raketech Digital"
          description="Suscripciones digitales premium, codigos originales y accesorios para elevar tu setup con entregas rapidas y soporte cercano."
          whatsappNumber="1234567890"
          columns={[
            {
              title: "Catalogo",
              links: [
                { label: "Xbox Game Pass", href: "#" },
                { label: "PlayStation Plus", href: "#" },
                { label: "Apple iCloud+", href: "#" },
              ],
            },
            {
              title: "Soporte",
              links: [
                { label: "Preguntas Frecuentes", href: "#" },
                { label: "Como funciona", href: "#" },
                { label: "Contacto", href: "#" },
              ],
            },
          ]}
        />
      </main>

      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </>
  );
}
