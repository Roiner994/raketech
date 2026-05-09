"use client";

import { useState, useEffect } from "react";
import {
  CartDrawer,
  StorefrontFooter,
  StorefrontHeader,
  StorefrontProductGrid,
  StorefrontThemeLoadingShell,
  ToastList,
  useCart,
  useToast,
} from "@raketech/ui";
import { PhysicalHero } from "@/components/PhysicalHero";
import { useRouter } from "next/navigation";
import { NAV_LINKS, mapPhysicalFirestoreProduct } from "@/lib/products";
import { Rocket } from "lucide-react";

import type {
  ProductDetail,
  StorefrontGridProduct,
} from "@raketech/ui";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PhysicalStorefrontPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [physicalProducts, setPhysicalProducts] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, "products"), where("type", "==", "physical"));
        const querySnapshot = await getDocs(q);
        const products: ProductDetail[] = [];
        querySnapshot.forEach((productDoc) => {
          products.push(mapPhysicalFirestoreProduct(productDoc.id, productDoc.data()));
        });
        setPhysicalProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const featuredProducts = physicalProducts.filter((product) => product.featured);
  const regularProducts = physicalProducts.filter((product) => !product.featured);

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

  if (isLoading) {
    return (
      <StorefrontThemeLoadingShell
        title="Cargando Raketech"
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
        storeName="Raketech"
      />


      <main id="top" className="min-h-screen">
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
          brandName="Raketech"
          brandMark={<Rocket className="h-6 w-6 text-[var(--accent-primary)]" />}
        />

        <PhysicalHero />

        <div className="mx-auto max-w-[1640px] px-4 py-6 sm:px-6 lg:px-8">
          <div id="catalog-section" className="space-y-14 py-4 sm:space-y-16 sm:py-6">

            {featuredProducts.length > 0 && (
              <section id="featured">
                <StorefrontProductGrid
                  title="Selección Destacada"
                  subtitle="Lo más exclusivo de nuestro taller y catálogo gamer"
                  products={featuredProducts}
                  onAddToCart={handleAdd}
                  onViewDetail={(p) => router.push(`/product/${p.id}`)}
                />
              </section>
            )}

            <section id="catalog">
              <StorefrontProductGrid
                title="Todos los Productos"
                subtitle="Explora nuestra colección completa de piezas 3D y soluciones gaming"
                products={regularProducts}
                onAddToCart={handleAdd}
                onViewDetail={(p) => router.push(`/product/${p.id}`)}
              />
            </section>
          </div>
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
