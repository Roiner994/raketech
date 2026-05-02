import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  variant: 'digital' | 'physical';
  title: string;
  highlight?: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  badge?: string;
  className?: string;
}

export function HeroBanner({
  variant,
  title,
  highlight,
  description,
  ctaLabel,
  onCtaClick,
  badge,
  className = '',
}: HeroBannerProps) {
  if (variant === 'digital') {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] to-[#1E293B] border border-slate-800 p-8 md:p-12 group min-h-[320px] flex flex-col justify-center ${className}`}
      >
        {/* Atmospheric glows */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-72 h-72 bg-[#3B82F6]/20 rounded-full blur-3xl group-hover:bg-[#3B82F6]/30 transition-all duration-700 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl group-hover:bg-[#10B981]/20 transition-all duration-700 pointer-events-none" />

        <div className="relative z-10 space-y-5 max-w-lg">
          {badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold uppercase tracking-wider border border-[#3B82F6]/20">
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}
            {highlight && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#10B981]">
                  {highlight}
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">{description}</p>
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-xl shadow-lg shadow-[#3B82F6]/25 hover:shadow-[#3B82F6]/40 transition-all active:scale-95"
          >
            {ctaLabel}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Physical variant — clean, minimalist, dot-pattern
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-[#1E293B] border border-slate-700 p-8 md:p-12 min-h-[320px] flex flex-col justify-center ${className}`}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-slate-600/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-5 max-w-lg">
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
            {badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-slate-300">{highlight}</span>
            </>
          )}
        </h2>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">{description}</p>
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-200 text-slate-900 font-semibold rounded-xl shadow-xl transition-all active:scale-95"
        >
          {ctaLabel}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
