'use client';

import React from 'react';
import { Gamepad2, Printer, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/Badge';

export interface ProductCardData {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: 'digital' | 'physical';
  // Digital-specific
  platform?: string;
  duration?: string;
  // Physical-specific
  material?: string;
  stock?: number;
  imageUrl?: string;
}

interface ProductCardProps {
  product: ProductCardData;
  onAddToCart?: (product: ProductCardData) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const {
    title,
    description,
    price,
    originalPrice,
    type,
    platform,
    duration,
    material,
    stock,
    imageUrl,
  } = product;

  const isDigital = type === 'digital';
  const isOutOfStock = !isDigital && stock !== undefined && stock <= 0;

  return (
    <div
      className={`
        bg-[var(--bg-card)] rounded-2xl border overflow-hidden flex flex-col
        transition-all duration-300 group
        hover:shadow-xl hover:-translate-y-1
        ${isDigital ? 'border-[var(--border-subtle)] hover:border-[var(--accent-success)]/40 hover:shadow-[var(--accent-success)]/5' : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-black/40'}
      `}
    >
      {/* Image / Placeholder */}
      <div
        className={`relative h-48 flex items-center justify-center overflow-hidden ${
          isDigital
            ? 'bg-gradient-to-br from-[var(--surface-card-alt)] to-[var(--bg-primary)]'
            : 'bg-[var(--surface-muted)]'
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-20 h-20 bg-[var(--surface-interactive)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl border border-[var(--border-subtle)]">
            {isDigital ? (
              <Gamepad2 className="w-10 h-10 text-[var(--accent-success)]" />
            ) : (
              <Printer className="w-10 h-10 text-[var(--text-muted)]" />
            )}
          </div>
        )}

        {/* Top-right badge */}
        {duration && (
          <div className="absolute top-3 right-3">
            <Badge variant="duration">{duration}</Badge>
          </div>
        )}
        {material && !imageUrl && (
          <div className="absolute top-3 left-3">
            <Badge variant="material">{material}</Badge>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-slate-300 font-semibold text-sm">Sin Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Type badge */}
        <div className="mb-2">
          {platform ? (
            <Badge variant="digital">{platform}</Badge>
          ) : material ? (
            <Badge variant="physical">{material}</Badge>
          ) : null}
        </div>

        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1 leading-snug line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-800/60">
          <div>
            {originalPrice && (
              <p className="text-xs text-[var(--text-muted)] line-through mb-0.5">
                ${originalPrice % 1 === 0 ? originalPrice : originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-xl font-bold text-[var(--text-primary)]">${price % 1 === 0 ? price : price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => !isOutOfStock && onAddToCart?.(product)}
            disabled={isOutOfStock}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
              transition-all duration-200 active:scale-95
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-card)]
              disabled:opacity-40 disabled:pointer-events-none
              ${
                isDigital
                  ? 'bg-[var(--accent-success)]/10 hover:bg-[var(--accent-success)] text-[var(--accent-success)] hover:text-white border border-[var(--accent-success)]/20 focus-visible:ring-[var(--accent-success)]'
                  : 'bg-[var(--text-primary)] hover:bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:text-white border border-[var(--text-primary)] hover:border-[var(--accent-primary)] focus-visible:ring-[var(--accent-primary)]'
              }
            `}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isDigital ? 'Agregar' : 'Agregar'}
          </button>
        </div>

        {/* Stock indicator (physical only) */}
        {!isDigital && stock !== undefined && stock > 0 && (
          <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
            {stock} en stock
          </p>
        )}
      </div>
    </div>
  );
}
