'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import type { StorefrontGridProduct } from '@raketech/ui';

interface DigitalProductGridProps {
  title: string;
  subtitle?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  products: StorefrontGridProduct[];
  onAddToCart?: (product: StorefrontGridProduct) => void;
  onViewDetail?: (product: StorefrontGridProduct) => void;
}

export function DigitalProductGrid({
  title,
  products,
  onAddToCart,
  onViewDetail,
}: DigitalProductGridProps) {
  return (
    <section className="space-y-7">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-6 bg-blue-500 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
            {title}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <DigitalProductCard
            key={product.id}
            product={product}
            onAdd={() => onAddToCart?.(product)}
            onView={onViewDetail ? () => onViewDetail(product) : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function DigitalProductCard({
  product,
  onAdd,
  onView,
}: {
  product: StorefrontGridProduct;
  onAdd: () => void;
  onView?: () => void;
}) {
  const { name, price, image, imageAlt, featured } = product;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[28px] border bg-[rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] ${
        featured 
          ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
          : 'border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
      }`}
    >
      {/* Badge removed for cleaner look */}

      <div
        onClick={onView}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden"
        role="button"
        tabIndex={0}
      >
        {image && (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        )}
        
        {/* Overlay en Hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]">
           <Eye className="h-5 w-5 text-white/50" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-4 space-y-1">
          <h3 className="line-clamp-1 text-sm sm:text-base font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
            {name}
          </h3>
          <p className="line-clamp-2 text-[10px] leading-relaxed text-slate-500 font-medium">
            {product.description || 'Eleva tu setup digital con códigos originales.'}
          </p>
          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ${price % 1 === 0 ? price : price.toFixed(2)}
            </span>
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              USD
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="relative flex h-10 sm:h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/30 active:scale-[0.98] group/btn"
          >
            <ShoppingCart className="h-3.5 w-3.5 text-blue-400 transition-colors group-hover:text-blue-300" />
            <span className="transition-colors group-hover:text-blue-300">Agregar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
