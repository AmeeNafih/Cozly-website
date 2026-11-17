import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'About | COZLY by Zoffaro IN',
  description:
    'Artisanal sofa manufacturing based in Erattupetta, Kottayam, Kerala. Solid timber frames, tailored fabrics, and direct workshop delivery.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-white">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12">
        <div className="max-w-2xl space-y-4">
          <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
            About the Atelier
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-black tracking-[-0.02em] leading-[1.15]">
            Built with care in Erattupetta.
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            COZLY by Zoffaro IN is an independent sofa workshop located in Erattupetta, Kottayam. We craft sofas using seasoned solid timber and tailored upholstery fabrics, delivering directly to homes across South India.
          </p>
        </div>
      </div>

      {/* Large Photography Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden bg-neutral-100 border border-neutral-200/80">
              <Image
                src="/images/real/cozly-photo-13.jpg"
                alt="COZLY by Zoffaro IN workshop joinery in Erattupetta"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal text-black tracking-[-0.015em]">
              Solid timber and thoughtful proportions
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Every sofa begins with an internal frame of seasoned solid timber, assembled by experienced woodcrafters using traditional mortise-and-tenon and dowel joints.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We sell directly from our workshop to you. This keeps communication clear, enables custom dimensions, and avoids retail middleman markups.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-neutral-700">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-black stroke-[1.5]" />
                <span>Erattupetta, Kottayam, Kerala</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Calm Principles */}
      <div className="bg-[#FAFAFA] border-t border-neutral-200 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
              How we work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.16em] text-neutral-400 font-medium">01</span>
              <h3 className="text-base font-medium text-black">Solid Wood Frames</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We build sofa frames with solid seasoned wood. We do not use particle board or hollow honeycomb cardboard.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.16em] text-neutral-400 font-medium">02</span>
              <h3 className="text-base font-medium text-black">Factory-Direct Pricing</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                By manufacturing in Erattupetta and delivering directly to your door, we provide honest workshop prices.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.16em] text-neutral-400 font-medium">03</span>
              <h3 className="text-base font-medium text-black">Custom Dimensions</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Every living room is different. We modify lengths, cushion densities, and fabric colors to fit your space.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 items-center justify-between">
            <p className="text-xs text-neutral-500">
              Have questions about visiting our Erattupetta workshop?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-black underline underline-offset-4 font-medium"
            >
              <span>Workshop contact details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
