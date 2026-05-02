'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  ProductDetailView,
  StorefrontHeader,
  StorefrontFooter,
  CartDrawer,
  ToastList,
  useCart,
  useToast,
} from '@raketech/ui';
import { NAV_LINKS } from '@/lib/products';
import type { ProductDetail } from "@raketech/ui";
import { db } from "@raketech/ui";
import { doc, getDoc } from "firebase/firestore";

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
          const data = docSnap.data();
          setProduct({
            id: docSnap.id,
            name: data.title,
            price: data.price,
            image: data.imageUrl || "/images/placeholder.png",
            imageAlt: data.title,
            imageBg: "bg-slate-800",
            category: data.category || "General",
            description: data.description || "",
            features: [], // Handled by featuresHtml
            featuresHtml: data.featuresHtml || "",
            gallery: data.imageUrl ? [data.imageUrl] : [],
            variants: data.material ? [data.material] : undefined,
          });
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

      <main className="min-h-screen bg-[#0B1120]">
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
        />

        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : !product ? (
            <div className="flex flex-col items-center justify-center py-24">
              <h1 className="text-4xl font-black text-white">Producto no encontrado</h1>
              <button
                onClick={() => router.push('/')}
                className="mt-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
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
                className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-400 transition-all hover:text-white group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
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
