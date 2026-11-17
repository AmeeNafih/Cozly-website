'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { Product, Category, MaterialType, SeatingCapacity } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface CollectionCatalogueProps {
  initialProducts: Product[];
  categories: Category[];
  whatsappNumber?: string;
}

export default function CollectionCatalogue({
  initialProducts,
  categories,
  whatsappNumber,
}: CollectionCatalogueProps) {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category') || '';
  const initialMaterialParam = searchParams.get('material') || '';
  const initialSeatingParam = searchParams.get('seating') || '';
  const initialSearchParam = searchParams.get('q') || '';

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialMaterialParam);
  const [selectedSeating, setSelectedSeating] = useState<string>(initialSeatingParam);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const seatingOptions: SeatingCapacity[] = [
    '2-Seater',
    '3-Seater',
    'L-Shape',
    'Sectional',
    'Sofa-Cum-Bed',
    'Recliner',
    'Chaise',
  ];

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedMaterial('');
    setSelectedSeating('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    Boolean(selectedCategory) ||
    Boolean(selectedMaterial) ||
    Boolean(selectedSeating);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.shortDescription.toLowerCase().includes(q);
          const matchStyle = product.style?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchStyle) return false;
        }

        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }

        if (selectedMaterial && product.materialType !== selectedMaterial && product.materialType !== 'both') {
          return false;
        }

        if (selectedSeating && product.seatingCapacity !== selectedSeating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [initialProducts, searchQuery, selectedCategory, selectedMaterial, selectedSeating, sortBy]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Page Title & Count */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
                Catalogue
              </span>
              <h1 className="text-3xl sm:text-5xl font-normal text-black tracking-[-0.02em]">
                Collection
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'sofa' : 'sofas'}
            </p>
          </div>

          {/* Slim Filter Bar (Desktop) & Drawer Trigger (Mobile) */}
          <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between gap-4 flex-wrap">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3 flex-wrap">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-neutral-50 text-neutral-800 border border-neutral-200 pl-3 pr-8 py-1.5 text-xs rounded-[4px] focus:outline-none focus:border-black"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Material Filter */}
              <div className="relative">
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="appearance-none bg-neutral-50 text-neutral-800 border border-neutral-200 pl-3 pr-8 py-1.5 text-xs rounded-[4px] focus:outline-none focus:border-black"
                >
                  <option value="">All materials</option>
                  <option value="wooden">Solid Wood</option>
                  <option value="upholstered">Upholstered</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Seating Filter */}
              <div className="relative">
                <select
                  value={selectedSeating}
                  onChange={(e) => setSelectedSeating(e.target.value)}
                  className="appearance-none bg-neutral-50 text-neutral-800 border border-neutral-200 pl-3 pr-8 py-1.5 text-xs rounded-[4px] focus:outline-none focus:border-black"
                >
                  <option value="">All seating</option>
                  {seatingOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleReset}
                  className="text-xs text-neutral-500 hover:text-black underline underline-offset-4 flex items-center gap-1 ml-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="px-3 py-1.5 border border-neutral-200 rounded-[4px] text-xs font-medium uppercase tracking-[0.12em] flex items-center gap-1.5 text-black hover:bg-neutral-50"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters ? '• Active' : ''}</span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={handleReset}
                  className="text-xs text-neutral-500 underline underline-offset-4"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-neutral-500 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent text-neutral-900 border border-neutral-200 pl-3 pr-8 py-1.5 text-xs rounded-[4px] focus:outline-none focus:border-black font-medium"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A–Z</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Clean 4-Column Desktop / 3-Column Tablet / 2-Column Mobile Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="text-base text-neutral-600">No sofas match the selected criteria.</p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-black text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => {
              // After the 4th item, optionally insert a peaceful lifestyle photography tile
              const showLifestyleTile = index === 4;

              return (
                <React.Fragment key={product.id}>
                  {showLifestyleTile && (
                    <div className="col-span-2 md:col-span-3 lg:col-span-4 my-8 relative aspect-[21/9] sm:aspect-[3/1] rounded-[4px] overflow-hidden bg-neutral-100 border border-neutral-200/80">
                      <Image
                        src="/images/real/cozly-photo-21.jpg"
                        alt="COZLY by Zoffaro IN ambient living room installation"
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/35 flex items-end p-6 sm:p-10">
                        <p className="text-white text-sm sm:text-base font-normal tracking-wide max-w-lg">
                          Built with solid Kerala Teakwood frames and Belgian linens. Made to order for every home.
                        </p>
                      </div>
                    </div>
                  )}

                  <ProductCard
                    product={product}
                    whatsappNumber={whatsappNumber}
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Filter Bottom-Sheet Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="bg-white rounded-t-xl p-6 space-y-6 max-h-[85vh] overflow-y-auto animate-fadeIn border-t border-neutral-200">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-black">
                Filters
              </h3>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 text-neutral-500 hover:text-black"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-500 block">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 p-2.5 rounded-[4px]"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Material */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-500 block">
                Material
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 p-2.5 rounded-[4px]"
              >
                <option value="">All materials</option>
                <option value="wooden">Solid Wood</option>
                <option value="upholstered">Upholstered</option>
              </select>
            </div>

            {/* Seating */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-500 block">
                Seating Capacity
              </label>
              <select
                value={selectedSeating}
                onChange={(e) => setSelectedSeating(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 p-2.5 rounded-[4px]"
              >
                <option value="">All seating</option>
                {seatingOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Apply & Reset Buttons */}
            <div className="pt-4 border-t border-neutral-200 flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 text-xs uppercase tracking-[0.14em] font-medium border border-neutral-200 rounded-[4px] text-black"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 py-3 text-xs uppercase tracking-[0.14em] font-medium bg-black text-white rounded-[4px]"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
