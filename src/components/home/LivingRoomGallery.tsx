'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Camera, Instagram } from 'lucide-react';

export default function LivingRoomGallery() {
  const photos = [
    {
      src: '/images/real/cozly-photo-21.jpg',
      title: 'Bespoke Low-Slung Modular Lounge',
      subtitle: 'Erattupetta Atelier Collection',
      span: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      src: '/images/real/cozly-photo-13.jpg',
      title: 'Handcrafted Timber Joinery & Shelf',
      subtitle: 'Solid Wood Craftsmanship',
      span: 'col-span-1',
    },
    {
      src: '/images/real/cozly-photo-06.jpg',
      title: 'Ergonomic Swivel Leather Lounger',
      subtitle: 'Precision Mechanical Recliner',
      span: 'col-span-1',
    },
    {
      src: '/images/real/cozly-photo-26.jpg',
      title: 'Architectural Curved Living Suite',
      subtitle: 'Custom Villa Interior Project',
      span: 'col-span-1 md:col-span-2',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 mb-1">
              <Camera className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Workshop & Projects</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-black tracking-tight">
              Inside the COZLY by Zoffaro IN Atelier
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2 max-w-xl">
              Take a look behind the scenes at our woodworking, frame seasoning, high-density foam layering, and bespoke fabric stitching.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black hover:text-brand-charcoal-700 transition-colors self-start md:self-auto group"
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
              className={`relative rounded-cozly overflow-hidden group bg-brand-grey-100 border border-brand-border shadow-soft ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-brand-kraft font-semibold block">
                  {item.subtitle}
                </span>
                <h4 className="font-bold text-base sm:text-lg">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
        {/* Instagram Follow Community Banner */}
        <div className="mt-8 p-6 sm:p-8 rounded-cozly bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1.5 text-center sm:text-left z-10">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-widest text-brand-kraft">
              <Instagram className="w-4 h-4 text-white" />
              <span>Join Us on Instagram</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              @cozly_by_zoffaro.in
            </h3>
            <p className="text-xs text-gray-400 max-w-md">
              Watch real wood carving in Erattupetta, fabric swatch matching, and client living rooms across South India.
            </p>
          </div>

          <a
            href="https://www.instagram.com/cozly_by_zoffaro.in"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 shrink-0 px-6 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-cozly hover:bg-brand-grey-100 transition-all shadow-md flex items-center gap-2 group"
          >
            <Instagram className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
