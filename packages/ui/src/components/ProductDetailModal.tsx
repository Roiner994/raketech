'use client';

import React, { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProductDetailView, type ProductDetail } from './ProductDetailView';

export interface ProductDetailModalProps {
  product: ProductDetail | null;
  onClose: () => void;
  onAddToCart: (product: ProductDetail, quantity: number, variant?: string) => void;
}

export { type ProductDetail };

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  // Close on ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll while open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
    >
      {/* Blurred dark overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className={[
          'relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl',
          'bg-[#0B1120] border border-white/10 shadow-2xl',
          'max-h-[92vh]',
        ].join(' ')}
        style={{ animation: 'modal-pop 0.22s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-lg bg-white/5 p-2 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto">
          <ProductDetailView product={product} onAddToCart={onAddToCart} />
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes modal-pop {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
    </div>
  );
}
