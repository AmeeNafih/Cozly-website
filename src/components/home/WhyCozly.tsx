'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface WorkshopStoryProps {
  headline?: string;
  description?: string;
  imageUrl?: string;
}

export default function WhyCozly({
  headline = 'Handcrafted in Erattupetta',
  description = 'In our Erattupetta workshop, we build sofas one at a time using seasoned solid timber and balanced upholstery foam. Every piece is constructed to order by experienced local woodcrafters, without retail showroom markups or distributor layers.',
  imageUrl = '/images/real/cozly-photo-13.jpg',
}: WorkshopStoryProps) {
  return (
    <section className="py-24 sm:py-36 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Photo of the Workshop (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-[4px] border border-neutral-200/80">
              <Image
                src={imageUrl}
                alt="COZLY by Zoffaro IN workshop carpentry joinery in Erattupetta"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* 2–3 Short Sentences + Workshop Link (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              Our Atelier
            </span>

            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-[-0.015em] leading-[1.2]">
              {headline}
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed max-w-prose">
              {description}
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-black hover:text-neutral-700 underline underline-offset-8 transition-colors font-medium"
              >
                <span>Visit our workshop</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
