'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShoppingCart } from 'lucide-react';
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
  subtitle,
  viewAllLabel = 'Explorar todo el catálogo',
  viewAllHref,
  products,
  onAddToCart,
  onViewDetail,
}: DigitalProductGridProps) {
  return (
    <section className="space-y-6">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-tight">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{subtitle}</p>
          )}
        </div>

        {viewAllHref && (
          <a
            href={viewAllHref}
            className="flex shrink-0 items-center gap-2 rounded-md border border-[var(--border-subtle)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-soft)]"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      className={`group relative flex flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-[var(--surface-card)] to-[var(--surface-card-alt)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10 border ${
        featured ? 'border-[var(--accent-primary)]/30' : 'border-[var(--border-subtle)]'
      }`}
    >
      {/* Thumbnail with Overlay */}
      <div
        onClick={onView}
        className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
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
        
        {/* Modern Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

      </div>

      {/* Info Section */}
      <div className="flex flex-col p-6 pt-2">
        <div className="mb-4 space-y-1">
          <h3 className="line-clamp-1 text-lg font-black tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
            {name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-primary)]">
              ${price % 1 === 0 ? price : price.toFixed(2)}
            </span>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              USD
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[var(--bg-primary)] border border-[var(--border-strong)] text-sm font-black text-white transition-all duration-300 hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] group/btn active:scale-95 shadow-lg"
        >
          <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          <span>Añadir al Carrito</span>
        </button>
      </div>
    </article>
  );
}
