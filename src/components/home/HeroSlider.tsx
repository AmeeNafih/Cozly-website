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
      title: 'Crafted for every comfort.',
      subtitle: 'Bespoke solid timber and upholstered sofas handcrafted in Erattupetta, Kottayam. Factory-direct honest pricing with South India delivery.',
      tag: 'COZLY BY ZOFFARO IN • KERALA ATELIER',
      ctaText: 'Explore Collection',
      ctaLink: '/collection',
      imageUrl: '/images/hero/hero-atelier.svg',
    },
    {
      id: 'default-2',
      title: 'Design your custom sofa in 7 simple steps.',
      subtitle: 'Choose your silhouette, solid teak frame, premium fabrics, cushion firmness, and leg finishes with real-time preview and WhatsApp ordering.',
      tag: 'BESPOKE CONFIGURATOR • TAILORED LIVING',
      ctaText: 'Customize Your Sofa',
      ctaLink: '/customize',
      imageUrl: '/images/hero/hero-customizer.svg',
    },
    {
      id: 'default-3',
      title: 'White-glove delivery across South India.',
      subtitle: 'Fully assembled direct from our factory to your living room across Kerala, Bangalore, and Tamil Nadu by our trained specialists.',
      tag: 'FACTORY DIRECT • FULLY ASSEMBLED',
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
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background Slides */}
      <div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center">
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
            {/* Editorial Monochrome Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent lg:w-3/4" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            {/* Small section label in uppercase with wide letter spacing like "BY ZOFFARO IN" */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-kraft" />
              <span className="text-[10px] font-bold uppercase tracking-widestSection text-gray-200">
                {slide.tag || 'COZLY BY ZOFFARO IN'}
              </span>
            </div>

            {/* Main Headline in Poppins Bold */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              {slide.title}
            </h1>

            {/* Subheadline in Poppins Regular/Medium */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-xl">
              {slide.subtitle}
            </p>

            {/* Action Buttons: Solid black with white text, secondary with outline */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={slide.ctaLink || '/collection'}
                className="px-6 py-3.5 rounded-cozly bg-white text-black hover:bg-gray-200 font-bold text-xs tracking-wider uppercase transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>{slide.ctaText || 'Explore Collection'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/customize"
                className="px-6 py-3.5 rounded-cozly bg-black/60 hover:bg-black text-white font-bold text-xs tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all inline-flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-kraft" />
                <span>Customize Your Sofa</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-xs text-gray-400">
              <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider">Solid Teakwood</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Kiln-Dried Moisture &lt;10%</p>
              </div>
              <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider">Direct Factory</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Zero Showroom Markups</p>
              </div>
              <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider">Kerala • TN • BLR</p>
                <p className="text-[10px] text-gray-400 mt-0.5">White-Glove Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute z-20 bottom-8 right-8 hidden sm:flex items-center gap-2">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % activeSlides.length)}
            aria-label="Next slide"
            className="p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:hidden">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
