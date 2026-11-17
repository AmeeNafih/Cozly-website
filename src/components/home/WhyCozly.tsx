'use client';

import React from 'react';
import { ShieldCheck, Factory, Palette, MessageCircle, HeartHandshake, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/types';

interface WhyCozlyProps {
  points?: SiteSettings['whyCozly'];
}

export default function WhyCozly({ points }: WhyCozlyProps) {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
    Factory: <Factory className="w-6 h-6 text-brand-accent" />,
    Palette: <Palette className="w-6 h-6 text-brand-accent" />,
    MessageCircle: <MessageCircle className="w-6 h-6 text-brand-accent" />,
  };

  const defaultPoints = [
    {
      title: '100% Solid Kiln-Dried Teak',
      description: 'We never compromise on frames. Ethically sourced Kerala Teakwood seasoned to sub-10% moisture prevents warping for decades.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Direct From Manufacturer',
      description: 'No retail showroom markups or middleman commissions. You get heirloom grade furniture at genuine workshop direct prices.',
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
    <section id="why-cozly" className="py-20 sm:py-28 bg-brand-primary text-white relative overflow-hidden">
      {/* Background Subtle Accent Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary-light/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-brand-accent text-xs font-bold uppercase tracking-widest">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>The COZLY Distinction</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Furniture Built to Last Generations
          </h2>
          <p className="text-sm sm:text-base text-brand-surface/75 leading-relaxed">
            In an era of mass-manufactured throwaway furniture, we stand by traditional South Indian woodwork, transparent materials, and honest craftsman pricing.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-cozly bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {iconMap[item.icon] || <Sparkles className="w-6 h-6 text-brand-accent" />}
                </div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-surface/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-semibold tracking-wider uppercase text-brand-accent flex items-center gap-1">
                <span>Certified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
