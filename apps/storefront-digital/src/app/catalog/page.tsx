"use client";

import { useState, useEffect } from "react";
import {
  CartDrawer,
  StorefrontFooter,
  StorefrontHeader,
  StorefrontThemeLoadingShell,
  StorefrontProductGrid,
  ToastList,
  useCart,
  useToast,
} from "@raketech/ui";
import { useRouter } from "next/navigation";
import { DIGITAL_PRODUCTS, NAV_LINKS, mapDigitalFirestoreProduct } from "@/lib/products";
import type { StorefrontGridProduct, ProductDetail } from "@raketech/ui";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, hasFirebaseConfig } from "@/lib/firebase";

export default function DigitalCatalogPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [digitalProducts, setDigitalProducts] = useState<ProductDetail[]>(
    () => (!db ? DIGITAL_PRODUCTS : [])
  );
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return (
      <StorefrontThemeLoadingShell
        title="Cargando catálogo digital"
        description="Preparando todas las suscripciones y el tema correcto."
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
        whatsappNumber="1234567890"
        storeName="Raketech Digital"
      />

      <main className="min-h-screen pt-20">
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
        />

        <div className="mx-auto max-w-[1640px] px-4 py-8 sm:px-6 lg:px-8">
          <StorefrontProductGrid
            title="Todas las Suscripciones"
            subtitle="Explora nuestro catálogo completo de suscripciones digitales."
            products={digitalProducts}
            onAddToCart={handleAdd}
            onViewDetail={(p) => router.push(`/product/${p.id}`)}
          />
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
