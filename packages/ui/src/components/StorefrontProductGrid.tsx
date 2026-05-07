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
          <h2 className="text-xl font-bold text-[var(--text-primary)] leading-tight">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[var(--text-muted,#64748B)]">{subtitle}</p>
          )}
        </div>

        {viewAllHref && (
          <a
            href={viewAllHref}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
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
      className="group relative flex flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-[var(--surface-card)] to-[var(--surface-card-alt)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10 border border-[var(--border-subtle)]"
    >
      {/* Thumbnail */}
      <div
        onClick={onView}
        className={[
          'relative aspect-square w-full overflow-hidden cursor-pointer',
          imageBg ?? 'bg-[var(--surface-muted)]',
        ].join(' ')}
        role="button"
        tabIndex={0}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)]">
            {fallbackIcon}
          </div>
        )}
        
        {/* Modern Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

        {/* Hover hint */}
        {onView && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="flex translate-y-2 items-center gap-1.5 rounded-full bg-[var(--bg-card)] px-3 py-1.5 text-[10px] font-black text-[var(--text-primary)] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 uppercase tracking-widest">
              <Eye className="h-3 w-3" />
              Detalle
            </span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5 pt-2">
        <div className="mb-4 space-y-1">
          <button
            onClick={onView}
            className="text-left text-base font-black tracking-tight text-[var(--text-primary)] line-clamp-1 transition-colors hover:text-[var(--accent-primary)]"
          >
            {name}
          </button>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-[var(--text-primary)]">
              ${price % 1 === 0 ? price : price.toFixed(2)}
            </span>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              USD
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="mt-auto relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[var(--bg-primary)] border border-[var(--border-strong)] text-xs font-black text-white transition-all duration-300 hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] group/btn active:scale-95 shadow-lg"
        >
          <Plus className="h-3.5 w-3.5 transition-transform group-hover/btn:rotate-90" />
          <span>Agregar</span>
        </button>
      </div>
    </article>
  );
}
