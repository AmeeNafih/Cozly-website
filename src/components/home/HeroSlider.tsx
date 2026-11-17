'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';

interface HeroSliderProps {
  slides?: SiteSettings['heroContent']['slides'];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const activeSlides = slides && slides.length > 0 ? slides : [
    {
      id: 'default-1',
      title: 'Mastercrafted Sofas. Direct from Our Kerala Atelier.',
      subtitle: 'Solid Teakwood & bespoke upholstery tailored to your living space. Handcrafted in Erattupetta, Kottayam with factory-direct transparent pricing.',
      tag: 'ARTISANAL FURNITURE • KERALA HERITAGE',
      ctaText: 'Explore Collection',
      ctaLink: '/collection',
      imageUrl: '/images/hero/hero-atelier.svg',
    },
    {
      id: 'default-2',
      title: 'Design Your Custom Sofa in 7 Simple Steps.',
      subtitle: 'Choose your configuration, solid wood frame, premium fabrics, cushion firmness, and leg finishes with real-time preview and WhatsApp ordering.',
      tag: 'BESPOKE SOFA CONFIGURATOR',
      ctaText: 'Customize Your Sofa',
      ctaLink: '/customize',
      imageUrl: '/images/hero/hero-customizer.svg',
    },
    {
      id: 'default-3',
      title: 'White-Glove Delivery Across Kerala, Bangalore & Tamil Nadu.',
      subtitle: 'Fully assembled direct from our factory to your living room. Inspected, leveled, and placed with care by our dedicated delivery team.',
      tag: 'DIRECT FACTORY DELIVERY',
      ctaText: 'View Delivery Coverage',
      ctaLink: '/#delivery',
      imageUrl: '/images/hero/hero-delivery.svg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const slide = activeSlides[current];

  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      {/* Background Slides */}
      <div className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] flex items-center">
        {activeSlides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={item.imageUrl || '/images/hero/hero-atelier.svg'}
              alt={item.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            {/* Gradient Dark Overlay for strong contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/80 to-transparent lg:w-3/4" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                {slide.tag || 'ARTISANAL SOFAS • KERALA'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {slide.title}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-brand-surface/80 leading-relaxed font-normal">
              {slide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={slide.ctaLink || '/collection'}
                className="px-6 py-3.5 rounded-cozly bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <span>{slide.ctaText || 'Explore Collection'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/customize"
                className="px-6 py-3.5 rounded-cozly bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                <span>Customize Your Sofa</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-xs text-brand-surface/70">
              <div>
                <p className="font-bold text-white text-sm">Solid Teakwood</p>
                <p className="text-[11px]">Kiln-Dried Moisture &lt;10%</p>
              </div>
              <div>
                <p className="font-bold text-white text-sm">Direct Factory</p>
                <p className="text-[11px]">No Showroom Markups</p>
              </div>
              <div>
                <p className="font-bold text-white text-sm">Kerala • TN • BLR</p>
                <p className="text-[11px]">White-Glove Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute z-20 bottom-8 right-8 hidden sm:flex items-center gap-2">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-black/40 hover:bg-brand-accent text-white backdrop-blur-md border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % activeSlides.length)}
            aria-label="Next slide"
            className="p-3 rounded-full bg-black/40 hover:bg-brand-accent text-white backdrop-blur-md border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:hidden">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'w-6 bg-brand-accent' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
