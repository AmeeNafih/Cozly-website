import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, HeartHandshake, MapPin, ArrowRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'About Us | The COZLY by Zoffaro IN Story & Heritage',
  description:
    'Learn about COZLY by Zoffaro IN, an artisanal sofa manufacturer in Erattupetta, Kottayam, Kerala. Ethical teakwood craftsmanship, Scandinavian design, and workshop-direct values.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 sm:py-20 bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Born in Erattupetta, Kottayam
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
            Honest Craftsmanship for the Modern Indian Home
          </h1>
          <p className="text-base sm:text-lg text-brand-charcoal-600 leading-relaxed">
            COZLY by Zoffaro IN was founded with a singular conviction: furniture should be made from real solid timber, built to endure decades of family life, and priced without extravagant retail showroom overheads.
          </p>
        </div>
      </div>

      {/* Visual Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-cozly overflow-hidden bg-brand-grey-100 border border-brand-border shadow-soft">
            <Image
              src="/images/products/factory-craft.svg"
              alt="COZLY by Zoffaro IN workshop carpentry in Erattupetta"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              Where Kerala Woodcraft Meets Scandinavian Balance
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed">
              Located in Erattupetta, at the foothills of Kerala’s lush high-ranges, our atelier brings together generational woodcrafters and modern upholstery engineers. Every tree we source is ethically harvested, seasoned in vacuum kilns until moisture falls below 10%, and inspected for natural grain beauty.
            </p>
            <p className="text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed">
              We eliminate the traditional middleman chain: agents, distributors, and expensive city mall showrooms. When you order from COZLY by Zoffaro IN, your sofa is hand-built right here in our workshop and transported directly into your home.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-black">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-black stroke-[1.5]" />
                <span>Erattupetta, Kottayam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-black stroke-[1.5]" />
                <span>10-Yr Timber Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our 3 Pillars */}
      <div className="bg-black text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-400 block">
              Our Principles
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-cozly bg-white/5 border border-white/10 space-y-4">
              <span className="text-2xl font-bold text-brand-kraft">01</span>
              <h3 className="font-bold text-lg text-white">Authentic Materials Only</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Zero particle board. Zero cheap cardboard cores. We use solid Kerala Teakwood, multi-layer birch ply, and high-resilience 40D foams that maintain bounce for decades.
              </p>
            </div>

            <div className="p-8 rounded-cozly bg-white/5 border border-white/10 space-y-4">
              <span className="text-2xl font-bold text-brand-kraft">02</span>
              <h3 className="font-bold text-lg text-white">Direct-to-Customer Value</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                By operating directly from our Erattupetta factory, our customers save 30% to 50% compared to luxury retail chain prices without sacrificing an ounce of quality.
              </p>
            </div>

            <div className="p-8 rounded-cozly bg-white/5 border border-white/10 space-y-4">
              <span className="text-2xl font-bold text-brand-kraft">03</span>
              <h3 className="font-bold text-lg text-white">Tailored Customization</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                We believe your sofa should match your living space, not the other way around. Every dimension, fabric, firmness, and finish can be tailored to your preference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center space-y-6">
        <h2 className="text-3xl font-bold text-black tracking-tight">
          Ready to Craft Your Family's Next Heirloom?
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/collection"
            className="px-6 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-cozly hover:bg-brand-charcoal-800 transition-colors shadow-sm"
          >
            Explore Catalogue
          </Link>
          <Link
            href="/customize"
            className="px-6 py-3.5 bg-white border border-brand-border text-black text-xs font-bold uppercase tracking-wider rounded-cozly hover:bg-brand-grey-100 transition-colors shadow-sm"
          >
            Customize Your Sofa
          </Link>
        </div>
      </div>
    </div>
  );
}
