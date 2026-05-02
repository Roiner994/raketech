import React from 'react';

export type BadgeVariant =
  | 'digital'
  | 'physical'
  | 'duration'
  | 'material'
  | 'success'
  | 'danger'
  | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  digital:
    'bg-[rgba(96,165,250,0.12)] text-[var(--accent-primary)] border border-[rgba(96,165,250,0.18)]',
  physical:
    'bg-white/6 text-[var(--text-secondary)] border border-[var(--border-subtle)]',
  duration:
    'bg-[rgba(243,201,107,0.12)] text-[var(--accent-warning)] border border-[rgba(243,201,107,0.2)]',
  material:
    'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]',
  success:
    'bg-[rgba(34,197,94,0.12)] text-[var(--accent-success)] border border-[rgba(34,197,94,0.2)]',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/20',
  neutral:
    'bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]',
};

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
