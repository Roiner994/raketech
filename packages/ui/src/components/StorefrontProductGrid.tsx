'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Plus, Eye, ShoppingCart } from 'lucide-react';

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
  /** Optional description for the product card */
  description?: string;
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
    <section className="space-y-8">
      {/* Section header inspired by digital */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-6 bg-[var(--accent-primary)] rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-primary)]">
            {title}
          </span>
        </div>
        {subtitle && (
          <p className="text-xs font-medium text-[var(--text-muted)] max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
      className={`group relative flex flex-col overflow-hidden rounded-[32px] border bg-[var(--bg-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-strong)] ${
        featured 
          ? 'border-[var(--accent-primary)]/40 shadow-[0_0_20px_var(--accent-primary)]/10' 
          : 'border-[var(--border-subtle)] shadow-[var(--shadow-soft)]'
      }`}
    >
      <div
        onClick={onView}
        className={[
          'relative aspect-[4/3] w-full overflow-hidden cursor-pointer',
          imageBg ?? 'bg-[var(--bg-secondary)]',
        ].join(' ')}
        role="button"
        tabIndex={0}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)]">
            {fallbackIcon}
          </div>
        )}
        
        {/* Modern Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-20" />

        {/* Hover hint Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--bg-card)]/80 text-[var(--text-primary)] shadow-lg transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              <Eye className="h-5 w-5" />
           </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-5 space-y-2">
          <button
            onClick={onView}
            className="text-left text-sm sm:text-base font-black tracking-tight text-[var(--text-primary)] line-clamp-1 transition-colors hover:text-[var(--accent-primary)]"
          >
            {name}
          </button>
          
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tighter">
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
          className="mt-auto relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[var(--accent-primary)] border border-[var(--accent-primary)] text-[11px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:brightness-110 group/btn active:scale-95 shadow-md cursor-pointer"
        >
          <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
          <span>Agregar</span>
          
          {/* Subtle reflection effect on hover */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        </button>
      </div>
    </article>
  );
}
