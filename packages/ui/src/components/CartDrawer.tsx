'use client';

import React from 'react';
import Image from 'next/image';
import { X, ShoppingCart, ShoppingBag, Gamepad2, Printer, Trash2, MessageCircle, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, variant?: string) => void;
  onUpdateQuantity: (id: string, quantity: number, variant?: string) => void;
  total: number;
  whatsappNumber?: string;
  storeName?: string;
}

function buildWhatsAppMessage(items: CartItem[], total: number, storeName = 'Raketech'): string {
  const lines = items.map(
    (i) => `• ${i.title}${i.variant ? ` (${i.variant})` : ''} x${i.quantity} — $${((i.price * i.quantity) % 1 === 0 ? (i.price * i.quantity) : (i.price * i.quantity).toFixed(2))}`
  );
  const text = [
    `¡Hola ${storeName}! Me gustaría realizar el siguiente pedido:`,
    '',
    ...lines,
    '',
    `*Total: $${total % 1 === 0 ? total : total.toFixed(2)}*`,
  ].join('\n');
  return encodeURIComponent(text);
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  total,
  whatsappNumber = '1234567890',
  storeName = 'Raketech',
}: CartDrawerProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage(items, total, storeName)}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-[var(--border-subtle)] bg-[var(--surface-drawer)] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-drawer-header)] p-6 shrink-0">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
            <ShoppingCart className="w-5 h-5 text-[var(--text-muted)]" />
            Mi Carrito
            {items.length > 0 && (
              <span className="ml-1 rounded bg-[rgba(34,197,94,0.12)] px-1.5 py-0.5 text-xs font-bold text-[var(--accent-success)]">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-muted)]">
                <ShoppingBag className="w-10 h-10 text-[var(--text-muted)]" />
              </div>
              <div>
                <p className="text-base font-semibold text-[var(--text-secondary)]">Tu carrito está vacío</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Agrega productos para comenzar</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.variant || 'default'}`}
                className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-drawer-item)] p-4"
              >
                {/* Image/Icon */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)]">
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : item.type === 'digital' ? (
                    <Gamepad2 className="w-6 h-6 text-[var(--accent-primary)]" />
                  ) : (
                    <Printer className="w-6 h-6 text-[var(--text-muted)]" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1 text-sm font-semibold leading-snug text-[var(--text-primary)]">{item.title}</p>
                  {item.variant && (
                    <span className="mt-1 inline-block rounded bg-[var(--surface-soft)] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[var(--text-muted)]">
                      {item.variant}
                    </span>
                  )}
                  <p className="mt-2 text-sm font-bold text-[var(--text-primary)]">${(item.price * item.quantity) % 1 === 0 ? (item.price * item.quantity) : (item.price * item.quantity).toFixed(2)}</p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.variant)}
                      className="flex h-6 w-6 items-center justify-center rounded bg-[var(--surface-muted)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-interactive-hover)]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center text-xs font-semibold text-[var(--text-primary)]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.variant)}
                      className="flex h-6 w-6 items-center justify-center rounded bg-[var(--surface-muted)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-interactive-hover)]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(item.id, item.variant)}
                  aria-label={`Eliminar ${item.title}`}
                  className="shrink-0 rounded-lg p-1.5 text-[var(--text-muted)] transition-colors hover:bg-red-400/10 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 space-y-4 border-t border-[var(--border-subtle)] bg-[var(--surface-drawer-item)] p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">Total a pagar</span>
            <span className="text-2xl font-bold text-[var(--text-primary)]">${total % 1 === 0 ? total : total.toFixed(2)}</span>
          </div>
          <a
            href={items.length > 0 ? whatsappUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={items.length === 0}
            className={`
              w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-lg
              transition-all duration-200 active:scale-95
              ${items.length === 0
                ? 'pointer-events-none cursor-not-allowed bg-[var(--surface-muted)] text-[var(--text-muted)]'
                : 'bg-[var(--accent-whatsapp)] text-white shadow-lg shadow-[rgba(37,211,102,0.2)] hover:bg-[var(--accent-whatsapp-hover)]'}
            `}
          >
            <MessageCircle className="w-5 h-5" />
            Comprar vía WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
