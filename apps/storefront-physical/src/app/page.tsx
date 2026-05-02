"use client";

import { useState } from "react";
import { Cpu, Layers3, Package } from "lucide-react";
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

type PhysicalProduct = {
  id: string;
  brand: string;
  title: string;
  accent: string;
  priceLabel: string;
  price: number;
  badge: string;
  image: string;
  imageAlt: string;
  material: string;
  tone: "green" | "blue" | "charcoal";
  actionTheme: "light" | "gold";
  icon: "layers" | "cpu" | "package";
};

const NAV_LINKS: StorefrontNavLink[] = [
  { label: "Productos", href: "#products" },
  { label: "Materiales", href: "#products" },
  { label: "Soporte", href: "#footer" },
];

const PRODUCTS: PhysicalProduct[] = [
  {
    id: "base-ps5-v",
    brand: "CONSOLA",
    title: "BASE PS5",
    accent: "VERTICAL",
    priceLabel: "Precio Final",
    price: 25.0,
    badge: "PLA+",
    image: "/images/ps5_3d_stand.png",
    imageAlt: "Base vertical para PS5",
    material: "PLA+",
    tone: "blue",
    actionTheme: "gold",
    icon: "cpu",
  },
  {
    id: "soporte-auricular",
    brand: "SETUP",
    title: "SOPORTE",
    accent: "AURICULAR",
    priceLabel: "Precio Final",
    price: 15.0,
    badge: "PETG",
    image: "/images/xbox_game_pass.png",
    imageAlt: "Soporte para auriculares gamer",
    material: "PETG",
    tone: "green",
    actionTheme: "light",
    icon: "layers",
  },
  {
    id: "dock-switch",
    brand: "NINTENDO",
    title: "DOCK",
    accent: "SWITCH",
    priceLabel: "Precio Final",
    price: 35.0,
    badge: "RESINA",
    image: "/images/apple_icloud.png",
    imageAlt: "Dock personalizado para Nintendo Switch",
    material: "Resina",
    tone: "charcoal",
    actionTheme: "light",
    icon: "package",
  },
];

function iconForProduct(icon: PhysicalProduct["icon"]) {
  if (icon === "layers") {
    return <Layers3 className="h-4 w-4" />;
  }

  if (icon === "cpu") {
    return <Cpu className="h-4 w-4" />;
  }

  return <Package className="h-4 w-4" />;
}

export default function PhysicalStorefrontPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const toast = useToast();

  const heroItems: StorefrontHeroItem[] = [
    {
      id: "hero-physical",
      badge: "Fabricacion",
      title: "Accesorios y Bases en Impresion 3D",
      accent: "Impresion 3D",
      description:
        "Piezas personalizadas, materiales premium y acabados limpios para consolas, mandos y escritorios gamer.",
      ctaLabel: "Ver Coleccion",
      image: "/images/ps5_3d_stand.png",
      imageAlt: "Accesorio gamer impreso en 3D",
      tone: "blue",
      featured: true,
      onCtaClick: () =>
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "hero-materials",
      badge: "Materiales",
      title: "PLA+, PETG y Resina",
      accent: "para cada uso",
      description:
        "Seleccionamos el material ideal segun resistencia, textura y el look que quieres para tu setup.",
      ctaLabel: "Hablar por WhatsApp",
      image: "/images/apple_icloud.png",
      imageAlt: "Textura y materiales premium",
      tone: "neutral",
      onCtaClick: () =>
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const handleAddToCart = (product: PhysicalProduct) => {
    cart.addItem({
      id: product.id,
      title: `${product.title} ${product.accent}`,
      price: product.price,
      type: "physical",
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
        storeName="Raketech 3D"
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

          <section id="products" className="pt-12">
            <div className="mb-7 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  Catalogo Impreso en 3D
                </h1>
                <p className="text-sm text-[var(--text-muted)] sm:text-base">
                  Piezas resistentes y fabricadas a pedido para setups gamers.
                </p>
              </div>

              <a
                href="#footer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-primary)] transition hover:text-[var(--accent-primary-hover)] sm:text-base"
              >
                Ver materiales y soporte
              </a>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {PRODUCTS.map((product) => (
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
          storeName="Raketech 3D"
          description="Accesorios impresos en 3D para consolas y escritorios, con materiales elegidos para durar y un acabado que se siente premium."
          whatsappNumber="1234567890"
          columns={[
            {
              title: "Piezas",
              links: [
                { label: "Bases para consola", href: "#" },
                { label: "Soportes de escritorio", href: "#" },
                { label: "Disenos personalizados", href: "#" },
              ],
            },
            {
              title: "Materiales",
              links: [
                { label: "PLA+", href: "#" },
                { label: "PETG", href: "#" },
                { label: "Resina", href: "#" },
              ],
            },
          ]}
        />
      </main>

      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </>
  );
}
