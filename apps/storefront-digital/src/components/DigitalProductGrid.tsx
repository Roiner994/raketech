'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShoppingCart, Eye } from 'lucide-react';
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[rgba(15,23,42,0.35)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${
        featured ? 'border-[rgba(96,165,250,0.2)]' : 'border-[rgba(255,255,255,0.06)]'
      }`}
    >
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
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,26,0.02)_0%,rgba(4,11,26,0.12)_30%,rgba(4,11,26,0.88)_100%)]" />

      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-4 space-y-1.5">
          <h3 className="line-clamp-1 text-base font-black tracking-[-0.02em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
            {name}
          </h3>
          <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--text-secondary)] opacity-80">
            {product.description || 'Activa tu compra sin friccion y lleva tu experiencia a otro nivel.'}
          </p>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-xl font-black text-[var(--text-primary)]">
              ${price % 1 === 0 ? price : price.toFixed(2)}
            </span>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              USD
            </span>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="relative flex h-9 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[rgba(10,20,40,0.6)] border border-[rgba(56,189,248,0.2)] text-[11px] font-black uppercase tracking-[0.05em] text-[#38bdf8] transition-all duration-300 hover:bg-[rgba(56,189,248,0.1)] active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Agregar</span>
          </button>
          {onView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
              className="flex h-9 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
              title="Ver detalle"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
