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
    (i) => `• ${i.title}${i.variant ? ` (${i.variant})` : ''} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`
  );
  const text = [
    `¡Hola ${storeName}! Me gustaría realizar el siguiente pedido:`,
    '',
    ...lines,
    '',
    `*Total: $${total.toFixed(2)}*`,
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
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-[#1E293B] border-l border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-[#0B1120]/50 shrink-0">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-slate-400" />
            Mi Carrito
            {items.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#10B981]/20 text-[#10B981] text-xs font-bold rounded">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-slate-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-300">Tu carrito está vacío</p>
                <p className="text-sm text-slate-500 mt-1">Agrega productos para comenzar</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.variant || 'default'}`}
                className="flex items-start gap-3 bg-[#0B1120] p-4 rounded-xl border border-slate-800"
              >
                {/* Image/Icon */}
                <div className="relative w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden border border-white/5">
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : item.type === 'digital' ? (
                    <Gamepad2 className="w-6 h-6 text-[#3B82F6]" />
                  ) : (
                    <Printer className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-snug line-clamp-1">{item.title}</p>
                  {item.variant && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/5 text-slate-400 text-[10px] uppercase font-bold rounded">
                      {item.variant}
                    </span>
                  )}
                  <p className="text-sm font-bold text-white mt-2">${(item.price * item.quantity).toFixed(2)}</p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.variant)}
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold text-white w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.variant)}
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(item.id, item.variant)}
                  aria-label={`Eliminar ${item.title}`}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-6 border-t border-slate-800 bg-[#0B1120] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Total a pagar</span>
            <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
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
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed pointer-events-none'
                : 'bg-[#25D366] hover:bg-[#1EBE5A] text-white shadow-lg shadow-[#25D366]/20'}
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
