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
import { NAV_LINKS, mapDigitalFirestoreProduct } from '@/lib/products';
import type { ProductDetail } from '@raketech/ui';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, "products", params.id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().type === 'digital') {
          setProduct(mapDigitalFirestoreProduct(docSnap.id, docSnap.data()));
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120]">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B1120] text-white">
        <h1 className="text-4xl font-black">Producto no encontrado</h1>
        <button
          onClick={() => router.push('/')}
          className="mt-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a la tienda
        </button>
      </div>
    );
  }

  const handleAdd = (qty: number, variant?: string) => {
    cart.addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      type: 'digital',
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
        storeName="Raketech Digital"
      />

      <main className="min-h-screen bg-[#0B1120]">
        <StorefrontHeader
          links={NAV_LINKS}
          cartCount={cart.itemCount}
          cartTotal={cart.total}
          onCartClick={() => setIsCartOpen(true)}
        />

        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
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
            product={product} 
            onAddToCart={(_, qty, variant) => handleAdd(qty, variant)}
            isPage 
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
                { label: "Xbox Game Pass", href: "/#subscriptions" },
                { label: "PlayStation Plus", href: "/#subscriptions" },
                { label: "Apple iCloud+", href: "/#subscriptions" },
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
