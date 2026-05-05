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
  brandMark?: string;
  brandHref?: string;
}

export function StorefrontHeader({
  links,
  cartCount = 0,
  cartTotal = 0,
  onCartClick,
  searchLabel = 'Buscar productos',
  brandMark = 'R',
  brandHref = '#top',
}: StorefrontHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1640px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <a
          href={brandHref}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--surface-chip-border)] bg-[var(--brand-mark-bg)] shadow-[var(--shadow-soft)]"
        >
          <span className="text-base font-black text-[var(--text-primary)]">{brandMark}</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            aria-label={searchLabel}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-secondary)] transition hover:scale-[1.03] hover:text-[var(--text-primary)] sm:flex"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={onCartClick}
            aria-label={`Abrir carrito con ${cartCount} items`}
            className="flex h-10 items-center gap-2.5 rounded-2xl border border-[var(--surface-chip-border)] bg-[var(--accent-primary)] px-3.5 font-extrabold text-[var(--text-on-accent)] shadow-[var(--shadow-soft)] transition hover:translate-y-[-1px] hover:bg-[var(--accent-primary-hover)] sm:px-4"
          >
            <span className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-black text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </span>
            <span className="text-sm">${cartTotal % 1 === 0 ? cartTotal : cartTotal.toFixed(2)}</span>
          </button>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-primary)] lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border-subtle)] px-4 py-3 lg:hidden sm:px-6">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
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
