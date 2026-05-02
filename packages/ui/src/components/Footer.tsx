import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  columns?: FooterColumn[];
  whatsappNumber?: string;
  whatsappLabel?: string;
  copyrightYear?: number;
  storeName?: string;
}

export function Footer({
  columns = [
    {
      title: 'Categorías',
      links: [
        { label: 'Juegos Digitales', href: '#' },
        { label: 'Suscripciones', href: '#' },
        { label: 'Soportes 3D', href: '#' },
        { label: 'Accesorios', href: '#' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Preguntas Frecuentes', href: '#' },
        { label: 'Seguimiento', href: '#' },
        { label: 'Política de Privacidad', href: '#' },
      ],
    },
  ],
  whatsappNumber = '1234567890',
  whatsappLabel = 'Chat por WhatsApp',
  copyrightYear = new Date().getFullYear(),
  storeName = 'Raketech',
}: FooterProps) {
  return (
    <footer className="bg-[#1E293B]/40 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#10B981] flex items-center justify-center">
                <span className="text-sm font-black text-white">R</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">{storeName}</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Tu destino premium para suscripciones digitales y accesorios físicos de alta calidad, con entregas rápidas y soporte personalizado.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded-xl font-medium transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {whatsappLabel}
            </a>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {copyrightYear} {storeName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Términos de uso</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
