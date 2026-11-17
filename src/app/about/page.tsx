import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, HeartHandshake, MapPin, ArrowRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'About Us | The COZLY Story & Heritage',
  description:
    'Learn about COZLY, an artisanal sofa manufacturer in Erattupetta, Kottayam, Kerala. Ethical teakwood craftsmanship, Scandinavian design, and workshop-direct values.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 sm:py-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Born in Erattupetta, Kottayam
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary leading-tight">
            Honest Craftsmanship for the Modern Indian Home
          </h1>
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            COZLY was founded with a singular conviction: furniture should be made from real solid timber, built to endure decades of family life, and priced without extravagant retail showroom overheads.
          </p>
        </div>
      </div>

      {/* Visual Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-cozly overflow-hidden bg-brand-secondary/40 border border-brand-border shadow-soft">
            <Image
              src="/images/products/factory-craft.svg"
              alt="COZLY workshop carpentry in Erattupetta"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-primary">
              Where Kerala Woodcraft Meets Scandinavian Balance
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
              Located in Erattupetta, at the foothills of Kerala’s lush high-ranges, our atelier brings together generational woodcrafters and modern upholstery engineers. Every tree we source is ethically harvested, seasoned in vacuum kilns until moisture falls below 10%, and inspected for natural grain beauty.
            </p>
            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
              We eliminate the traditional middleman chain: agents, distributors, and expensive city mall showrooms. When you order from COZLY, your sofa is hand-built right here in our workshop and transported directly into your home.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-brand-primary">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-accent" />
                <span>Erattupetta, Kottayam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                <span>10-Yr Timber Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our 3 Pillars */}
      <div className="bg-brand-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Our Principles
            </span>
            <h2 className="font-serif text-3xl font-bold">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-cozly bg-white/5 border border-white/10 space-y-4">
              <span className="text-2xl font-serif font-bold text-brand-accent">01</span>
              <h3 className="font-serif font-bold text-lg text-white">Authentic Materials Only</h3>
              <p className="text-xs text-brand-surface/75 leading-relaxed">
                Zero particle board. Zero cheap cardboard cores. We use solid Kerala Teakwood, multi-layer birch ply, and high-resilience 40D foams that maintain bounce for decades.
              </p>
            </div>

            <div className="p-8 rounded-cozly bg-white/5 border border-white/10 space-y-4">
              <span className="text-2xl font-serif font-bold text-brand-accent">02</span>
              <h3 className="font-serif font-bold text-lg text-white">Direct-to-Customer Value</h3>
              <p className="text-xs text-brand-surface/75 leading-relaxed">
                By operating directly from our Erattupetta factory, our customers save 30% to 50% compared to luxury retail chain prices without sacrificing an ounce of quality.
              </p>
            </div>

            <div className="p-8 rounded-cozly bg-white/5 border border-white/10 space-y-4">
              <span className="text-2xl font-serif font-bold text-brand-accent">03</span>
              <h3 className="font-serif font-bold text-lg text-white">Tailored Customization</h3>
              <p className="text-xs text-brand-surface/75 leading-relaxed">
                We believe your sofa should match your living space, not the other way around. Every dimension, fabric, firmness, and finish can be tailored to your preference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-brand-primary">
          Ready to Craft Your Family's Next Heirloom?
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/collection"
            className="px-6 py-3.5 bg-brand-primary text-white text-xs font-semibold uppercase tracking-wider rounded-cozly hover:bg-brand-primary-light transition-colors shadow-sm"
          >
            Explore Catalogue
          </Link>
          <Link
            href="/customize"
            className="px-6 py-3.5 bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider rounded-cozly hover:bg-brand-accent-hover transition-colors shadow-sm"
          >
            Customize Your Sofa
          </Link>
        </div>
      </div>
    </div>
  );
}
