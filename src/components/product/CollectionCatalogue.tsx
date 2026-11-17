'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, X, Search, RotateCcw, ChevronDown } from 'lucide-react';
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

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialMaterialParam);
  const [selectedSeating, setSelectedSeating] = useState<string>(initialSeatingParam);
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(80000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Seating options
  const seatingOptions: SeatingCapacity[] = [
    '1-Seater',
    '2-Seater',
    '3-Seater',
    'L-Shape',
    'Sectional',
    'Sofa-Cum-Bed',
    'Recliner',
    'Chaise',
  ];

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedMaterial('');
    setSelectedSeating('');
    setSelectedStock('all');
    setPriceRange(80000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    Boolean(selectedCategory) ||
    Boolean(selectedMaterial) ||
    Boolean(selectedSeating) ||
    selectedStock !== 'all' ||
    priceRange < 80000;

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Keyword Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.shortDescription.toLowerCase().includes(q);
          const matchStyle = product.style.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchStyle) return false;
        }

        // Category
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }

        // Material
        if (selectedMaterial && product.materialType !== selectedMaterial && product.materialType !== 'both') {
          return false;
        }

        // Seating Capacity
        if (selectedSeating && product.seatingCapacity !== selectedSeating) {
          return false;
        }

        // Stock Status
        if (selectedStock !== 'all' && product.stockStatus !== selectedStock) {
          return false;
        }

        // Price
        if (product.price > priceRange) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        // default featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [
    initialProducts,
    searchQuery,
    selectedCategory,
    selectedMaterial,
    selectedSeating,
    selectedStock,
    priceRange,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner & Header */}
      <div className="border-b border-brand-border pb-8 mb-8 space-y-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Direct Factory Catalogue
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary mt-1">
              Handcrafted Sofas
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl">
              Discover our complete collection of solid Kerala Teakwood, premium upholstered sectionals, recliners, and hydraulic sofa-beds. All prices include GST.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teak, velvet, bed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar Controls & Sorting */}
        <div className="flex items-center justify-between pt-4 gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-brand-primary text-white text-xs font-semibold rounded-cozly flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="px-3 py-2 text-xs font-semibold text-brand-accent hover:bg-brand-accent/10 rounded-cozly transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}

            <span className="text-xs text-brand-muted hidden sm:inline">
              Showing <strong>{filteredProducts.length}</strong> of {initialProducts.length} models
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-brand-muted hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent font-medium text-brand-primary shadow-sm"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Model Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block space-y-6 bg-white p-6 rounded-cozly border border-brand-border h-fit shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border">
            <h3 className="font-serif font-bold text-base text-brand-primary flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-accent" />
              <span>Filter Sofas</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="text-[11px] text-brand-accent hover:underline font-semibold"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
              Category
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === ''
                    ? 'bg-brand-secondary font-bold text-brand-primary'
                    : 'text-brand-charcoal/80 hover:bg-black/5'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-secondary font-bold text-brand-primary'
                      : 'text-brand-charcoal/80 hover:bg-black/5'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div className="space-y-2 pt-4 border-t border-brand-border/60">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
              Frame & Material
            </label>
            <div className="flex flex-col gap-1 text-xs">
              {[
                { label: 'All Materials', value: '' },
                { label: 'Solid Teakwood Frame', value: 'wooden' },
                { label: 'Premium Upholstered', value: 'upholstered' },
              ].map((m) => (
                <button
                  key={m.value}
                  onClick={() => setSelectedMaterial(m.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedMaterial === m.value
                      ? 'bg-brand-secondary font-bold text-brand-primary'
                      : 'text-brand-charcoal/80 hover:bg-black/5'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seating Capacity Filter */}
          <div className="space-y-2 pt-4 border-t border-brand-border/60">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
              Seating Capacity
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSeating('')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                  selectedSeating === ''
                    ? 'bg-brand-primary text-white border-brand-primary'
                    : 'bg-white text-brand-charcoal border-brand-border hover:bg-brand-secondary'
                }`}
              >
                All
              </button>
              {seatingOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeating(selectedSeating === s ? '' : s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    selectedSeating === s
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white text-brand-charcoal border-brand-border hover:bg-brand-secondary'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-4 border-t border-brand-border/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                Max Price
              </label>
              <span className="text-xs font-bold text-brand-accent">
                ₹{priceRange.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={20000}
              max={80000}
              step={2000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-accent"
            />
            <div className="flex justify-between text-[10px] text-brand-muted">
              <span>₹20,000</span>
              <span>₹80,000+</span>
            </div>
          </div>

          {/* Stock Availability */}
          <div className="space-y-2 pt-4 border-t border-brand-border/60">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
              Availability
            </label>
            <div className="flex flex-col gap-1 text-xs">
              {[
                { label: 'All Items', value: 'all' },
                { label: 'Ready to Ship (In Stock)', value: 'in_stock' },
                { label: 'Made to Order', value: 'made_to_order' },
              ].map((st) => (
                <button
                  key={st.value}
                  onClick={() => setSelectedStock(st.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedStock === st.value
                      ? 'bg-brand-secondary font-bold text-brand-primary'
                      : 'text-brand-charcoal/80 hover:bg-black/5'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-cozly border border-brand-border space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-secondary/60 flex items-center justify-center text-brand-muted">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-brand-primary">
                  No sofas match your filter
                </h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  Try adjusting your price range or clearing specific filter criteria to view more designs.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold uppercase tracking-wider rounded-cozly hover:bg-brand-primary-light transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-brand-surface p-6 shadow-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h3 className="font-serif font-bold text-lg text-brand-primary">
                  Filter Sofas
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-6">
                {/* Mobile Categories */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Category</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`px-3 py-1.5 rounded-lg text-xs ${
                        selectedCategory === '' ? 'bg-brand-primary text-white' : 'bg-white border'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`px-3 py-1.5 rounded-lg text-xs ${
                          selectedCategory === c.slug ? 'bg-brand-primary text-white' : 'bg-white border'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Seating */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Seating</span>
                  <div className="flex flex-wrap gap-1.5">
                    {seatingOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSeating(selectedSeating === s ? '' : s)}
                        className={`px-3 py-1.5 rounded-lg text-xs ${
                          selectedSeating === s ? 'bg-brand-primary text-white' : 'bg-white border'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider">Max Price</span>
                    <span className="font-bold text-brand-accent">₹{priceRange.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={80000}
                    step={2000}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-brand-accent"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-white border border-brand-border rounded-cozly text-xs font-bold text-brand-charcoal"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-brand-primary rounded-cozly text-xs font-bold text-white"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
