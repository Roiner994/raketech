import React from 'react';
import { MessageCircle } from 'lucide-react';

export interface StorefrontFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface StorefrontFooterProps {
  storeName: string;
  description: string;
  columns: StorefrontFooterColumn[];
  whatsappNumber: string;
  whatsappLabel?: string;
}

export function StorefrontFooter({
  storeName,
  description,
  columns,
  whatsappNumber,
  whatsappLabel = 'Hablar por WhatsApp',
}: StorefrontFooterProps) {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--footer-bg)]">
      <div className="mx-auto grid max-w-[1640px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--surface-chip-border)] bg-[var(--brand-mark-bg)] shadow-[var(--shadow-soft)]">
              <span className="text-sm font-black text-[var(--text-primary)]">R</span>
            </div>
            <span className="text-lg font-black text-[var(--text-primary)]">{storeName}</span>
          </div>

          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            {description}
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(34,197,94,0.24)] bg-[rgba(34,197,94,0.1)] px-4 py-2.5 text-xs font-bold text-[var(--accent-success)] transition hover:bg-[rgba(34,197,94,0.16)]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {whatsappLabel}
          </a>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-[0.12em] text-[var(--text-primary)]">
              {column.title}
            </h4>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <a
                    href={link.href}
                    className="text-xs text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
