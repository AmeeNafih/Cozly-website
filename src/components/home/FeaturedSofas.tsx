'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface FeaturedSofasProps {
  products: Product[];
  whatsappNumber?: string;
}

export default function FeaturedSofas({ products, whatsappNumber }: FeaturedSofasProps) {
  const featured = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-brand-grey-50 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 section-label mb-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-kraft" />
              <span>Curated Catalogue Selection</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-black mt-1 tracking-tight">
              Signature Sofas Handcrafted in Erattupetta
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-500 mt-2 max-w-xl">
              Ethically sourced Kerala Teakwood frames, high-density foam cores, and tailored fabrics built to last decades.
            </p>
          </div>

          <Link
            href="/collection"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-cozly bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal-800 transition-all shadow-sm self-start md:self-auto"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
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
