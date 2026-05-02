"use client";

import { useState } from "react";
import { Cloud, Gamepad2 } from "lucide-react";
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
import { DIGITAL_PRODUCTS, NAV_LINKS } from "@/lib/products";
import type {
  ProductDetail,
  StorefrontGridProduct,
  StorefrontHeroItem,
} from "@raketech/ui";

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DigitalStorefrontPage() {
  const router = useRouter();
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
        "Accede a miles de juegos y beneficios exclusivos con Xbox Game Pass, PS Plus y más. Entrega inmediata.",
      ctaLabel: "Ver Catálogo",
      image: "/images/xbox_game_pass.png",
      imageAlt: "Control de videojuegos con iluminación verde",
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
      title: "Bases y Soportes en Impresión 3D",
      accent: "Impresión 3D",
      description:
        "Eleva tu setup al siguiente nivel con soportes personalizados y de alta resistencia para tus consolas y controles.",
      ctaLabel: "Explorar Accesorios",
      image: "/images/ps5_3d_stand.png",
      imageAlt: "Soporte de impresión 3D para consola",
      tone: "blue",
      onCtaClick: () =>
        document
          .getElementById("footer")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const handleAdd = (product: StorefrontGridProduct, quantity: number = 1) => {
    cart.addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      type: "digital",
      image: product.image,
      quantity,
    });

    toast.showToast("Producto agregado al carrito", {
      description: `${quantity}x ${product.name}`,
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

          <section id="subscriptions" className="pt-12">
            <StorefrontProductGrid
              title="Suscripciones Digitales"
              subtitle="Códigos originales con entrega instantánea."
              viewAllLabel="Ver todas las suscripciones"
              viewAllHref="/catalog"
              products={DIGITAL_PRODUCTS}
              onAddToCart={handleAdd}
              onViewDetail={(p) => router.push(`/product/${p.id}`)}
            />
          </section>
        </div>

        <StorefrontFooter
          storeName="Raketech Digital"
          description="Suscripciones digitales premium, códigos originales y accesorios para elevar tu setup con entregas rápidas y soporte cercano."
          whatsappNumber="1234567890"
          columns={[
            {
              title: "Catálogo",
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
                { label: "Cómo funciona", href: "#" },
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
