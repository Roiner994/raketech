'use client';

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';

export interface StorefrontShowcaseCardProps {
  brand: string;
  title: string;
  accent: string;
  priceLabel: string;
  price: number;
  badge: string;
  image: string;
  imageAlt: string;
  tone: 'green' | 'blue' | 'charcoal';
  actionTheme?: 'light' | 'gold';
  icon?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
}

const toneStyles = {
  green: {
    media: 'bg-[linear-gradient(180deg,#59606b_0%,#1b1f27_100%)]',
    accent: 'text-[var(--text-secondary)]',
    image: 'object-cover object-center',
  },
  blue: {
    media: 'bg-[linear-gradient(180deg,#59606b_0%,#1b1f27_100%)]',
    accent: 'text-[var(--text-secondary)]',
    image: 'object-cover object-center',
  },
  charcoal: {
    media: 'bg-[linear-gradient(180deg,#59606b_0%,#1b1f27_100%)]',
    accent: 'text-[var(--text-secondary)]',
    image: 'object-cover object-center',
  },
};

export function StorefrontShowcaseCard({
  brand,
  title,
  accent,
  priceLabel,
  price,
  badge,
  image,
  imageAlt,
  tone,
  icon,
  onAction,
  actionLabel = 'Agregar al Carrito',
}: StorefrontShowcaseCardProps) {
  const style = toneStyles[tone];
  const buttonTheme = 'bg-[var(--accent-primary)] text-white shadow-[0_10px_24px_rgba(96,165,250,0.28)]';

  return (
    <article
      className="group overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.06)] bg-[rgba(8,18,34,0.96)] shadow-[0_22px_44px_rgba(0,0,0,0.22)]"
    >
      <div className={`relative flex aspect-[0.92] items-end justify-start overflow-hidden ${style.media}`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1280px) 100vw, 33vw"
          className={`transition duration-500 group-hover:scale-[1.03] ${style.image}`}
        />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/26 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          {icon ? <span className="flex h-3.5 w-3.5 items-center justify-center">{icon}</span> : null}
          <span>{brand}</span>
        </div>

        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-white/12 bg-black/26 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            {badge}
          </span>
        </div>

      </div>

      <div className="flex min-h-[180px] flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="text-[1.22rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.28rem]">
            {title} {accent}
          </h3>
          <p className={`text-sm leading-6 ${style.accent}`}>
            {priceLabel} · {badge}
          </p>
          <p className="text-[2.15rem] font-bold tracking-[-0.04em] text-white">
            ${price % 1 === 0 ? price : price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={onAction}
          className={`mt-auto flex h-14 w-full items-center justify-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.06)] px-5 text-base font-semibold transition hover:translate-y-[-1px] hover:brightness-110 ${buttonTheme}`}
        >
          <Plus className="h-5 w-5" />
          <span>{actionLabel}</span>
        </button>
      </div>
    </article>
  );
}
