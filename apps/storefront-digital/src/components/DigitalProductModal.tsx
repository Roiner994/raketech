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

interface DigitalProductModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ProductDetail, quantity: number) => void;
}

export function DigitalProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: DigitalProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop with extreme blur */}
      <div
        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-2xl transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-4xl bg-[#081223] border-t sm:border border-[rgba(59,130,246,0.15)] sm:rounded-[40px] shadow-[0_64px_128px_rgba(0,0,0,0.9)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-24 sm:scale-[0.9] opacity-0'
        } max-h-[96vh] flex flex-col overflow-hidden`}
      >
        {/* Header/Close Button (Fixed on top of content) */}
        <div className="absolute right-6 top-6 z-[60] flex gap-2">
          <button
            onClick={handleShare}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
            title="Compartir"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
            title="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Layout Wrapper */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-0">
          
          {/* LEFT COLUMN: Media Gallery */}
          <div className="flex flex-col w-full sm:w-[400px] shrink-0 bg-[#040a15] border-b sm:border-b-0 sm:border-r border-white/5 min-h-[300px] sm:h-auto">
            <div 
              className={`relative h-[300px] sm:h-auto sm:flex-1 overflow-hidden group cursor-pointer ${isZoomed ? 'bg-black' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {gallery.length > 0 ? (
                <div className="relative h-full w-full">
                  <Image
                    src={gallery[activeImageIndex]}
                    alt={product.imageAlt || product.name}
                    fill
                    sizes="(max-width: 639px) 100vw, 400px"
                    className={`transition-all duration-700 ease-out ${isZoomed ? 'object-contain scale-125' : 'object-contain p-4'}`}
                    priority
                  />
                  
                  {/* Image Overlay Label */}
                  <div className="absolute bottom-6 left-6 hidden sm:block">
                     <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        {activeImageIndex + 1} / {gallery.length}
                     </span>
                  </div>

                  {/* Navigation Arrows */}
                  {gallery.length > 1 && !isZoomed && (
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="pointer-events-auto h-10 w-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="pointer-events-auto h-10 w-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-blue-500/10">
                  <Star className="h-32 w-32 animate-pulse" />
                </div>
              )}
            </div>

            {/* Thumbnails Row (Fixed at bottom of gallery column) */}
            {gallery.length > 1 && (
              <div className="p-3 sm:p-6 bg-[#081223]/50 backdrop-blur-md border-t border-white/5 overflow-x-auto no-scrollbar flex gap-2 sm:gap-3 justify-center">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-lg overflow-hidden border transition-all duration-300 ${
                      activeImageIndex === idx 
                        ? 'border-blue-500 scale-105' 
                        : 'border-white/5 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Info */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#081223] min-h-0">
            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 space-y-10">
              
              {/* Essential Header */}
              <div className="space-y-4">
                {product.category && (
                  <div className="flex items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{product.category}</span>
                  </div>
                )}
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-[1.1]">
                  {product.name}
                </h2>
              </div>

              {/* Purchase Hub: Elegant & Integrated */}
              <div className="flex items-center justify-between py-8 border-y border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Valor</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-white tracking-tighter">
                      ${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600">USD</span>
                  </div>
                </div>

                {/* Minimalist Quantity Pill */}
                <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <div className="px-3 min-w-[32px] flex items-center justify-center">
                    <span className="text-sm font-black text-white tabular-nums">{quantity}</span>
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="space-y-3 pt-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Región / Edición</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((v) => (
                        <button
                          key={v.value}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-95"
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Description & Details */}
              <div className="space-y-12">
                {/* Text Description */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Descripción</h3>
                    <p className="text-[16px] leading-[1.6] text-slate-300 font-medium max-w-[65ch]">
                      {product.description || 'Eleva tu experiencia digital con este producto premium. Garantizamos compatibilidad total y soporte experto en cada paso del proceso.'}
                    </p>
                  </div>

                  {product.featuresHtml && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Especificaciones Técnicas</h3>
                      <div className="py-2">
                        <div 
                          className="prose prose-invert prose-blue max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-li:text-slate-400 prose-strong:text-white prose-ul:list-disc prose-ul:pl-4 prose-p:my-2"
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

            {/* Sticky Action Footer */}
            <div className="p-6 sm:px-10 sm:pb-10 border-t border-white/5 bg-[#081223]/95 backdrop-blur-xl sm:bg-transparent sm:backdrop-blur-none">
              <button
                onClick={() => onAddToCart(product, quantity)}
                disabled={product.inStock === false}
                className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 border border-white/10 ${
                  product.inStock !== false 
                    ? 'text-blue-400 hover:bg-blue-500/5 hover:border-blue-500/30 cursor-pointer active:scale-[0.98]' 
                    : 'text-slate-500 bg-slate-900/50 cursor-not-allowed opacity-50'
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{product.inStock !== false ? 'Añadir al Carrito' : 'Sin Stock'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.2);
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
