'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  ShoppingCart,
  ZoomIn,
  CheckCircle2,
  Shield,
  Truck,
} from 'lucide-react';
import type { StorefrontGridProduct } from './StorefrontProductGrid';

// ─── Extended product detail type ─────────────────────────────────────────────

export interface ProductDetail extends StorefrontGridProduct {
  /** Extra gallery images (paths from /public). First one is the main image. */
  gallery?: string[];
  /** Short paragraph about the product */
  description?: string;
  /** Colour / variant options */
  variants?: { label: string; value: string; hex?: string }[];
  /** Bullet-point feature list */
  features?: { icon?: 'shield' | 'truck' | 'check'; title: string; body: string }[];
  /** Rich text features HTML */
  featuresHtml?: string;
  /** Category breadcrumb label */
  category?: string;
  /** Stock status */
  inStock?: boolean;
}

export interface ProductDetailViewProps {
  product: ProductDetail;
  onAddToCart: (product: ProductDetail, quantity: number, variant?: string) => void;
  /** If true, adjusts layout for a full-page view rather than a modal inner */
  isPage?: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function ProductDetailView({ product, onAddToCart, isPage = false }: ProductDetailViewProps) {
  return (
    <ProductDetailViewInner
      key={product.id}
      product={product}
      onAddToCart={onAddToCart}
      isPage={isPage}
    />
  );
}

function ProductDetailViewInner({ product, onAddToCart, isPage }: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.value
  );
  const [added, setAdded] = useState(false);

  const gallery = product.gallery?.length ? product.gallery : [product.image].filter(Boolean);
  const currentImage = gallery[activeImage] ?? '';
  const inStock = product.inStock !== false;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const featureIcon = (icon?: 'shield' | 'truck' | 'check') => {
    const cls = 'h-4 w-4 text-[var(--accent-primary,#3B82F6)] shrink-0';
    if (icon === 'shield') return <Shield className={cls} />;
    if (icon === 'truck') return <Truck className={cls} />;
    return <CheckCircle2 className={cls} />;
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${isPage ? 'gap-8 lg:gap-12' : ''}`}>
      {/* ── Left: Image gallery ── */}
      <div className={`flex flex-col gap-3 p-5 ${isPage ? 'bg-transparent lg:p-0' : 'bg-[var(--surface-panel-strong)]'}`}>
        {/* Main image */}
        <div className={`group relative aspect-square w-full overflow-hidden rounded-2xl bg-[var(--surface-muted)] ${isPage ? 'shadow-2xl ring-1 ring-[var(--border-subtle)]' : ''}`}>
          {currentImage ? (
            <Image
              src={currentImage}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)]">
              {product.fallbackIcon}
            </div>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 rounded-xl bg-[var(--surface-overlay-strong)] p-2 text-[var(--text-secondary)] opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-5 w-5" />
          </div>
        </div>

        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
            {gallery.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={[
                  'relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                  activeImage === idx
                    ? 'border-[var(--accent-primary,#3B82F6)] scale-95 shadow-lg shadow-blue-500/20'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
                ].join(' ')}
              >
                <Image
                  src={src}
                  alt={`Vista ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Right: Product info ── */}
      <div className={`flex flex-col gap-6 ${isPage ? 'p-0' : 'p-6'}`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
          <span className="cursor-pointer transition-colors hover:text-[var(--text-secondary)]">Inicio</span>
          <ChevronRight className="h-3 w-3" />
          {product.category && (
            <>
              <span className="cursor-pointer transition-colors hover:text-[var(--text-secondary)]">{product.category}</span>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
          <span className="line-clamp-1 text-[var(--text-secondary)]">{product.name}</span>
        </nav>

        {/* Stock badge */}
        <div className="flex items-center gap-3">
          <span
            className={[
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider',
              inStock
                ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20',
            ].join(' ')}
          >
            <span
              className={[
                'h-1.5 w-1.5 rounded-full',
                inStock ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400',
              ].join(' ')}
            />
            {inStock ? 'En Stock' : 'Agotado'}
          </span>
          <span className="text-xs font-semibold text-[var(--text-muted)]">Envío en 24/48h</span>
        </div>

        {/* Title & price */}
        <div className="space-y-2">
          <h1 className={`${isPage ? 'text-4xl lg:text-5xl' : 'text-2xl'} font-black leading-tight text-[var(--text-primary)] tracking-tight`}>
            {product.name}
          </h1>
          <div className="flex items-baseline gap-2">
            <span className={`${isPage ? 'text-4xl' : 'text-3xl'} font-black text-[var(--text-primary)]`}>
              ${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-[var(--text-muted)]">USD</span>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-base font-medium leading-relaxed text-[var(--text-secondary)]">
            {product.description}
          </p>
        )}

        {/* Variant selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
              <span>Color Seleccionado</span>
              <span className="text-[var(--accent-primary,#3B82F6)]">
                {product.variants.find((v) => v.value === selectedVariant)?.label}
              </span>
            </div>
            <div className="flex gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setSelectedVariant(v.value)}
                  title={v.label}
                  className={[
                    'h-10 w-10 rounded-full border-2 transition-all p-0.5',
                    selectedVariant === v.value
                      ? 'border-[var(--accent-primary,#3B82F6)] scale-110 shadow-lg shadow-blue-500/40'
                      : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
                  ].join(' ')}
                >
                   <div 
                    className="w-full h-full rounded-full" 
                    style={{ backgroundColor: v.hex ?? '#334155' }}
                   />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + CTA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Stepper */}
          <div className="flex items-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-soft-hover)] hover:text-[var(--text-primary)]"
              aria-label="Reducir cantidad"
            >
              −
            </button>
            <span className="min-w-[3rem] text-center text-base font-black text-[var(--text-primary)]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-soft-hover)] hover:text-[var(--text-primary)]"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!inStock}
            className={[
              'flex flex-1 items-center justify-center gap-3 rounded-2xl py-4 text-base font-black transition-all shadow-xl',
              added
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : inStock
                ? 'bg-[var(--accent-primary,#3B82F6)] text-[var(--text-on-accent)] hover:brightness-110 active:scale-[0.98] shadow-blue-500/20'
                : 'cursor-not-allowed bg-[var(--surface-muted)] text-[var(--text-muted)]',
            ].join(' ')}
          >
            {added ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                ¡Agregado al Carrito!
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                Agregar al Carrito
              </>
            )}
          </button>
        </div>

        {/* Features / Rich Text */}
        {product.featuresHtml ? (
          <div className="mt-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-detail-card)] p-5">
            <div 
              className="prose max-w-none text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)] prose-a:text-[var(--accent-primary)] prose-strong:text-[var(--text-primary)]"
              dangerouslySetInnerHTML={{ __html: product.featuresHtml }} 
            />
          </div>
        ) : product.features && product.features.length > 0 ? (
          <div className="mt-2 space-y-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-5">
            {product.features.map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 rounded-xl bg-[var(--accent-primary,#3B82F6)]/10 p-2">
                  {featureIcon(f.icon)}
                </div>
                <div>
                  <p className="text-sm font-black tracking-tight text-[var(--text-primary)]">{f.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--text-secondary)]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
