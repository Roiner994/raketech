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
        className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-[#020617] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-[#020617] p-8 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium tracking-tight text-white">
              Mi Carrito
            </h2>
            {items.length > 0 && (
              <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-emerald-500/10 px-2 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/5"
          >
            <X className="w-5 h-5 text-white/40 transition-colors group-hover:text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5">
                <ShoppingBag className="w-10 h-10 text-white/10" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-white/90">Tu carrito está vacío</p>
                <p className="text-sm text-white/40 max-w-[200px]">Explora nuestro catálogo y agrega tus productos favoritos</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant || 'default'}`}
                  className="group flex items-center gap-5 py-6"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 transition-transform duration-300 group-hover:scale-[1.02]">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        sizes="80px"
                        className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Gamepad2 className="w-8 h-8 text-white/10" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                          {item.title}
                        </h3>
                        {item.variant && (
                          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-white/30">
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onRemove(item.id, item.variant)}
                        className="shrink-0 rounded-full p-2 text-white/20 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Pill Quantity Selector */}
                      <div className="flex h-8 items-center bg-white/[0.03] border border-white/5 rounded-full px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.variant)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 bg-white/[0.01] border-t border-white/5 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/40">Total estimado</span>
            <span className="text-3xl font-bold tracking-tight text-white">
              ${total.toLocaleString()}
            </span>
          </div>
          
          <a
            href={items.length > 0 ? whatsappUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-5 font-bold text-lg transition-all duration-500
              ${items.length === 0
                ? 'pointer-events-none bg-white/[0.02] text-white/10'
                : 'bg-[var(--accent-whatsapp)] text-white hover:brightness-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <MessageCircle className="relative z-10 w-6 h-6" />
            <span className="relative z-10">Completar por WhatsApp</span>
          </a>
          
          {items.length > 0 && (
            <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
              Envío inmediato tras confirmación
            </p>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
    </>
  );
}
