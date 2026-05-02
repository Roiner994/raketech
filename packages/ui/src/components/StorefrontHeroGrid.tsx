'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export interface StorefrontHeroItem {
  id: string;
  badge: string;
  title: string;
  accent: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  tone: 'green' | 'blue' | 'neutral';
  featured?: boolean;
  onCtaClick?: () => void;
}

interface StorefrontHeroGridProps {
  items: StorefrontHeroItem[];
}

const toneStyles = {
  green: {
    badge: 'bg-[rgba(34,197,94,0.14)] text-[var(--accent-success)] border border-[rgba(34,197,94,0.2)]',
    accent: 'text-[#8fdcc6]',
    button: 'bg-[var(--accent-primary)] text-slate-950 shadow-[0_12px_24px_rgba(96,165,250,0.22)]',
    glow: 'bg-[radial-gradient(circle_at_22%_26%,rgba(34,197,94,0.12),transparent_38%)]',
    image: 'object-right brightness-[0.92]',
  },
  blue: {
    badge: 'bg-[rgba(96,165,250,0.14)] text-[var(--accent-primary)] border border-[rgba(96,165,250,0.22)]',
    accent: 'text-[#93c5fd]',
    button: 'bg-[var(--accent-primary)] text-slate-950 shadow-[0_12px_24px_rgba(96,165,250,0.22)]',
    glow: 'bg-[radial-gradient(circle_at_24%_24%,rgba(80,132,255,0.12),transparent_40%)]',
    image: 'object-center brightness-[0.62]',
  },
  neutral: {
    badge: 'bg-white/8 text-[var(--text-secondary)] border border-[var(--border-subtle)]',
    accent: 'text-[#d6deeb]',
    button: 'bg-[var(--accent-primary)] text-slate-950 shadow-[0_12px_24px_rgba(96,165,250,0.22)]',
    glow: 'bg-[radial-gradient(circle_at_24%_24%,rgba(255,255,255,0.08),transparent_40%)]',
    image: 'object-center brightness-[0.68]',
  },
};

export function StorefrontHeroGrid({ items }: StorefrontHeroGridProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
      {items.map((item) => {
        const tone = toneStyles[item.tone];

        return (
          <article
            key={item.id}
            className={`group relative overflow-hidden rounded-[26px] border border-[var(--border-subtle)] bg-[#0a1225] shadow-[0_24px_60px_rgba(0,0,0,0.22)] ${
              item.featured ? 'min-h-[440px]' : 'min-h-[420px]'
            }`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(6,12,23,0.97)_20%,rgba(6,12,23,0.84)_48%,rgba(6,12,23,0.55)_100%)]" />
            <div className={`absolute inset-0 opacity-90 ${tone.glow}`} />
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover opacity-30 transition duration-700 group-hover:scale-[1.04] ${tone.image}`}
            />

            <div
              className={`relative z-10 flex h-full flex-col justify-center gap-5 px-6 py-8 sm:px-10 ${
                item.featured ? 'max-w-full sm:max-w-[60%]' : 'max-w-full sm:max-w-[70%]'
              }`}
            >
              <span className={`w-fit rounded-lg px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] ${tone.badge}`}>
                {item.badge}
              </span>

              <div className="space-y-4">
                <h2 className={`max-w-[11ch] font-black leading-[0.98] text-white ${item.featured ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
                  {item.title.replace(item.accent, '')}
                  <span className={`block ${tone.accent}`}>{item.accent}</span>
                </h2>

                <p className="max-w-[28ch] text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {item.description}
                </p>
              </div>

              <button
                onClick={item.onCtaClick}
                className={`flex w-fit items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-extrabold transition hover:translate-y-[-1px] hover:brightness-110 sm:px-6 sm:py-3.5 sm:text-base ${tone.button}`}
              >
                {item.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
