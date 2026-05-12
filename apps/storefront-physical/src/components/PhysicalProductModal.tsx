'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  X, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Minus,
  Share2,
  Star
} from 'lucide-react';
import Image from 'next/image';
import type { ProductDetail } from '@raketech/ui';

interface PhysicalProductModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ProductDetail, quantity: number) => void;
}

export function PhysicalProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: PhysicalProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
      setIsZoomed(false);
    }
  }, [product?.id]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product) return null;

  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image].filter(Boolean) as string[];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      // In a real app we'd use a toast here
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop with extreme blur and dark tint for contrast */}
      <div
        className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-2xl transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-5xl bg-[var(--bg-card)] border-t sm:border border-[var(--border-subtle)] sm:rounded-[24px] shadow-[var(--shadow-strong)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-24 sm:scale-[0.9] opacity-0'
        } max-h-[96vh] flex flex-col overflow-hidden`}
      >
        {/* Header/Close Button (Fixed on top of content) */}
        <div className="absolute right-6 top-6 z-[60] flex gap-2">
          <button
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-primary)] border border-[var(--border-strong)] text-[var(--text-primary)] backdrop-blur-xl transition-all hover:bg-[var(--bg-secondary)] active:scale-95"
            title="Compartir"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-primary)] border border-[var(--border-strong)] text-[var(--text-primary)] backdrop-blur-xl transition-all hover:bg-[var(--bg-secondary)] active:scale-95"
            title="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Layout Wrapper */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-0">
          
          {/* LEFT COLUMN: Media Gallery */}
          <div className="flex flex-col w-full sm:w-[50%] shrink-0 bg-[var(--bg-secondary)] border-b sm:border-b-0 sm:border-r border-[var(--border-subtle)] min-h-[350px] sm:h-auto">
            <div 
              className={`relative h-[350px] sm:h-auto sm:flex-1 overflow-hidden group cursor-pointer ${isZoomed ? 'bg-white' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {gallery.length > 0 ? (
                <div className="relative h-full w-full">
                  <Image
                    src={gallery[activeImageIndex]}
                    alt={product.imageAlt || product.name}
                    fill
                    className={`transition-all duration-700 ease-out ${isZoomed ? 'object-contain scale-125' : 'object-contain p-8 sm:p-12'}`}
                    priority
                  />
                  
                  {/* Image Overlay Label */}
                  <div className="absolute bottom-6 left-6 hidden sm:block">
                     <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        {activeImageIndex + 1} / {gallery.length}
                     </span>
                  </div>

                  {/* Navigation Arrows */}
                  {gallery.length > 1 && !isZoomed && (
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--bg-primary)]"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--bg-primary)]"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[var(--accent-primary)]/10">
                  <Star className="h-32 w-32 animate-pulse" />
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            {gallery.length > 1 && (
              <div className="p-4 sm:p-6 bg-[var(--bg-card)]/50 backdrop-blur-md border-t border-[var(--border-subtle)] overflow-x-auto no-scrollbar flex gap-3 justify-center">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      activeImageIndex === idx 
                        ? 'border-[var(--accent-primary)] scale-110 shadow-md' 
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Info */}
          <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-card)] min-h-0">
            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-12 space-y-10">
              
              {/* Essential Header */}
              <div className="space-y-4">
                {product.category && (
                  <div className="flex items-center">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--accent-primary)]">{product.category}</span>
                  </div>
                )}
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] leading-[1.1]">
                  {product.name}
                </h2>
              </div>

              {/* Purchase Hub */}
              <div className="flex items-center justify-between py-8 border-y border-[var(--border-subtle)]">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Inversión</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-[var(--text-primary)] tracking-tighter">
                      ${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">USD</span>
                  </div>
                </div>

                {/* Brutalist Quantity Pill */}
                <div className="flex items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--border-strong)] rounded-full p-1.5 shadow-inner">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all active:scale-90 shadow-sm"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="px-4 min-w-[40px] flex items-center justify-center">
                    <span className="text-base font-black text-[var(--text-primary)] tabular-nums">{quantity}</span>
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all active:scale-90 shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Description & Details */}
              <div className="space-y-12">
                {/* Text Description */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-muted)]">El Producto</h3>
                    <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-medium max-w-[65ch]">
                      {product.description || 'Diseño de precisión y calidad superior. Este producto físico ha sido fabricado con los más altos estándares para garantizar durabilidad y un acabado excepcional.'}
                    </p>
                  </div>

                  {product.featuresHtml && (
                    <div className="space-y-4 pt-4">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-muted)]">Especificaciones Técnicas</h3>
                      <div className="py-2 bg-[var(--bg-secondary)]/30 rounded-2xl p-6 border border-[var(--border-subtle)]">
                        <div 
                          className="prose prose-slate max-w-none prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-li:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] prose-ul:list-disc prose-ul:pl-4 prose-p:my-2"
                          dangerouslySetInnerHTML={{ __html: product.featuresHtml }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Padding for Mobile Action Bar */}
              <div className="h-28 sm:hidden" />
            </div>

            {/* Brutalist Sticky Action Footer */}
            <div className="p-6 sm:p-10 border-t border-[var(--border-subtle)] bg-[var(--bg-card)]/95 backdrop-blur-xl sm:bg-transparent sm:backdrop-blur-none">
              <button
                onClick={() => onAddToCart(product, quantity)}
                disabled={product.inStock === false}
                className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-5 text-[14px] font-black uppercase tracking-[0.15em] transition-all duration-500 shadow-xl ${
                  product.inStock !== false 
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)] hover:text-white cursor-pointer active:scale-[0.98]' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-strong)] cursor-not-allowed opacity-50'
                }`}
              >
                <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>{product.inStock !== false ? 'Añadir al Carrito' : 'Agotado'}</span>
                
                {/* Decorative glow effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-strong);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
