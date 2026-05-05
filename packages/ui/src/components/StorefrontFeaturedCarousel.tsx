'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import type { ProductDetail } from './ProductDetailView';

interface StorefrontFeaturedCarouselProps {
  products: ProductDetail[];
  onViewProduct?: (product: ProductDetail) => void;
  onBrowseCatalog?: () => void;
  autoPlayMs?: number;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function StorefrontFeaturedCarousel({
  products,
  onViewProduct,
  onBrowseCatalog,
  autoPlayMs = 6000,
  emptyTitle = 'Pronto tendremos destacados para ti',
  emptyDescription = 'Mientras tanto puedes explorar todo el catálogo y descubrir lo último de la tienda.',
}: StorefrontFeaturedCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (products.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, autoPlayMs);

    return () => window.clearInterval(intervalId);
  }, [autoPlayMs, products.length]);

  if (products.length === 0) {
    return (
      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface-hero-banner)] px-6 py-10 shadow-[var(--shadow-strong)] sm:px-8">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-chip-border)] bg-[var(--surface-chip)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            Portada en preparación
          </span>
          <div className="space-y-2">
            <h2 className="max-w-[14ch] text-3xl font-black leading-[0.96] text-[var(--text-primary)] sm:text-4xl">
              {emptyTitle}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
              {emptyDescription}
            </p>
          </div>
          <Button variant="primary" size="md" onClick={onBrowseCatalog}>
            Ver catálogo
          </Button>
        </div>
      </section>
    );
  }

  const safeActiveIndex = Math.min(activeIndex, products.length - 1);
  const activeProduct = products[safeActiveIndex];
  const imageSrc = activeProduct.image || activeProduct.gallery?.[0] || '';

  const move = (direction: 'prev' | 'next') => {
    setActiveIndex((current) => {
      if (products.length <= 1) {
        return 0;
      }

      if (direction === 'prev') {
        return current === 0 ? products.length - 1 : current - 1;
      }

      return (current + 1) % products.length;
    });
  };

  const jumpTo = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
      <div className="space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-chip-border)] bg-[var(--surface-chip)] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
          Raketech destacados
        </span>

        <div className="space-y-3">
          <h2 className="max-w-[12ch] text-4xl font-black leading-[0.92] tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Lo mejor de Raketech, primero
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            Pon aquí tus productos más fuertes: ofertas, lanzamientos, piezas premium o lo que quieras empujar hoy en la tienda.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--text-muted)]">Enfoque</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Promociones y productos top</p>
          </div>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--text-muted)]">Movimiento</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Carrusel suave y controlado</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="md" onClick={() => onViewProduct?.(activeProduct)}>
            Ver destacado
          </Button>
          <Button variant="secondary" size="md" onClick={onBrowseCatalog}>
            Ver catálogo
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-[18%] -bottom-2 h-10 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_65%)] blur-2xl" />

        <div className="overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-hero-panel)] shadow-[var(--shadow-strong)]">
          <div className="grid gap-0 lg:grid-cols-[1fr]">
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-panel-strong)]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={activeProduct.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--surface-hero-image-fallback)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.14)_46%,rgba(2,6,23,0.72)_100%)]" />

              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-overlay-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-primary)] backdrop-blur-sm">
                  {activeProduct.featured ? 'Destacado' : 'Selección'}
                </span>
                {activeProduct.category ? (
                  <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-overlay-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] backdrop-blur-sm">
                    {activeProduct.category}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black leading-tight text-[var(--text-primary)]">
                    {activeProduct.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--accent-primary)]">
                    ${activeProduct.price % 1 === 0 ? activeProduct.price : activeProduct.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => move('prev')}
                    aria-label="Producto anterior"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-primary)] transition hover:bg-[var(--surface-glass-strong)]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move('next')}
                    aria-label="Siguiente producto"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-primary)] transition hover:bg-[var(--surface-glass-strong)]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="line-clamp-3 text-sm leading-7 text-[var(--text-secondary)]">
                {activeProduct.description || 'Explora este producto seleccionado para protagonizar la portada de la tienda.'}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {products.map((product, index) => {
                  const isActive = index === safeActiveIndex;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => jumpTo(index)}
                      aria-label={`Ir al destacado ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        isActive ? 'w-10 bg-[var(--accent-primary)]' : 'w-2.5 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]'
                      }`}
                    />
                  );
                })}
              </div>

              <Button variant="primary" size="md" onClick={() => onViewProduct?.(activeProduct)}>
                Ver detalle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
