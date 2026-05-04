"use client";

import { useState, useEffect } from "react";
import {
  CartDrawer,
  StorefrontFooter,
  StorefrontFeaturedCarousel,
  StorefrontHeader,
  StorefrontProductGrid,
  ToastList,
  useCart,
  useToast,
} from "@raketech/ui";
import { useRouter } from "next/navigation";
import { NAV_LINKS, mapDigitalFirestoreProduct } from "@/lib/products";
import type {
  ProductDetail,
  StorefrontGridProduct,
} from "@raketech/ui";
import { db } from "@raketech/ui";
import { collection, getDocs, query, where } from "firebase/firestore";

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DigitalStorefrontPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [digitalProducts, setDigitalProducts] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, "products"), where("type", "==", "digital"));
        const querySnapshot = await getDocs(q);
        const products: ProductDetail[] = [];
        querySnapshot.forEach((productDoc) => {
          products.push(mapDigitalFirestoreProduct(productDoc.id, productDoc.data()));
        });
        setDigitalProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const featuredProducts = digitalProducts.filter((product) => product.featured).slice(0, 6);
  const heroProducts = featuredProducts.length > 0 ? featuredProducts : digitalProducts.slice(0, 6);

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
            <StorefrontFeaturedCarousel
              products={heroProducts}
              onViewProduct={(product) => router.push(`/product/${product.id}`)}
              onBrowseCatalog={() => router.push("/catalog")}
              emptyTitle="Tus mejores ofertas digitales pueden vivir aquí"
              emptyDescription="Marca productos como destacados desde el panel para que las suscripciones en oferta o con mejor conversión sean lo primero que vea cada visitante."
            />
          </section>

          <section id="subscriptions" className="pt-12">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              <StorefrontProductGrid
                title="Suscripciones Digitales"
                subtitle="Códigos originales con entrega instantánea."
                viewAllLabel="Ver todas las suscripciones"
                viewAllHref="/catalog"
                products={digitalProducts}
                onAddToCart={handleAdd}
                onViewDetail={(p) => router.push(`/product/${p.id}`)}
              />
            )}
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
