import React from 'react';
import { Loader2 } from 'lucide-react';

interface StorefrontThemeLoadingShellProps {
  title?: string;
}

export function StorefrontThemeLoadingShell({
  title = 'Raketech',
}: StorefrontThemeLoadingShellProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] shadow-[var(--shadow-soft)]">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--accent-primary)]" />
        </div>
        <p className="text-sm font-black uppercase tracking-[0.28em] text-[var(--text-primary)]">
          {title}
        </p>
      </div>
    </div>
  );
}
