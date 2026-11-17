'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SlidersHorizontal, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function CustomizerTeaser() {
  const steps = [
    { num: '01', title: 'Silhouette & Type', desc: '3-Seater, L-Shape Sectional, Recliner, or Sofa-Cum-Bed' },
    { num: '02', title: 'Solid Timber Frame', desc: 'Grade-A Kerala Teak, Rosewood, or Concealed Hardwood' },
    { num: '03', title: 'Designer Fabrics', desc: 'Spill-proof Velvets, Belgian Linens, and Bouclés in 20+ shades' },
    { num: '04', title: 'Ergonomic Cushioning', desc: 'Choose between Soft-Cloud (32D), Medium-Balanced (40D), or Firm (50D)' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Information & Steps */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
              <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Interactive Configurator</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
              Build Your Exact Dream Sofa in 7 Simple Steps
            </h2>

            <p className="text-sm sm:text-base text-brand-charcoal-600 leading-relaxed">
              Every home in Kerala, Bangalore, and Tamil Nadu has a unique layout. Don't compromise with mass-market sizes. Use our live customizer to configure your ideal dimensions, frame finish, and upholstery.
            </p>

            {/* Steps List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {steps.map((s, idx) => (
                <div key={idx} className="p-4 rounded-cozly bg-brand-grey-50 border border-brand-border shadow-soft">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center">
                      {s.num}
                    </span>
                    <h4 className="font-bold text-xs text-black uppercase tracking-wide">
                      {s.title}
                    </h4>
                  </div>
                  <p className="text-xs text-brand-charcoal-600 leading-relaxed pl-8">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/customize"
                className="px-6 py-3.5 rounded-cozly bg-black hover:bg-brand-charcoal-800 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <span>Launch Sofa Customizer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-brand-charcoal-600 flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-black stroke-[2]" />
                Live price calculation
              </span>
            </div>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="relative rounded-cozly overflow-hidden bg-white border border-brand-border shadow-soft p-6 lg:p-8">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-grey-50 mb-6 border border-brand-border">
              <Image
                src="/images/products/vembanad-lshape.svg"
                alt="Interactive sofa customizer live view"
                fill
                className="object-contain"
              />
            </div>

            {/* Live Config Summary Card Mock */}
            <div className="bg-brand-grey-50 p-4 rounded-lg border border-brand-border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-kraft block">
                  Configuration Preview
                </span>
                <p className="font-bold text-sm text-black">
                  The Malabar Custom Sectional
                </p>
                <p className="text-xs text-brand-charcoal-600">
                  Solid Teak • Sand Bouclé • 40D Foam
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-brand-charcoal-500 block">Live Total</span>
                <span className="font-bold text-base text-black">₹58,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
