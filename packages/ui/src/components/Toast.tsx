import React from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '../hooks/useToast';

interface ToastListProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

const config = {
  success: {
    icon: CheckCircle2,
    iconColor: 'text-[#10B981]',
    bg: 'bg-[#10B981]/10 border-[#10B981]/20',
  },
  error: {
    icon: XCircle,
    iconColor: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
  },
  info: {
    icon: Info,
    iconColor: 'text-[#3B82F6]',
    bg: 'bg-[#3B82F6]/10 border-[#3B82F6]/20',
  },
};

export function ToastList({ toasts, onDismiss }: ToastListProps) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col gap-3 items-end"
    >
      {toasts.map((toast) => {
        const { icon: Icon, iconColor, bg } = config[toast.variant];
        return (
          <div
            key={toast.id}
            className={`
              flex items-start gap-3 p-4 rounded-2xl border shadow-2xl shadow-black/50
              bg-[#1E293B] ${bg}
              max-w-sm w-full sm:w-auto min-w-[260px]
              animate-slide-in-right
            `}
            role="alert"
          >
            <div className={`mt-0.5 shrink-0 ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">{toast.message}</p>
              {toast.description && (
                <p className="text-xs text-slate-400 mt-0.5">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-slate-500 hover:text-white transition-colors shrink-0"
              aria-label="Cerrar notificación"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
