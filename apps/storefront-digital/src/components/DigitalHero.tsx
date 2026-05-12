'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  CreditCard,
  Crown,
  Gamepad2,
  Grid3X3,
  Shield,
  Sparkles,
  Star,
  Zap,
  Rocket,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const heroFeatures = [
  {
    icon: Zap,
    title: 'Entrega rapida',
    description: 'A todo el pais',
  },
  {
    icon: Shield,
    title: 'Productos digitales',
    description: 'Codigos 100% originales',
  },
  {
    icon: Sparkles,
    title: 'Atencion personalizada',
    description: 'Estamos para ayudarte',
  },
];

const heroCategories = [
  {
    icon: CreditCard,
    title: 'Gift cards',
    description: '+100 opciones',
    color: 'blue',
  },
  {
    icon: Crown,
    title: 'Suscripciones',
    description: 'Play mas, paga menos',
    color: 'green',
  },
  {
    icon: Gamepad2,
    title: 'Accesorios',
    description: 'Mejora tu setup',
    color: 'blue',
  },
  {
    icon: Box,
    title: 'Bases 3D',
    description: 'Diseño y funcionalidad',
    color: 'blue',
  },
  {
    icon: Star,
    title: 'Productos gaming',
    description: 'Para verdaderos gamers',
    color: 'blue',
  },
];

export function DigitalHero() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(heroCategories[0]);

  return (
    <div className="flex flex-col bg-[#020617]">
      <section className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/digital-hero-panoramic.png"
            alt="Consola, headset, controles y accesorios gaming en una plataforma iluminada"
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 1px"
            className="hidden object-cover object-[68%_center] lg:block"
          />
          <Image
            src="/images/hero/digital-hero-square.png"
            alt="Consola, headset, controles y accesorios gaming en una plataforma iluminada"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 1px"
            className="object-contain object-bottom lg:hidden"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.6)_40%,rgba(2,6,23,0)_75%)] lg:bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.94)_24%,rgba(2,6,23,0.72)_40%,rgba(2,6,23,0.3)_56%,rgba(2,6,23,0.08)_70%,rgba(2,6,23,0.02)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(31,101,255,0.16),transparent_28%),radial-gradient(circle_at_78%_82%,rgba(40,230,114,0.08),transparent_16%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[56%] bg-[linear-gradient(180deg,rgba(7,18,49,0.08)_0%,rgba(7,18,49,0.08)_100%)] [background-image:linear-gradient(rgba(83,118,193,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(83,118,193,0.12)_1px,transparent_1px)] [background-size:64px_64px] opacity-30"
        />

        <div className="relative z-10 mx-auto flex min-h-[90dvh] max-w-[1920px] flex-col justify-start px-5 pb-12 pt-12 sm:px-6 lg:h-[550px] lg:min-h-[550px] lg:justify-center lg:px-10 lg:pt-5 xl:px-12">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,800px)_1fr] lg:items-center">
            <div className="max-w-[800px] pt-3 lg:pt-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(34,197,94,0.46)] bg-[rgba(7,33,20,0.72)] px-3.5 py-1.5 text-[0.64rem] font-black uppercase tracking-[0.08em] text-[#1fff57] shadow-[0_0_0_1px_rgba(34,197,94,0.1)] lg:text-[0.7rem]">
                <Shield className="h-3 w-3" />
                Tu tienda gamer de confianza
              </span>

              <div className="mt-6 space-y-5">
                <h1 className="text-[2.5rem] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-[3.5rem] lg:text-[4.8rem]">
                  Todo lo que <br />
                  <span className="text-[#3f5dff] drop-shadow-[0_0_15px_rgba(63,93,255,0.3)]">
                    tu mundo gamer
                  </span>
                  <br />
                  necesita
                </h1>

                <p className="max-w-[50ch] text-[0.85rem] leading-[1.35] text-[rgba(223,232,255,0.9)] sm:text-[0.92rem] lg:text-[0.96rem]">
                  Gift cards, suscripciones, accesorios y los mejores productos gaming en un solo lugar. Calidad, confianza y pasión gamer.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-6">
                <a
                  href="https://wa.me/584227180378?text=Hola,%20vengo%20de%20Raketech%20Digital%20y%20quiero%20comprar%20un%20producto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-between rounded-xl bg-[linear-gradient(135deg,#3f5dff_0%,#4b74ff_100%)] px-5 text-[0.85rem] font-black uppercase tracking-wide text-white shadow-[0_18px_40px_rgba(64,103,255,0.3)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:justify-center sm:gap-2 lg:h-12 lg:text-[0.86rem]"
                >
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    <span>Comprar ahora</span>
                  </div>
                  <ChevronRight className="h-4 w-4 sm:hidden" />
                </a>

                <a
                  href="#catalog"
                  className="inline-flex h-12 w-full items-center justify-between rounded-xl border border-[rgba(63,93,255,0.4)] bg-[rgba(4,11,31,0.64)] px-5 text-[0.85rem] font-black uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[rgba(7,21,53,0.82)] sm:w-auto sm:justify-center sm:gap-2 lg:h-12 lg:text-[0.86rem]"
                >
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-[#3f5dff]" />
                    <span>Ver catálogo</span>
                  </div>
                  <ChevronRight className="h-4 w-4 sm:hidden" />
                </a>
              </div>

              <div className="mt-10 hidden max-w-[520px] gap-6 lg:grid md:grid-cols-3">
                {heroFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.title} className="flex items-start gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(59,130,246,0.34)] bg-[rgba(7,17,44,0.72)] text-[#4d7fff] shadow-[0_0_24px_rgba(59,130,246,0.18)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[0.75rem] font-black uppercase leading-tight text-white lg:text-[0.8rem]">
                          {feature.title}
                        </p>
                        <p className="mt-0.5 text-[0.72rem] leading-4 text-[rgba(223,232,255,0.78)] lg:text-[0.78rem]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div className="relative z-20 px-4 pb-12 sm:px-6 lg:px-10">
        {/* Mobile Info Items (Horizontal Scroll) */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-2.5">
            {heroCategories
              .filter(cat => cat.title !== 'Bases 3D')
              .map((category) => {
              const Icon = category.icon;
              const isGreen = category.color === 'green';
              
              return (
                <div 
                  key={category.title}
                  className="flex items-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] p-2.5 backdrop-blur-sm"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    isGreen 
                      ? 'border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.1)] text-[#1fff57]' 
                      : 'border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.1)] text-[#4d7fff]'
                  }`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.62rem] font-black uppercase tracking-wider text-white leading-tight">
                      {category.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Categories */}
        <div className="hidden lg:block mx-auto max-w-[1400px] rounded-[24px] border border-[rgba(71,111,204,0.12)] bg-[rgba(2,6,23,0.7)] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="grid grid-cols-1 divide-[rgba(71,111,204,0.16)] sm:grid-cols-2 lg:grid-cols-5 lg:divide-x">
            {heroCategories.map((category) => {
              const Icon = category.icon;
              const isGreen = category.color === 'green';

              return (
                <div
                  key={category.title}
                  className="group flex items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 ${
                    isGreen 
                      ? 'border-[rgba(34,197,94,0.4)] bg-[rgba(7,33,20,0.72)] text-[#1fff57] shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
                      : 'border-[rgba(59,130,246,0.4)] bg-[rgba(7,17,44,0.72)] text-[#4d7fff] shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.8rem] font-black uppercase tracking-wide text-white lg:text-[0.85rem]">
                      {category.title}
                    </p>
                    <p className="text-[0.72rem] font-medium leading-tight text-[rgba(223,232,255,0.6)] lg:text-[0.75rem]">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
