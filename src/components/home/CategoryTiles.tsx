'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryTilesProps {
  categories: Category[];
}

export default function CategoryTiles({ categories }: CategoryTilesProps) {
  // Clean, short display titles as specified
  const displayTitleMap: Record<string, string> = {
    'cat-wooden': 'Wooden',
    'cat-upholstered': 'Upholstered',
    'cat-lshape': 'L-Shape & Sectionals',
    'cat-sofa-bed': 'Sofa-Cum-Beds',
    'cat-recliners': 'Recliners & Chaises',
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Catalogue
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-[-0.015em]">
              Shop by category
            </h2>
          </div>
          <Link
            href="/collection"
            className="text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-black underline underline-offset-8 transition-colors hidden sm:inline-block"
          >
            All sofas
          </Link>
        </div>

        {/* 5 Large Image Tiles: Title only, no paragraphs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.slice(0, 5).map((category) => {
            const title = displayTitleMap[category.id] || category.name;
            return (
              <Link
                key={category.id}
                href={`/collection?category=${category.slug}`}
                className="group flex flex-col"
              >
                {/* 4:5 Large Photo Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-[4px] border border-neutral-200/80">
                  <Image
                    src={category.imageUrl || '/images/real/cozly-photo-14.jpg'}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Title Only */}
                <div className="pt-3.5 pb-1">
                  <h3 className="text-sm sm:text-base font-medium text-black group-hover:underline underline-offset-4 transition-all">
                    {title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/collection"
            className="text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-black underline underline-offset-8 transition-colors inline-block"
          >
            View all sofas
          </Link>
        </div>
      </div>
    </section>
  );
}
