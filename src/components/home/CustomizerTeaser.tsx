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
    <section className="py-20 sm:py-28 bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Information & Steps */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/15 text-brand-accent text-xs font-bold uppercase tracking-widest">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive 3D Configurator</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary leading-tight">
              Build Your Exact Dream Sofa in 7 Simple Steps
            </h2>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Every home in Kerala, Bangalore, and Tamil Nadu has a unique layout. Don't compromise with mass-market sizes. Use our live customizer to configure your ideal dimensions, frame finish, and upholstery.
            </p>

            {/* Steps List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {steps.map((s, idx) => (
                <div key={idx} className="p-4 rounded-cozly bg-white border border-brand-border shadow-soft">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-brand-secondary text-brand-primary text-xs font-bold flex items-center justify-center">
                      {s.num}
                    </span>
                    <h4 className="font-bold text-xs text-brand-primary uppercase tracking-wide">
                      {s.title}
                    </h4>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed pl-8">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/customize"
                className="px-6 py-3.5 rounded-cozly bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <span>Launch Sofa Customizer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-brand-muted flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                Live price calculation
              </span>
            </div>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="relative rounded-cozly overflow-hidden bg-white border border-brand-border shadow-elevated p-6 lg:p-8">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-surface mb-6">
              <Image
                src="/images/products/vembanad-lshape.svg"
                alt="Interactive sofa customizer live view"
                fill
                className="object-contain"
              />
            </div>

            {/* Live Config Summary Card Mock */}
            <div className="bg-brand-secondary/40 p-4 rounded-lg border border-brand-border/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent block">
                  Configuration Preview
                </span>
                <p className="font-serif font-bold text-sm text-brand-primary">
                  The Malabar Custom Sectional
                </p>
                <p className="text-xs text-brand-muted">
                  Solid Teak • Sand Bouclé • 40D Foam
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-brand-muted block">Live Total</span>
                <span className="font-bold text-base text-brand-primary">₹58,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
