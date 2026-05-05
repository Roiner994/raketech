'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Button } from '@raketech/ui';
import type { ProductDetail } from '@raketech/ui';

interface DigitalHeroProps {
  products: ProductDetail[];
  onViewProduct?: (product: ProductDetail) => void;
  onBrowseCatalog?: () => void;
}

export function DigitalHero({
  products,
  onViewProduct,
  onBrowseCatalog,
}: DigitalHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (products.length < 2) return;
    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [products.length]);

  if (products.length === 0) return null;

  const safeActiveIndex = Math.min(activeIndex, products.length - 1);

  return (
    <section className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center py-8">
      {/* Left side text */}
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-chip-border)] bg-[var(--surface-chip)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
          Nuevas Suscripciones Disponibles
        </span>

        <div className="space-y-4">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] sm:text-6xl">
            Tus Juegos Favoritos
          </h2>
          <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)]">
            Accede a las mejores suscripciones de juegos al instante.
            Seguridad, rapidez y soporte garantizado para una experiencia
            premium.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <Button variant="primary" size="lg" onClick={onBrowseCatalog} className="rounded-lg px-8 py-3 font-semibold">
            Ver Catálogo
          </Button>
          <Button variant="secondary" size="lg" onClick={() => onViewProduct?.(products[safeActiveIndex])} className="rounded-lg border border-[var(--surface-chip-border)] bg-transparent px-8 py-3 font-semibold">
            Saber Más
          </Button>
        </div>
      </div>

      {/* Right side stacked cards carousel */}
      <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden lg:overflow-visible">
        {/* Glow effect behind cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-[var(--surface-chip)] blur-[100px]" />
        </div>

        <div className="relative w-full max-w-[340px] h-[400px]">
          {products.map((product, index) => {
            // Calculate relative position
            let offset = index - safeActiveIndex;
            
            // Handle wrap-around for a circular feel
            if (offset > 1) offset -= products.length;
            if (offset < -1) offset += products.length;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = !isCenter && !isLeft && !isRight;

            return (
              <div
                key={product.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-2xl
                  ${isCenter ? 'z-20 opacity-100 scale-100 rotate-0 translate-x-0' : ''}
                  ${isLeft ? 'z-10 opacity-40 scale-90 -rotate-6 -translate-x-[25%] blur-[1px]' : ''}
                  ${isRight ? 'z-10 opacity-40 scale-90 rotate-6 translate-x-[25%] blur-[1px]' : ''}
                  ${isHidden ? 'z-0 opacity-0 scale-75 pointer-events-none' : ''}
                  ${isCenter ? 'bg-[var(--surface-card)] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]' : 'bg-[var(--surface-panel)]'}
                `}
              >
                <div className="relative flex-1 bg-[var(--surface-panel-strong)]">
                  {product.image || product.gallery?.[0] ? (
                    <Image
                      src={product.image || product.gallery?.[0] || ''}
                      alt={product.imageAlt}
                      fill
                      className={`object-cover transition-opacity duration-700 ${isCenter ? 'opacity-100' : 'opacity-50'}`}
                      priority={isCenter}
                    />
                  ) : null}
                  
                  {isCenter && (
                    <div className="absolute top-3 right-3 z-30">
                      <span className="rounded bg-[var(--accent-primary)] px-2 py-1 text-[10px] font-bold text-[var(--text-on-accent)] uppercase tracking-wider">
                        Destacado
                      </span>
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-[var(--surface-panel)] to-transparent ${isCenter ? 'opacity-90' : 'opacity-100'}`} />
                </div>

                {/* Card content - only meaningful when in center, but visible for transition */}
                <div className="relative z-20 bg-[var(--surface-panel)] p-5 pb-6">
                  <h3 className="mb-1 truncate text-xl font-bold text-[var(--text-primary)]">
                    {product.name}
                  </h3>
                  <p className="mb-3 text-lg font-semibold text-[var(--accent-primary)]">
                    ${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}
                  </p>
                  <p className="h-8 line-clamp-2 text-xs text-[var(--text-muted)]">
                    {product.description || "Acceso anticipado, recompensas exclusivas y multijugador online sin límites."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === safeActiveIndex ? "w-6 bg-[var(--accent-primary)]" : "w-1.5 bg-[var(--border-strong)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
