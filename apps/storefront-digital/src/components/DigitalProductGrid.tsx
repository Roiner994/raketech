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
          <h2 className="text-2xl font-bold text-white leading-tight">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>

        {viewAllHref && (
          <a
            href={viewAllHref}
            className="flex shrink-0 items-center gap-2 rounded-md border border-[#2d2a45] px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/5"
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
      className={`group flex flex-col overflow-hidden rounded-xl bg-[#0e111a] border ${
        featured ? 'border-green-500/30' : 'border-[#1f2230]'
      }`}
    >
      {/* Thumbnail */}
      <button
        onClick={onView}
        disabled={!onView}
        className={`relative aspect-[16/9] w-full overflow-hidden bg-[#111827] ${
          onView ? 'cursor-pointer' : 'cursor-default'
        }`}
        aria-label={`Ver detalle de ${name}`}
      >
        {image && (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] to-transparent opacity-80" />

        {featured && (
          <div className="absolute top-2 right-2 z-10">
            <span className="rounded bg-[#22c55e] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Oferta
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-4 text-center z-10">
          {/* Logo could go here, or we just rely on the image */}
        </div>
      </button>

      {/* Info + action */}
      <div className="flex flex-col p-4 pt-2">
        <h3 className="text-base font-bold text-white line-clamp-1 mb-1">{name}</h3>
        <p className="text-sm font-semibold text-blue-400 mb-4">
          ${price.toFixed(2)} / mes
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg border border-[#2d2a45] bg-[#1a1b26] py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-[#2d2a45] hover:text-white"
        >
          <ShoppingCart className="h-4 w-4" />
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}
