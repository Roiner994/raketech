import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'whatsapp'
  | 'green';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-slate-950 font-semibold shadow-lg shadow-[rgba(96,165,250,0.22)] active:scale-[0.98]',
  secondary:
    'bg-white/6 hover:bg-white/10 text-[var(--text-primary)] font-medium border border-[var(--border-subtle)] shadow-lg shadow-black/10 active:scale-95',
  ghost:
    'bg-transparent hover:bg-white/6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] active:scale-95',
  danger:
    'bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 active:scale-95',
  whatsapp:
    'bg-[var(--accent-success)] hover:brightness-110 text-slate-950 font-semibold shadow-lg shadow-[rgba(34,197,94,0.18)] active:scale-95',
  green:
    'bg-[rgba(96,165,250,0.12)] hover:bg-[rgba(96,165,250,0.18)] text-[var(--accent-primary)] border border-[rgba(96,165,250,0.2)] active:scale-95',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  isLoading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--bg-primary)]
        disabled:opacity-50 disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
