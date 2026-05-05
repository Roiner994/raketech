"use client";

import { useState, useEffect } from "react";
import {
  CartDrawer,
  StorefrontFooter,
  StorefrontHeader,
  StorefrontProductGrid,
  ToastList,
  useCart,
  useToast,
} from "@raketech/ui";
import { useRouter } from "next/navigation";
import { NAV_LINKS, mapPhysicalFirestoreProduct } from "@/lib/products";
import type { StorefrontGridProduct, ProductDetail } from "@raketech/ui";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PhysicalCatalogPage() {
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

      <main className="min-h-screen pt-20">
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
        />

        <div className="mx-auto max-w-[1640px] px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <StorefrontProductGrid
              title="Todos los Accesorios"
              subtitle="Explora nuestro catálogo completo de accesorios y bases 3D."
              products={physicalProducts}
              onAddToCart={handleAdd}
              onViewDetail={(p) => router.push(`/product/${p.id}`)}
            />
          )}
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
