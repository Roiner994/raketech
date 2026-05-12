'use client';

import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';

export interface StorefrontNavLink {
  label: string;
  href: string;
}

interface StorefrontHeaderProps {
  links: StorefrontNavLink[];
  cartCount?: number;
  cartTotal?: number;
  onCartClick?: () => void;
  searchLabel?: string;
  brandMark?: React.ReactNode;
  brandName?: string;
  brandHref?: string;
  welcomeMessage?: {
    title: string;
    subtitle?: string;
  };
}

export function StorefrontHeader({
  links,
  cartCount = 0,
  cartTotal = 0,
  onCartClick,
  searchLabel = 'Buscar productos',
  brandMark,
  brandName,
  brandHref = '#top',
  welcomeMessage,
}: StorefrontHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1640px] items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={brandHref}
            className="group flex items-center gap-3 transition-transform active:scale-95"
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden transition-all duration-300 group-hover:rotate-3 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center justify-center text-xl font-black italic tracking-tighter text-[var(--text-primary)]">
                {brandMark || <Search className="h-5 w-5 rotate-180 scale-x-[-1] transform text-[var(--accent-primary)]" style={{ filter: 'drop-shadow(0 0 8px var(--accent-primary))' }} />}
                {/* Defaulting to a stylized icon if none provided, but let's use a real Rocket icon below if needed */}
              </span>
            </div>
            {brandName && (
              <span className="text-xl font-black tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary-hover)]">
                {brandName}
              </span>
            )}
          </a>
          
          {welcomeMessage && (
            <div className="hidden flex-col gap-0.5 sm:flex">
              <h1 className="text-xl font-black tracking-tight text-[var(--text-primary)]">
                {welcomeMessage.title}
              </h1>
              {welcomeMessage.subtitle && (
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-4 bg-[var(--accent-primary)]" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {welcomeMessage.subtitle}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="group relative text-[13px] font-black uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label={searchLabel}
            className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-glass-strong)] hover:text-[var(--text-primary)] hover:shadow-lg sm:flex"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={onCartClick}
            aria-label={`Abrir carrito con ${cartCount} items`}
            className="group relative flex h-11 items-center gap-3 overflow-hidden rounded-[20px] bg-[var(--accent-primary)] border border-[var(--accent-primary)] px-5 font-black text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[var(--accent-primary)] border-2 border-[var(--text-primary)] px-1 text-[9px] font-black text-white group-hover:border-[var(--accent-primary)] group-hover:bg-white group-hover:text-[var(--accent-primary)]">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <span className="text-[13px] tracking-tight">${cartTotal % 1 === 0 ? cartTotal : cartTotal.toFixed(2)}</span>
          </button>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Abrir menu"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-primary)] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border-subtle)] px-4 py-3 lg:hidden sm:px-6">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-glass)] hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
