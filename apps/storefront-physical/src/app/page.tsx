"use client";

import { useState, useEffect } from "react";
import {
  CartDrawer,
  StorefrontFooter,
  StorefrontFeaturedCarousel,
  StorefrontHeader,
  StorefrontProductGrid,
  StorefrontThemeLoadingShell,
  ToastList,
  useCart,
  useToast,
} from "@raketech/ui";
import { useRouter } from "next/navigation";
import { NAV_LINKS, mapPhysicalFirestoreProduct } from "@/lib/products";
import type {
  ProductDetail,
  StorefrontGridProduct,
} from "@raketech/ui";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── Page ────────────────────────────────────────────────────────────────────

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
  const featuredProducts = physicalProducts.filter((product) => product.featured).slice(0, 6);
  const heroProducts = featuredProducts.length > 0 ? featuredProducts : physicalProducts.slice(0, 6);

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
        title="Cargando Raketech 3D"
        description="Preparando accesorios, destacados y el tema correcto."
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
            <StorefrontFeaturedCarousel
              products={heroProducts}
              onViewProduct={(product) => router.push(`/product/${product.id}`)}
              onBrowseCatalog={() => router.push("/catalog")}
              emptyTitle="Lo mejor de Raketech 3D se mostrará aquí"
              emptyDescription="Marca productos como destacados desde el panel para convertir ofertas, diseños nuevos o piezas premium en la primera impresión de la tienda."
            />
          </section>

          <section id="products" className="pt-12">
            <StorefrontProductGrid
              title="Accesorios 3D"
              subtitle="Diseños exclusivos, máxima resistencia para tu setup."
              viewAllLabel="Ver accesorios"
              viewAllHref="/catalog"
              products={physicalProducts}
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
