'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Ruler,
  Layers,
  Sparkles,
  Minus,
  Plus,
  ZoomIn,
} from 'lucide-react';
import { Product } from '@/types';
import { formatINR, generateProductEnquiryUrl } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/product/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  whatsappNumber?: string;
}

export default function ProductDetailView({
  product,
  relatedProducts,
  whatsappNumber = '+919846581241',
}: ProductDetailViewProps) {
  const { addToCart } = useCart();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(product.fabrics[0] || null);
  const [selectedFinish, setSelectedFinish] = useState(product.woodFinishes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'dimensions' | 'delivery' | 'warranty'>('specs');

  // Compute calculated price based on selected fabric upgrade
  const fabricModifier = selectedFabric?.priceModifier || 0;
  const currentPrice = product.price + fabricModifier;
  const currentOriginalPrice = product.originalPrice ? product.originalPrice + fabricModifier : undefined;

  const images = product.images.length > 0 ? product.images : [{ id: '1', url: '/images/products/malabar-teak.svg', alt: product.name, isCover: true, order: 1 }];
  const currentImage = images[activeImageIdx] || images[0];

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${product.id}-${selectedFabric?.id || 'def'}-${selectedFinish?.id || 'def'}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: currentPrice,
      quantity: quantity,
      coverImage: currentImage.url,
      selectedFabric: selectedFabric ? `${selectedFabric.type} (${selectedFabric.name})` : undefined,
      selectedColor: selectedFabric?.colorName,
      selectedFinish: selectedFinish?.name,
    });

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
  };

  const handleWhatsAppEnquire = () => {
    const url = generateProductEnquiryUrl(
      product,
      selectedFabric?.colorName,
      selectedFabric ? `${selectedFabric.type} - ${selectedFabric.name}` : undefined,
      whatsappNumber
    );
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-brand-muted mb-6">
        <Link href="/" className="hover:text-brand-primary">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collection" className="hover:text-brand-primary">Collection</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-primary font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Two-Column Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Photo Gallery (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-[4/3] rounded-cozly overflow-hidden bg-brand-surface border border-brand-border shadow-soft group">
            <Image
              src={currentImage.url}
              alt={currentImage.alt || product.name}
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Tag Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2.5 py-1 rounded bg-brand-primary/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                {product.seatingCapacity}
              </span>
              {product.stockStatus === 'in_stock' ? (
                <span className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  In Stock • Quick Dispatch
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded bg-brand-accent text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  Made to Order
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImageIdx
                      ? 'border-brand-accent shadow-md scale-95'
                      : 'border-brand-border hover:border-brand-primary/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Craftsmanship Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-border text-center">
            <div className="p-3 bg-white rounded-cozly border border-brand-border">
              <ShieldCheck className="w-5 h-5 text-brand-accent mx-auto mb-1" />
              <p className="text-xs font-bold text-brand-primary">{product.warrantyYears} Years</p>
              <p className="text-[10px] text-brand-muted">Frame Warranty</p>
            </div>
            <div className="p-3 bg-white rounded-cozly border border-brand-border">
              <Truck className="w-5 h-5 text-brand-accent mx-auto mb-1" />
              <p className="text-xs font-bold text-brand-primary">Direct Delivery</p>
              <p className="text-[10px] text-brand-muted">Kerala, TN & BLR</p>
            </div>
            <div className="p-3 bg-white rounded-cozly border border-brand-border">
              <Sparkles className="w-5 h-5 text-brand-accent mx-auto mb-1" />
              <p className="text-xs font-bold text-brand-primary">Customizable</p>
              <p className="text-[10px] text-brand-muted">Any Size / Fabric</p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Title & Origin */}
          <div className="space-y-1.5 border-b border-brand-border pb-5">
            <div className="flex items-center justify-between text-xs text-brand-accent font-bold uppercase tracking-wider">
              <span>{product.style} • {product.materialType === 'wooden' ? 'Solid Wood' : 'Upholstered'}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Atelier Direct
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-primary">
              {product.name}
            </h1>
            <p className="text-xs text-brand-muted leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-white rounded-cozly border border-brand-border shadow-soft flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-primary">
                  {formatINR(currentPrice)}
                </span>
                {currentOriginalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatINR(currentOriginalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-brand-muted mt-0.5">
                Transparent workshop pricing • Inclusive of GST
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 block">
                {product.stockStatus === 'in_stock' ? 'Ships in 5-8 Days' : product.deliveryTime}
              </span>
            </div>
          </div>

          {/* Fabric & Color Swatches */}
          {product.fabrics && product.fabrics.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-brand-primary">
                  Select Fabric & Color:
                </span>
                <span className="text-brand-accent font-semibold">
                  {selectedFabric ? `${selectedFabric.type} — ${selectedFabric.colorName}` : ''}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.fabrics.map((fab) => (
                  <button
                    key={fab.id}
                    onClick={() => setSelectedFabric(fab)}
                    className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      selectedFabric?.id === fab.id
                        ? 'border-brand-primary bg-brand-secondary/60 ring-1 ring-brand-primary'
                        : 'border-brand-border bg-white hover:border-brand-primary/40'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shrink-0 shadow-inner"
                      style={{ backgroundColor: fab.colorHex }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-brand-primary truncate">{fab.colorName}</p>
                      <p className="text-[9px] text-brand-muted truncate">{fab.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wood Finish Options */}
          {product.woodFinishes && product.woodFinishes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-brand-primary">
                  Wood Frame / Leg Finish:
                </span>
                <span className="text-brand-accent font-semibold">
                  {selectedFinish?.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.woodFinishes.map((wf) => (
                  <button
                    key={wf.id}
                    onClick={() => setSelectedFinish(wf)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                      selectedFinish?.id === wf.id
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-brand-border bg-white text-brand-charcoal hover:bg-brand-secondary'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: wf.colorHex }}
                    />
                    <span>{wf.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-brand-border rounded-cozly bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-brand-secondary text-brand-charcoal transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-brand-charcoal min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-brand-secondary text-brand-charcoal transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-brand-primary hover:bg-brand-primary-light text-white font-semibold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-brand-accent" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Enquiry Button */}
            <button
              onClick={handleWhatsAppEnquire}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Enquire & Order on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs / Accordion for Specifications */}
      <div className="mt-16 bg-white rounded-cozly border border-brand-border shadow-soft overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-brand-border overflow-x-auto bg-brand-surface/60">
          {[
            { key: 'specs', label: 'Materials & Craft' },
            { key: 'dimensions', label: 'Dimensions & Fit' },
            { key: 'delivery', label: 'Delivery & Assembly' },
            { key: 'warranty', label: 'Warranty & Care' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
                activeTab === tab.key
                  ? 'border-b-2 border-brand-accent text-brand-primary bg-white'
                  : 'text-brand-muted hover:text-brand-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 text-sm">
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <p className="text-xs text-brand-charcoal/80 leading-relaxed max-w-3xl">
                {product.fullDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-brand-border">
                <div className="p-4 bg-brand-surface rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Frame Wood</span>
                  <p className="font-semibold text-brand-primary text-xs">{product.materialsSpec.frameWood}</p>
                </div>
                <div className="p-4 bg-brand-surface rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Foam Density</span>
                  <p className="font-semibold text-brand-primary text-xs">{product.materialsSpec.foamType}</p>
                </div>
                <div className="p-4 bg-brand-surface rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Suspension System</span>
                  <p className="font-semibold text-brand-primary text-xs">{product.materialsSpec.springSystem}</p>
                </div>
                <div className="p-4 bg-brand-surface rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Legs & Polish</span>
                  <p className="font-semibold text-brand-primary text-xs">{product.materialsSpec.legMaterial}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-brand-surface rounded-lg text-center">
                  <span className="text-xs text-brand-muted block">Length (Width)</span>
                  <span className="font-serif font-bold text-xl text-brand-primary">{product.dimensions.width} cm</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">≈ {(product.dimensions.width / 2.54).toFixed(0)} inches</span>
                </div>
                <div className="p-4 bg-brand-surface rounded-lg text-center">
                  <span className="text-xs text-brand-muted block">Depth</span>
                  <span className="font-serif font-bold text-xl text-brand-primary">{product.dimensions.depth} cm</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">≈ {(product.dimensions.depth / 2.54).toFixed(0)} inches</span>
                </div>
                <div className="p-4 bg-brand-surface rounded-lg text-center">
                  <span className="text-xs text-brand-muted block">Total Height</span>
                  <span className="font-serif font-bold text-xl text-brand-primary">{product.dimensions.height} cm</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">≈ {(product.dimensions.height / 2.54).toFixed(0)} inches</span>
                </div>
                <div className="p-4 bg-brand-surface rounded-lg text-center">
                  <span className="text-xs text-brand-muted block">Seating Height</span>
                  <span className="font-serif font-bold text-xl text-brand-primary">{product.dimensions.seatingHeight || 45} cm</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">Standard Ergonomic Height</span>
                </div>
              </div>
              <p className="text-xs text-brand-muted pt-2">
                *Need custom dimensions to fit your living room wall or elevator passage? Message us on WhatsApp and our carpentry draftsmen will modify the blueprint.
              </p>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3 text-xs text-brand-charcoal/80 leading-relaxed">
              <p className="font-semibold text-brand-primary text-sm">Direct Factory Delivery Coverage:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Kerala:</strong> 5 to 10 Business Days via direct workshop transport to all districts.</li>
                <li><strong>Karnataka (Bangalore):</strong> 7 to 12 Business Days with apartment elevator carriage and living room placement.</li>
                <li><strong>Tamil Nadu:</strong> 7 to 12 Business Days with multi-tier reinforced packaging.</li>
                <li><strong>Rest of India:</strong> Available on specialized logistics request via WhatsApp.</li>
              </ul>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-3 text-xs text-brand-charcoal/80 leading-relaxed">
              <p className="font-semibold text-brand-primary text-sm">{product.warrantyYears}-Year Manufacturer Frame Warranty</p>
              <p>
                Every solid timber frame manufactured in our Erattupetta workshop is guaranteed against borer attack, termite infestation, and structural joint failure for {product.warrantyYears} full years.
              </p>
              <p>
                Foam cores are guaranteed against sagging greater than 1 inch for 3 years. Removable cushion covers can be unzipped and cleaned as per care instructions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Sofas Carousel / Grid */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-20 space-y-8">
          <div className="flex items-end justify-between border-b border-brand-border pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                Complementary Pieces
              </span>
              <h2 className="font-serif text-2xl font-bold text-brand-primary mt-1">
                You May Also Admire
              </h2>
            </div>
            <Link href="/collection" className="text-xs font-semibold uppercase text-brand-primary hover:text-brand-accent">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((rel) => (
              <ProductCard key={rel.id} product={rel} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-brand-border shadow-modal flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-brand-muted uppercase block">Total Price</span>
          <span className="font-bold text-base text-brand-primary">{formatINR(currentPrice)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-4 bg-brand-primary text-white text-xs font-semibold rounded-cozly flex items-center gap-1 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-brand-accent" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleWhatsAppEnquire}
            className="p-2.5 bg-emerald-600 text-white rounded-cozly shadow-sm"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
