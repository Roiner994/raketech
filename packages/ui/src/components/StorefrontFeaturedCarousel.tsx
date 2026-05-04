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
      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.16),transparent_28%),linear-gradient(135deg,#09111f_0%,#0f172a_55%,#111827_100%)] px-6 py-10 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.8)] sm:px-8">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            Portada en preparación
          </span>
          <div className="space-y-2">
            <h2 className="max-w-[14ch] text-3xl font-black leading-[0.96] text-white sm:text-4xl">
              {emptyTitle}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
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
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(96,165,250,0.18)] bg-[rgba(96,165,250,0.12)] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-100">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
          Raketech destacados
        </span>

        <div className="space-y-3">
          <h2 className="max-w-[12ch] text-4xl font-black leading-[0.92] tracking-tight text-white sm:text-5xl">
            Lo mejor de Raketech, primero
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Pon aquí tus productos más fuertes: ofertas, lanzamientos, piezas premium o lo que quieras empujar hoy en la tienda.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Enfoque</p>
            <p className="mt-1 text-sm font-semibold text-white">Promociones y productos top</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Movimiento</p>
            <p className="mt-1 text-sm font-semibold text-white">Carrusel suave y controlado</p>
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

        <div className="overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(2,6,23,0.96))] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.85)]">
          <div className="grid gap-0 lg:grid-cols-[1fr]">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.28),transparent_35%),linear-gradient(180deg,#0f172a_0%,#020617_100%)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.14)_46%,rgba(2,6,23,0.72)_100%)]" />

              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {activeProduct.featured ? 'Destacado' : 'Selección'}
                </span>
                {activeProduct.category ? (
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-200 backdrop-blur-sm">
                    {activeProduct.category}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black leading-tight text-white">
                    {activeProduct.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--accent-primary)]">
                    ${activeProduct.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => move('prev')}
                    aria-label="Producto anterior"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-slate-100 transition hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move('next')}
                    aria-label="Siguiente producto"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-slate-100 transition hover:bg-white/10"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="line-clamp-3 text-sm leading-7 text-slate-300">
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
                        isActive ? 'w-10 bg-[var(--accent-primary)]' : 'w-2.5 bg-white/20 hover:bg-white/40'
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
