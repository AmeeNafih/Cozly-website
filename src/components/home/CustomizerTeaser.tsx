'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CustomizerTeaserProps {
  headline?: string;
  description?: string;
  imageUrl?: string;
}

export default function CustomizerTeaser({
  headline = 'Made to your measurements',
  description = 'Every sofa in our collection can be tailored in seating length, frame finish, fabric type, and cushion firmness. Configure your design online and send the specifications directly to our workshop.',
  imageUrl = '/images/real/cozly-photo-08.jpg',
}: CustomizerTeaserProps) {
  return (
    <section className="py-24 sm:py-36 bg-[#FAFAFA] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo Left (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-[4px] border border-neutral-200/80">
              <Image
                src={imageUrl}
                alt="COZLY by Zoffaro IN custom sofa configuration"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Short Text and Button Right (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              Customizer
            </span>

            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-[-0.015em] leading-[1.2]">
              {headline}
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed max-w-prose">
              {description}
            </p>

            <div className="pt-2">
              <Link
                href="/customize"
                className="inline-block px-7 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors"
              >
                Start customizing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
