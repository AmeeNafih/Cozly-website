'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Hammer, Palette, MessageCircle, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/types';

interface WhyCozlyProps {
  points?: SiteSettings['whyCozly'];
}

export default function WhyCozly({ points }: WhyCozlyProps) {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <Shield className="w-5 h-5 text-white stroke-[1.25]" />,
    Factory: <Hammer className="w-5 h-5 text-white stroke-[1.25]" />,
    Palette: <Palette className="w-5 h-5 text-white stroke-[1.25]" />,
    MessageCircle: <MessageCircle className="w-5 h-5 text-white stroke-[1.25]" />,
  };

  const defaultPoints = [
    {
      title: '100% Solid Kiln-Dried Teak',
      description: 'We never compromise on frames. Ethically sourced Kerala Teakwood seasoned to sub-10% moisture prevents warping for decades.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Direct From Manufacturer',
      description: 'Zero retail showroom markups or middleman commissions. You get heirloom grade furniture at genuine workshop direct prices.',
      icon: 'Factory',
    },
    {
      title: 'Complete Customization',
      description: 'Every model can be adjusted in length, cushion density, armrest width, and upholstered in over 40+ designer fabrics.',
      icon: 'Palette',
    },
    {
      title: 'Dedicated WhatsApp Support',
      description: 'Chat directly with our Erattupetta factory craftsmen for live timber photos, fabric swatch dispatches, and order tracking.',
      icon: 'MessageCircle',
    },
  ];

  const items = points && points.length > 0 ? points : defaultPoints;

  return (
    <section id="why-cozly" className="py-20 sm:py-28 bg-black text-white relative overflow-hidden">
      {/* Subtle Sofa Watermark in Section Background */}
      <div className="absolute -top-12 -left-12 w-96 h-96 opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/brand/sofa-icon-white.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-gray-300 text-[10px] font-bold uppercase tracking-widestSection">
            <span>The COZLY Distinction</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            Furniture Built to Last Generations
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
            In an era of mass-manufactured throwaway furniture, we stand by traditional South Indian woodwork, transparent materials, and honest craftsman pricing.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-cozly bg-brand-charcoal-900 border border-brand-charcoal-800 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-black border border-brand-charcoal-800 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-white stroke-[1.25]" />}
                </div>
                <h3 className="font-heading font-bold text-base text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-charcoal-800 text-[10px] font-bold tracking-widestSection uppercase text-brand-kraft">
                <span>Certified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
