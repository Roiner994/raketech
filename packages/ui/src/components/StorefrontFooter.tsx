import React from 'react';
import { MessageCircle, Globe } from 'lucide-react';

export interface StorefrontFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'tiktok';
  href: string;
}

interface StorefrontFooterProps {
  storeName: string;
  description: string;
  columns: StorefrontFooterColumn[];
  whatsappNumber: string;
  whatsappLabel?: string;
  socialLinks?: SocialLink[];
}

const SocialIcon = ({ platform }: { platform: SocialLink['platform'] }) => {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5"
  };

  switch (platform) {
    case 'instagram':
      return (
        <svg {...iconProps}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...iconProps}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...iconProps}>
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    default:
      return <Globe className="h-5 w-5" />;
  }
};

export function StorefrontFooter({
  storeName,
  description,
  columns,
  whatsappNumber,
  whatsappLabel = 'Hablar por WhatsApp',
  socialLinks = [],
}: StorefrontFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#020617] pt-20 pb-10">
      <div className="mx-auto max-w-[1640px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-blue-500/30 group-hover:bg-blue-500/5">
                  <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-white">{storeName}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/80">Digital Excellence</span>
                </div>
              </div>

              <p className="max-w-md text-[15px] leading-relaxed text-slate-400/90 font-medium">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 text-xs font-bold text-emerald-400 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40"
              >
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                {whatsappLabel}
              </a>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-slate-400 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
                      aria-label={link.platform}
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            {columns.map((column) => (
              <div key={column.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <a
                        href={link.href}
                        className="text-[13px] font-medium text-slate-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[11px] font-medium text-slate-500">
              © {currentYear} {storeName}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[11px] font-medium text-slate-500 hover:text-slate-300 transition-colors">Privacidad</a>
              <a href="#" className="text-[11px] font-medium text-slate-500 hover:text-slate-300 transition-colors">Términos</a>
              <div className="flex items-center gap-1.5 grayscale opacity-50">
                <span className="text-[10px] font-bold text-slate-500">SECURE PAYMENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
