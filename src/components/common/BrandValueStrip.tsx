import React from 'react';
import Image from 'next/image';
import { Shield, Sparkles, Feather, Clock } from 'lucide-react';

interface BrandValueStripProps {
  dark?: boolean;
}

export default function BrandValueStrip({ dark = false }: BrandValueStripProps) {
  const values = [
    {
      icon: Feather,
      title: 'Comfort',
      description: 'Ergonomic dual-density cushioning engineered for everyday indulgence.',
    },
    {
      icon: Shield,
      title: 'Quality',
      description: '100% solid kiln-dried timber frames built with precision joinery.',
    },
    {
      icon: Sparkles,
      title: 'Style',
      description: 'Contemporary Scandinavian silhouettes with clean, timeless lines.',
    },
    {
      icon: Clock,
      title: 'Durability',
      description: 'Generational longevity backed by a 5 to 15-year structural warranty.',
    },
  ];

  return (
    <div
      className={`border-y transition-colors ${
        dark
          ? 'bg-black text-white border-brand-charcoal-800'
          : 'bg-brand-grey-50 text-brand-charcoal-900 border-brand-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="flex items-start gap-3.5 group">
                <div
                  className={`p-2.5 rounded-cozly border transition-colors shrink-0 ${
                    dark
                      ? 'bg-brand-charcoal-900 border-brand-charcoal-800 text-white group-hover:border-white'
                      : 'bg-white border-brand-border text-black group-hover:border-black'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[1.25]" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4
                    className={`font-bold text-xs uppercase tracking-wider ${
                      dark ? 'text-white' : 'text-black'
                    }`}
                  >
                    {v.title}
                  </h4>
                  <p
                    className={`text-[11px] leading-relaxed line-clamp-2 ${
                      dark ? 'text-gray-400' : 'text-brand-charcoal-500'
                    }`}
                  >
                    {v.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
