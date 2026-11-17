'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface FeaturedSofasProps {
  products: Product[];
  whatsappNumber?: string;
}

export default function FeaturedSofas({ products, whatsappNumber }: FeaturedSofasProps) {
  // Show exactly 4 featured products in a clean grid
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const displayItems = featured.length >= 4 ? featured : products.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAFA] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Selected Models
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-[-0.015em]">
              Featured sofas
            </h2>
          </div>

          <Link
            href="/collection"
            className="text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-black underline underline-offset-8 transition-colors"
          >
            View all
          </Link>
        </div>

        {/* 4 Products in a Clean Grid: 4 cols desktop, 2 mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
