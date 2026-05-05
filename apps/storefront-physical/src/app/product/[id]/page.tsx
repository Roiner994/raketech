'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  ProductDetailView,
  StorefrontHeader,
  StorefrontFooter,
  CartDrawer,
  StorefrontThemeLoadingShell,
  ToastList,
  useCart,
  useToast,
} from '@raketech/ui';
import { NAV_LINKS, mapPhysicalFirestoreProduct } from '@/lib/products';
import type { ProductDetail } from "@raketech/ui";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCart();
  const toast = useToast();

  const id = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(mapPhysicalFirestoreProduct(docSnap.id, docSnap.data()));
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = (qty: number, variant?: string) => {
    if (!product) return;
    
    cart.addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      type: 'physical',
      image: product.image,
      quantity: qty,
      variant,
    });

    toast.showToast('Producto agregado al carrito', {
      description: `${qty}x ${product.name}${variant ? ` (${variant})` : ''}`,
      variant: 'success',
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

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
        />

        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <StorefrontThemeLoadingShell
              title="Cargando producto 3D"
              description="Preparando el detalle y el tema correcto."
            />
          ) : !product ? (
            <div className="flex flex-col items-center justify-center py-24">
              <h1 className="text-4xl font-black text-[var(--text-primary)]">Producto no encontrado</h1>
              <button
                onClick={() => router.push('/')}
                className="mt-6 flex items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver a la tienda
              </button>
            </div>
          ) : (
            <>
              {/* Back button */}
              <button
                onClick={() => router.push('/')}
                className="group mb-8 flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] transition-all hover:text-[var(--text-primary)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-back-button)] transition-colors group-hover:bg-[var(--surface-back-button-hover)]">
                  <ArrowLeft className="h-4 w-4" />
                </div>
                Volver al Catálogo
              </button>

              <ProductDetailView 
                product={product!} 
                onAddToCart={(_, qty, variant) => handleAdd(qty, variant)}
                isPage 
              />
            </>
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
                { label: "Bases para consola", href: "/#products" },
                { label: "Soportes de escritorio", href: "/#products" },
                { label: "Diseños personalizados", href: "/#products" },
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
