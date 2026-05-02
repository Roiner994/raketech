'use client';

import { useState, useCallback } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  description?: string;
  variant: ToastVariant;
}

export interface UseToastReturn {
  toasts: Toast[];
  showToast: (message: string, options?: { description?: string; variant?: ToastVariant }) => void;
  dismissToast: (id: string) => void;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (
      message: string,
      { description, variant = 'success' }: { description?: string; variant?: ToastVariant } = {}
    ) => {
      const id = Math.random().toString(36).slice(2);
      const toast: Toast = { id, message, description, variant };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
