'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ChevronRight,
  CreditCard,
  Gamepad2,
  Headphones,
  Layers,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

interface PhysicalHeroProps {
  productCount: number;
}

const heroBenefits = [
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
    icon: Headphones,
    title: 'Atencion personalizada',
    description: 'Estamos para ayudarte',
  },
];

const heroCategories = [
  {
    icon: CreditCard,
    title: 'Gift cards',
    description: '+100 opciones',
    href: '#catalog',
  },
  {
    icon: Sparkles,
    title: 'Suscripciones',
    description: 'Play más, paga menos',
    href: '#featured',
  },
  {
    icon: Gamepad2,
    title: 'Accesorios',
    description: 'Mejora tu setup',
    href: '#catalog',
  },
  {
    icon: Boxes,
    title: 'Bases 3D',
    description: 'Diseño y funcionalidad',
    href: '#catalog',
  },
  {
    icon: ShieldCheck,
    title: 'Productos gaming',
    description: 'Para verdaderos gamers',
    href: '#catalog',
  },
];

export function PhysicalHero() {
  return (
    <section className="relative aspect-[21/9] w-full overflow-hidden bg-[#010614]">
      {/* Background Glows for Depth */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
      
      {/* The Hero Image - Full Bleed */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/digital-hero-scene.png"
          alt="Raketech Physical Storefront Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Subtle Bottom Fade to transition into the next section */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}

