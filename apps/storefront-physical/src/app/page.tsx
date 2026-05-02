"use client";

import { useState } from "react";
import { Cpu, Layers3, Package, Gamepad2 } from "lucide-react";
import {
  CartDrawer,
  ProductDetailModal,
  StorefrontFooter,
  StorefrontHeader,
  StorefrontHeroGrid,
  StorefrontProductGrid,
  ToastList,
  useCart,
  useToast,
  StorefrontNavLink,
} from "@raketech/ui";
import { useRouter } from "next/navigation";
import { PHYSICAL_PRODUCTS, NAV_LINKS } from "@/lib/products";
import type {
  ProductDetail,
  StorefrontGridProduct,
  StorefrontHeroItem,
} from "@raketech/ui";

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PhysicalStorefrontPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const toast = useToast();

  const heroItems: StorefrontHeroItem[] = [
    {
      id: "hero-physical",
      badge: "Fabricación",
      title: "Accesorios y Bases en Impresión 3D",
      accent: "Impresión 3D",
      description:
        "Piezas personalizadas, materiales premium y acabados limpios para consolas, mandos y escritorios gamer.",
      ctaLabel: "Ver Colección",
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
        "Seleccionamos el material ideal según resistencia, textura y el look que quieres para tu setup.",
      ctaLabel: "Hablar por WhatsApp",
      image: "/images/apple_icloud.png",
      imageAlt: "Textura y materiales premium",
      tone: "neutral",
      onCtaClick: () =>
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const handleAdd = (product: StorefrontGridProduct, quantity: number = 1, variant?: string) => {
    cart.addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      type: "physical",
      image: product.image,
      quantity,
      variant,
    });

    toast.showToast("Producto agregado al carrito", {
      description: `${quantity}x ${product.name}${variant ? ` (${variant})` : ''}`,
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


      <main id="top" className="min-h-screen">
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
            <StorefrontProductGrid
              title="Accesorios 3D"
              subtitle="Diseños exclusivos, máxima resistencia para tu setup."
              viewAllLabel="Ver accesorios"
              viewAllHref="/catalog"
              products={PHYSICAL_PRODUCTS}
              onAddToCart={handleAdd}
              onViewDetail={(p) => router.push(`/product/${p.id}`)}
            />
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
                { label: "Diseños personalizados", href: "#" },
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
