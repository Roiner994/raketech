'use client';

import { useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  type: 'digital' | 'physical';
  platform?: string;
  duration?: string;
  image?: string;
  quantity: number;
  variant?: string;
}

export interface UseCartReturn {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity ?? 1;
    
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id && i.variant === newItem.variant);
      if (existing) {
        return prev.map((i) =>
          (i.id === newItem.id && i.variant === newItem.variant)
            ? { ...i, quantity: i.quantity + qtyToAdd }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: qtyToAdd }];
    });
  }, []);

  const removeItem = useCallback((id: string, variant?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.variant === variant)));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.id === id && i.variant === variant)));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id && i.variant === variant ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount };
}
