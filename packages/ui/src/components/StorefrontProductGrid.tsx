'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Plus, Eye } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface StorefrontGridProduct {
  id: string;
  /** Short product name shown under the image */
  name: string;
  /** Price in USD (number) */
  price: number;
  /** Image path (served from /public) */
  image: string;
  imageAlt: string;
  /**
   * Optional fallback icon shown when there is no product image.
   * Pass a Lucide icon element, e.g. `<Gamepad2 className="w-10 h-10" />`.
   */
  fallbackIcon?: React.ReactNode;
  /** Highlight the card with a primary-accent border */
  featured?: boolean;
  /** Background colour token for the image area — defaults to dark panel */
  imageBg?: string;
}

export interface StorefrontProductGridProps {
  /** Section heading, e.g. "Accesorios 3D" */
  title: string;
  /** Short descriptor beneath the heading */
  subtitle?: string;
  /** Label and href for the "view all" link */
  viewAllLabel?: string;
  viewAllHref?: string;
  /** Products to render */
  products: StorefrontGridProduct[];
  /** Called when a product's add button is clicked */
  onAddToCart?: (product: StorefrontGridProduct) => void;
  /** Called when a product card/image is clicked to view its detail */
  onViewDetail?: (product: StorefrontGridProduct) => void;
}

// ─── Component ─────────────────────────────────────────────────────────────

export function StorefrontProductGrid({
  title,
  subtitle,
  viewAllLabel = 'Ver todos',
  viewAllHref,
  products,
  onAddToCart,
  onViewDetail,
}: StorefrontProductGridProps) {
  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[var(--text-muted,#64748B)]">{subtitle}</p>
          )}
        </div>

        {viewAllHref && (
          <a
            href={viewAllHref}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-300 transition-colors hover:text-white"
          >
            {viewAllLabel}
            <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductGridCard
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

// ─── Internal card ─────────────────────────────────────────────────────────

function ProductGridCard({
  product,
  onAdd,
  onView,
}: {
  product: StorefrontGridProduct;
  onAdd: () => void;
  onView?: () => void;
}) {
  const { name, price, image, imageAlt, fallbackIcon, featured, imageBg } = product;

  return (
    <article
      className={[
        'group flex flex-col overflow-hidden rounded-xl transition-all',
        'bg-[var(--surface-card,#0F172A)]',
        featured
          ? 'border-2 border-[var(--accent-primary,#3B82F6)] shadow-lg shadow-[var(--accent-primary,#3B82F6)]/20'
          : 'border border-[rgba(255,255,255,0.07)] hover:border-[var(--accent-primary,#3B82F6)]/40',
      ].join(' ')}
    >
      {/* Thumbnail — clicking opens detail view */}
      <button
        onClick={onView}
        disabled={!onView}
        className={[
          'relative aspect-square w-full overflow-hidden',
          imageBg ?? 'bg-[#111827]',
          onView ? 'cursor-pointer' : 'cursor-default',
        ].join(' ')}
        aria-label={`Ver detalle de ${name}`}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600">
            {fallbackIcon}
          </div>
        )}

        {/* Hover overlay with "Ver detalle" hint */}
        {onView && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
            <span className="flex translate-y-2 items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Eye className="h-3 w-3" />
              Ver detalle
            </span>
          </div>
        )}
      </button>

      {/* Info + action */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <button
          onClick={onView}
          disabled={!onView}
          className="text-left text-xs font-semibold leading-tight text-white line-clamp-2 hover:text-blue-300 transition-colors disabled:hover:text-white"
        >
          {name}
        </button>
        <p className="text-sm font-bold text-slate-200">${price.toFixed(2)}</p>

        <button
          onClick={onAdd}
          className={[
            'mt-auto flex w-full items-center justify-center gap-1 rounded-lg py-3.5',
            'text-xs font-bold transition-all',
            featured
              ? 'bg-[var(--accent-primary,#3B82F6)] text-white hover:brightness-110'
              : [
                  'border border-[rgba(255,255,255,0.08)]',
                  'bg-[rgba(255,255,255,0.04)]',
                  'text-slate-300',
                  'hover:bg-[var(--accent-primary,#3B82F6)] hover:text-white hover:border-transparent',
                ].join(' '),
          ].join(' ')}
        >
          <Plus className="h-3 w-3" />
          Agregar
        </button>
      </div>
    </article>
  );
}
