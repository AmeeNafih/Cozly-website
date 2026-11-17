'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings } from '@/types';

interface HeroSliderProps {
  slides?: SiteSettings['heroContent']['slides'];
  headline?: string;
  subheadline?: string;
}

export default function HeroSlider({ slides, headline, subheadline }: HeroSliderProps) {
  const firstSlide = slides && slides.length > 0 ? slides[0] : null;

  // Calm, confident, max 6 words
  const title = headline || firstSlide?.title || 'Sofas made for living.';
  const subtitle =
    subheadline ||
    firstSlide?.subtitle ||
    'Solid timber frames and tailored upholstery, crafted in Erattupetta and delivered direct.';
  const heroImage = firstSlide?.imageUrl || '/images/real/cozly-photo-05.jpg';

  return (
    <section className="relative w-full bg-black text-white overflow-hidden -mt-20">
      {/* Edge-to-edge Hero Photography: 16:9 Desktop / 4:5 Mobile */}
      <div className="relative w-full min-h-[620px] sm:min-h-[720px] lg:h-[92vh] max-h-[960px] flex items-end">
        <Image
          src={heroImage}
          alt="COZLY by Zoffaro IN handcrafted living room sofa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Calm Cinematic Scrim for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

        {/* Content Container (Bottom-aligned, generous padding) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pb-24">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <span className="inline-block text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-neutral-300">
              COZLY by Zoffaro IN • Erattupetta
            </span>

            {/* Headline: fluid clamp, Light/Regular weight, max 6 words */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] leading-[1.12] text-white">
              {title}
            </h1>

            {/* Subtext: 1 clean line, no superlatives */}
            <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* Action Buttons: Solid black with white text / secondary outline */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/collection"
                className="px-6 py-3 bg-white text-black hover:bg-neutral-100 text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors"
              >
                Shop sofas
              </Link>
              <Link
                href="/customize"
                className="px-6 py-3 bg-transparent text-white border border-white/60 hover:border-white hover:bg-white/10 text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors"
              >
                Customize yours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
