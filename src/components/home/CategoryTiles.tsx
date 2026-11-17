'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/types';

interface CategoryTilesProps {
  categories: Category[];
}

export default function CategoryTiles({ categories }: CategoryTilesProps) {
  return (
    <section className="py-16 sm:py-24 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Explore By Configuration
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-primary mt-1">
              Engineered For Modern Living
            </h2>
          </div>
          <Link
            href="/collection"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary hover:text-brand-accent transition-colors self-start md:self-auto group"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/collection?category=${category.slug}`}
              className="group relative rounded-cozly overflow-hidden bg-white border border-brand-border shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative h-60 w-full bg-brand-secondary/40 overflow-hidden">
                <Image
                  src={category.imageUrl || '/images/products/malabar-teak.svg'}
                  alt={category.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-colors shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-primary group-hover:text-brand-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-2 mt-1">
                    {category.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs text-brand-charcoal/70 border-t border-brand-border/60">
                  <span className="font-medium text-brand-accent">Explore models</span>
                  <span>Direct Factory</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
