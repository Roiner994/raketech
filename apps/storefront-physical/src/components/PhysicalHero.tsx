"use client";

import React from "react";
import Image from "next/image";
import { Shield, Sparkles, Zap, Box, Layers, Cpu, Grid, MessageCircle } from "lucide-react";

const heroFeatures = [
  {
    icon: Zap,
    title: "Entrega rapida",
    description: "A todo el pais",
  },
  {
    icon: Cpu,
    title: "Materiales Pro",
    description: "PLA+ y PETG de alta calidad",
  },
  {
    icon: Sparkles,
    title: "Acabado Premium",
    description: "Calidad garantizada",
  },
];

export function PhysicalHero() {
  return (
    <div className="flex flex-col bg-[var(--bg-primary)]">
      <section className="relative isolate overflow-hidden bg-white dark:bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-white dark:bg-[var(--bg-primary)]" />

        {/* Mobile hero image */}
        <div className="absolute inset-x-0 bottom-0 top-0 lg:hidden">
          <div className="relative h-full w-full">
            <Image
              src="/images/hero/hero_mobile.png"
              alt="Colección de productos 3D Raketech"
              fill
              priority
              sizes="100vw"
              className="object-contain object-[center_120px] min-[420px]:object-[center_90px]"
            />
          </div>
        </div>

        {/* Desktop hero image */}
        <div className="absolute inset-0 hidden h-full w-full lg:left-auto lg:right-0 lg:block lg:w-[58%] xl:w-[56%]">
          <div className="relative h-full w-full">
            <Image
              src="/images/hero/raketech_hero_550.png"
              alt="Colección de productos 3D Raketech"
              fill
              priority
              sizes="(max-width: 1439px) 58vw, 56vw"
              className="object-cover object-[72%_center] xl:object-right"
            />
          </div>
        </div>

        {/* Readability overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.92)_22%,rgba(255,255,255,0.68)_38%,rgba(255,255,255,0.22)_54%,rgba(255,255,255,0.06)_66%,rgba(255,255,255,0)_78%)] dark:bg-[linear-gradient(180deg,rgba(var(--bg-primary-rgb),0.94)_0%,rgba(var(--bg-primary-rgb),0.86)_24%,rgba(var(--bg-primary-rgb),0.6)_42%,rgba(var(--bg-primary-rgb),0.18)_58%,rgba(var(--bg-primary-rgb),0.04)_70%,transparent_80%)] lg:hidden"
        />

        {/* Desktop overlay: Gradient from left (white/dark) to right (transparent) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.98)_28%,rgba(255,255,255,0.94)_42%,rgba(255,255,255,0.58)_56%,rgba(255,255,255,0.12)_68%,rgba(255,255,255,0)_76%)] lg:dark:bg-[linear-gradient(90deg,rgba(var(--bg-primary-rgb),0.99)_0%,rgba(var(--bg-primary-rgb),0.95)_28%,rgba(var(--bg-primary-rgb),0.82)_42%,rgba(var(--bg-primary-rgb),0.42)_58%,rgba(var(--bg-primary-rgb),0.1)_72%,transparent_80%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(var(--accent-primary-rgb),0.12),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(var(--accent-primary-rgb),0.08),transparent_18%)]"
        />

        <div className="relative z-10 mx-auto flex min-h-[780px] max-w-[1920px] flex-col justify-start px-5 pb-6 pt-8 sm:min-h-[860px] sm:px-6 lg:min-h-[550px] lg:justify-center lg:px-10 lg:pb-12 lg:pt-6 xl:px-12">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,660px)_1fr] lg:items-center">
            <div className="max-w-[660px] pt-3 lg:pt-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-chip-border)] bg-[var(--surface-chip)]/80 px-3.5 py-1.5 text-[0.55rem] font-black uppercase tracking-[0.12em] text-[var(--accent-primary)] shadow-sm backdrop-blur-md lg:px-4 lg:py-2 lg:text-[0.7rem]">
                <Box className="h-3 w-3" />
                Impresión 3D para tu espacio
              </span>

              <div className="mt-5 space-y-3 lg:mt-6 lg:space-y-5">
                <h1 className="max-w-[14ch] text-[2.2rem] font-black uppercase leading-[1] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[3.2rem] lg:max-w-[15ch] lg:text-[4.5rem] lg:leading-[0.9]">
                  Exhibidores y accesorios{" "}
                  <span className="text-[var(--accent-primary)]">3D</span> para
                  elevar tu espacio
                </h1>

                <p className="max-w-[200px] text-[0.85rem] leading-snug font-medium text-[var(--text-secondary)] sm:max-w-[42ch] sm:text-[1.05rem] lg:max-w-[48ch] lg:text-[1.05rem] lg:leading-[1.5]">
                  Piezas 3D premium para exhibidores, organizadores y accesorios gamer con diseño, función y personalidad.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:mt-8 lg:gap-3.5">
                <a
                  href="#catalog"
                  className="inline-flex h-11 w-[200px] items-center justify-center rounded-xl bg-[var(--accent-primary)] px-4 text-[0.78rem] font-black uppercase tracking-wider text-white shadow-lg shadow-[rgba(var(--accent-primary-rgb),0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto lg:h-12 lg:text-[0.86rem]"
                >
                  <div className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    <span>Ver catálogo</span>
                  </div>
                </a>

                <a
                  href="#custom"
                  className="inline-flex h-11 w-[200px] items-center justify-center rounded-xl border-2 border-[var(--accent-primary)] bg-white/40 px-4 text-[0.78rem] font-black uppercase tracking-wider text-[var(--accent-primary)] backdrop-blur-sm transition-all duration-300 hover:bg-[var(--accent-primary)] hover:text-white dark:bg-transparent sm:w-auto lg:h-12 lg:text-[0.86rem]"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Solicitar diseño</span>
                  </div>
                </a>
              </div>

              {/* Features Desktop */}
              <div className="mt-12 hidden max-w-[600px] gap-8 lg:grid lg:grid-cols-3">
                {heroFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex items-start gap-3.5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--surface-chip-border)] bg-[var(--surface-chip)] text-[var(--accent-primary)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[0.8rem] font-black uppercase leading-tight text-[var(--text-primary)]">
                          {feature.title}
                        </p>
                        <p className="mt-1 text-[0.75rem] leading-snug text-[var(--text-muted)]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Mobile */}
      <div className="px-5 pb-6 sm:px-6 lg:hidden">
        <div className="grid grid-cols-3 gap-3">
          {heroFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex flex-col items-center text-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--surface-chip-border)] bg-[var(--surface-chip)] text-[var(--accent-primary)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.68rem] font-black uppercase leading-tight text-[var(--text-primary)]">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-4 text-[var(--text-muted)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Features Bar (Premium Style) - Hidden on mobile */}
      <div className="relative z-20 -mt-8 hidden px-4 pb-16 sm:px-6 lg:block lg:px-10">
        <div className="mx-auto max-w-[1400px] rounded-[24px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-2 shadow-2xl backdrop-blur-xl dark:bg-[var(--surface-panel)]">
          <div className="grid grid-cols-2 gap-2 divide-[var(--border-subtle)] lg:grid-cols-4 lg:divide-x">
            {[
              { icon: Box, title: "Impresión 3D", subtitle: "de calidad" },
              { icon: Cpu, title: "Tecnología", subtitle: "precisa" },
              { icon: Sparkles, title: "Acabados", subtitle: "Premium" },
              { icon: Shield, title: "Atención", subtitle: "Personalizada" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group flex items-center gap-3 px-4 py-4 transition-colors duration-300 hover:bg-[var(--surface-soft)] lg:gap-5 lg:px-8 lg:py-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--surface-chip-border)] bg-[var(--surface-chip)] text-[var(--accent-primary)] transition-all duration-300 group-hover:scale-110 lg:h-14 lg:w-14 lg:rounded-2xl">
                  <feature.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[0.65rem] font-black uppercase tracking-wider text-[var(--text-primary)] leading-tight lg:text-[0.85rem]">
                    {feature.title}
                  </p>
                  <p className="text-[0.6rem] font-bold uppercase text-[var(--accent-primary)] lg:text-[0.75rem]">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
