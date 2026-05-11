"use client";

import { useState, useEffect } from "react";
import {
  CartDrawer,
  StorefrontFooter,
  StorefrontHeader,
  StorefrontThemeLoadingShell,
  ToastList,
  useCart,
  useToast,
} from "@raketech/ui";
import { DigitalProductGrid } from "@/components/DigitalProductGrid";
import { DigitalHero } from "@/components/DigitalHero";
import { DigitalProductModal } from "@/components/DigitalProductModal";
import { useRouter } from "next/navigation";
import { DIGITAL_PRODUCTS, NAV_LINKS, mapDigitalFirestoreProduct } from "@/lib/products";
import type {
  ProductDetail,
  StorefrontGridProduct,
} from "@raketech/ui";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, hasFirebaseConfig } from "@/lib/firebase";

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DigitalStorefrontPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [digitalProducts, setDigitalProducts] = useState<ProductDetail[]>(
    () => (!db ? DIGITAL_PRODUCTS : [])
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!db) {
        setIsLoading(false);
        return;
      }

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

  useEffect(() => {
    if (!hasFirebaseConfig) {
      console.warn(
        "Firebase env vars are missing. Using local fallback products in storefront-digital."
      );
    }
  }, []);
  const featuredProducts = digitalProducts.filter((product) => product.featured);
  const regularProducts = digitalProducts.filter((product) => !product.featured);

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

  const handleViewDetail = (product: StorefrontGridProduct) => {
    setSelectedProduct(product as ProductDetail);
    setIsModalOpen(true);
  };


  if (isLoading) {
    return (
      <StorefrontThemeLoadingShell
        title="Cargando Raketech Digital"
      />
    );
  }

  return (
    <>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        onRemove={cart.removeItem}
        onUpdateQuantity={cart.updateQuantity}
        total={cart.total}
        whatsappNumber="584227180378"
        storeName="Raketech Digital"
      />


      <main id="top" className="min-h-screen bg-[#020617]">
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
          welcomeMessage={{
            title: "Raketech Digital",
            subtitle: "Suscripciones, recargas y gaming"
          }}
        />

        <DigitalHero />

        <div className="mx-auto max-w-[1640px] px-4 py-8 sm:px-6 lg:px-8">
          <div id="catalog-section" className="space-y-14 sm:space-y-16">

            {featuredProducts.length > 0 && (
              <section id="featured">
                <DigitalProductGrid
                  title="Destacados"
                  products={featuredProducts}
                  onAddToCart={handleAdd}
                  onViewDetail={handleViewDetail}
                />
              </section>
            )}

            <section id="catalog">
              <DigitalProductGrid
                title="Catalogo"
                products={regularProducts}
                onAddToCart={handleAdd}
                onViewDetail={handleViewDetail}
              />
            </section>
          </div>
        </div>

        <StorefrontFooter
          storeName="Raketech Digital"
          description="Suscripciones digitales, códigos originales y activaciones para elevar tu setup con una experiencia rápida, confiable y con personalidad propia."
          whatsappNumber="584227180378"
          socialLinks={[
            { platform: 'instagram', href: 'https://www.instagram.com/raketech.ve' },
            { platform: 'facebook', href: 'https://www.facebook.com/Raketech.ve' },
            { platform: 'tiktok', href: 'https://www.tiktok.com/@raketech' }
          ]}
          columns={[
            {
              title: "Catálogo",
              links: [
                { label: "Xbox Game Pass", href: "#catalog" },
                { label: "PlayStation Plus", href: "#catalog" },
                { label: "Nintendo Online", href: "#catalog" },
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

      <DigitalProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={(p, q) => {
          handleAdd(p, q);
          setIsModalOpen(false);
        }}
      />

      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </>
  );
}
