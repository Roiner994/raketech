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
        bg-[#1E293B] rounded-2xl border overflow-hidden flex flex-col
        transition-all duration-300 group
        hover:shadow-xl hover:-translate-y-1
        ${isDigital ? 'border-slate-800 hover:border-[#10B981]/40 hover:shadow-[#10B981]/5' : 'border-slate-800 hover:border-slate-600 hover:shadow-black/40'}
      `}
    >
      {/* Image / Placeholder */}
      <div
        className={`relative h-48 flex items-center justify-center overflow-hidden ${
          isDigital
            ? 'bg-gradient-to-br from-[#0B1120] to-slate-900'
            : 'bg-slate-800'
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl border border-slate-700">
            {isDigital ? (
              <Gamepad2 className="w-10 h-10 text-[#10B981]" />
            ) : (
              <Printer className="w-10 h-10 text-slate-400" />
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

        <h3 className="text-base font-bold text-white mb-1 leading-snug line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-800/60">
          <div>
            {originalPrice && (
              <p className="text-xs text-slate-500 line-through mb-0.5">
                ${originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-xl font-bold text-white">${price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => !isOutOfStock && onAddToCart?.(product)}
            disabled={isOutOfStock}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
              transition-all duration-200 active:scale-95
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E293B]
              disabled:opacity-40 disabled:pointer-events-none
              ${
                isDigital
                  ? 'bg-[#10B981]/10 hover:bg-[#10B981] text-[#10B981] hover:text-white border border-[#10B981]/20 focus-visible:ring-[#10B981]'
                  : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 focus-visible:ring-slate-400'
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
