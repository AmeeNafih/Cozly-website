'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Camera } from 'lucide-react';

export default function LivingRoomGallery() {
  const photos = [
    {
      src: '/images/products/factory-craft.svg',
      title: 'Precision Mortise & Tenon',
      subtitle: 'Erattupetta Woodshop',
      span: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      src: '/images/products/royal-tufting.svg',
      title: 'Hand-Tufted Chesterfield',
      subtitle: 'Deep Diamond Pleating',
      span: 'col-span-1',
    },
    {
      src: '/images/products/sahyadri-bed-mode.svg',
      title: 'Hydraulic Mechanism Testing',
      subtitle: 'German Gas Lift Pistons',
      span: 'col-span-1',
    },
    {
      src: '/images/products/malabar-teak-side.svg',
      title: 'Solid Teak Frame Finishing',
      subtitle: 'Natural Matte Polyurethane',
      span: 'col-span-1 md:col-span-2',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">
              <Camera className="w-3.5 h-3.5" />
              <span>Workshop & Projects</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-primary">
              Inside the COZLY Atelier
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl">
              Take a look behind the scenes at our woodworking, frame seasoning, high-density foam layering, and bespoke fabric stitching.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary hover:text-brand-accent transition-colors self-start md:self-auto group"
          >
            <span>View Full Photo Gallery</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-cozly overflow-hidden group bg-brand-secondary/40 border border-brand-border shadow-soft ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-brand-accent font-semibold block">
                  {item.subtitle}
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
