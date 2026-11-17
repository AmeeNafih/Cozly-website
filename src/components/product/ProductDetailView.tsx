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
import BrandValueStrip from '@/components/common/BrandValueStrip';

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
              <span className="px-2.5 py-1 rounded bg-black/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                {product.seatingCapacity}
              </span>
              {product.stockStatus === 'in_stock' ? (
                <span className="px-2.5 py-1 rounded bg-black text-white text-[11px] font-bold uppercase tracking-wider shadow-sm border border-white/20">
                  In Stock • Dispatch in 5-8 Days
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded bg-brand-kraft text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
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
                      ? 'border-black shadow-md scale-95'
                      : 'border-brand-border hover:border-black/40 opacity-70 hover:opacity-100'
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
              <ShieldCheck className="w-5 h-5 text-black mx-auto mb-1 stroke-[1.5]" />
              <p className="text-xs font-bold text-black">{product.warrantyYears} Years</p>
              <p className="text-[10px] text-brand-charcoal-500">Frame Warranty</p>
            </div>
            <div className="p-3 bg-white rounded-cozly border border-brand-border">
              <Truck className="w-5 h-5 text-black mx-auto mb-1 stroke-[1.5]" />
              <p className="text-xs font-bold text-black">Direct Delivery</p>
              <p className="text-[10px] text-brand-charcoal-500">Kerala, TN & BLR</p>
            </div>
            <div className="p-3 bg-white rounded-cozly border border-brand-border">
              <Sparkles className="w-5 h-5 text-black mx-auto mb-1 stroke-[1.5]" />
              <p className="text-xs font-bold text-black">Customizable</p>
              <p className="text-[10px] text-brand-charcoal-500">Any Size / Fabric</p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Title & Origin */}
          <div className="space-y-1.5 border-b border-brand-border pb-5">
            <div className="flex items-center justify-between text-xs tracking-widest uppercase font-semibold text-brand-charcoal-600">
              <span>{product.style} • {product.materialType === 'wooden' ? 'Solid Wood' : 'Upholstered'}</span>
              <span className="text-black bg-brand-grey-100 px-2.5 py-0.5 rounded-full border border-brand-border font-medium text-[10px]">
                Workshop Direct
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs text-brand-charcoal-600 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-white rounded-cozly border border-brand-border shadow-soft flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  {formatINR(currentPrice)}
                </span>
                {currentOriginalPrice && (
                  <span className="text-sm text-brand-charcoal-400 line-through">
                    {formatINR(currentOriginalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-brand-charcoal-500 mt-0.5">
                Transparent workshop pricing • Inclusive of GST
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal-800 bg-brand-grey-100 px-2.5 py-1 rounded-full border border-brand-border block">
                {product.stockStatus === 'in_stock' ? 'Ships in 5-8 Days' : product.deliveryTime}
              </span>
            </div>
          </div>

          {/* Fabric & Color Swatches */}
          {product.fabrics && product.fabrics.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-black">
                  Select Fabric & Color:
                </span>
                <span className="text-brand-kraft font-semibold">
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
                        ? 'border-black bg-brand-grey-50 ring-1 ring-black'
                        : 'border-brand-border bg-white hover:border-black/40'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shrink-0 shadow-inner"
                      style={{ backgroundColor: fab.colorHex }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-black truncate">{fab.colorName}</p>
                      <p className="text-[9px] text-brand-charcoal-500 truncate">{fab.type}</p>
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
                <span className="font-bold uppercase tracking-wider text-black">
                  Wood Frame / Leg Finish:
                </span>
                <span className="text-brand-kraft font-semibold">
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
                        ? 'border-black bg-black text-white'
                        : 'border-brand-border bg-white text-black hover:bg-brand-grey-100'
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
                  className="p-3 hover:bg-brand-grey-100 text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-black min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-brand-grey-100 text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-black hover:bg-brand-charcoal-800 text-white font-bold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-brand-kraft" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Enquiry Button */}
            <button
              onClick={handleWhatsAppEnquire}
              className="w-full py-3.5 px-4 bg-brand-whatsapp hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
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
                  ? 'border-b-2 border-black text-black bg-white'
                  : 'text-brand-charcoal-500 hover:text-black'
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
              <p className="text-xs text-brand-charcoal-700 leading-relaxed max-w-3xl">
                {product.fullDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-brand-border">
                <div className="p-4 bg-brand-grey-50 rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-600">Frame Wood</span>
                  <p className="font-semibold text-black text-xs">{product.materialsSpec.frameWood}</p>
                </div>
                <div className="p-4 bg-brand-grey-50 rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-600">Foam Density</span>
                  <p className="font-semibold text-black text-xs">{product.materialsSpec.foamType}</p>
                </div>
                <div className="p-4 bg-brand-grey-50 rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-600">Suspension System</span>
                  <p className="font-semibold text-black text-xs">{product.materialsSpec.springSystem}</p>
                </div>
                <div className="p-4 bg-brand-grey-50 rounded-lg space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-600">Legs & Polish</span>
                  <p className="font-semibold text-black text-xs">{product.materialsSpec.legMaterial}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-brand-grey-50 rounded-lg text-center">
                  <span className="text-xs text-brand-charcoal-500 block">Length (Width)</span>
                  <span className="font-bold text-xl text-black">{product.dimensions.width} cm</span>
                  <span className="text-[10px] text-brand-charcoal-500 block mt-0.5">≈ {(product.dimensions.width / 2.54).toFixed(0)} inches</span>
                </div>
                <div className="p-4 bg-brand-grey-50 rounded-lg text-center">
                  <span className="text-xs text-brand-charcoal-500 block">Depth</span>
                  <span className="font-bold text-xl text-black">{product.dimensions.depth} cm</span>
                  <span className="text-[10px] text-brand-charcoal-500 block mt-0.5">≈ {(product.dimensions.depth / 2.54).toFixed(0)} inches</span>
                </div>
                <div className="p-4 bg-brand-grey-50 rounded-lg text-center">
                  <span className="text-xs text-brand-charcoal-500 block">Total Height</span>
                  <span className="font-bold text-xl text-black">{product.dimensions.height} cm</span>
                  <span className="text-[10px] text-brand-charcoal-500 block mt-0.5">≈ {(product.dimensions.height / 2.54).toFixed(0)} inches</span>
                </div>
                <div className="p-4 bg-brand-grey-50 rounded-lg text-center">
                  <span className="text-xs text-brand-charcoal-500 block">Seating Height</span>
                  <span className="font-bold text-xl text-black">{product.dimensions.seatingHeight || 45} cm</span>
                  <span className="text-[10px] text-brand-charcoal-500 block mt-0.5">Standard Ergonomic Height</span>
                </div>
              </div>
              <p className="text-xs text-brand-charcoal-500 pt-2">
                *Need custom dimensions to fit your living room wall or elevator passage? Message us on WhatsApp and our carpentry draftsmen will modify the blueprint.
              </p>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3 text-xs text-brand-charcoal-700 leading-relaxed">
              <p className="font-semibold text-black text-sm">Direct Factory Delivery Coverage:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Kerala:</strong> 5 to 10 Business Days via direct workshop transport to all districts.</li>
                <li><strong>Karnataka (Bangalore):</strong> 7 to 12 Business Days with apartment elevator carriage and living room placement.</li>
                <li><strong>Tamil Nadu:</strong> 7 to 12 Business Days with multi-tier reinforced packaging.</li>
                <li><strong>Rest of India:</strong> Available on specialized logistics request via WhatsApp.</li>
              </ul>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-3 text-xs text-brand-charcoal-700 leading-relaxed">
              <p className="font-semibold text-black text-sm">{product.warrantyYears}-Year Manufacturer Frame Warranty</p>
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

      {/* Brand Value Strip */}
      <div className="mt-16">
        <BrandValueStrip />
      </div>

      {/* Related Sofas Carousel / Grid */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-20 space-y-8">
          <div className="flex items-end justify-between border-b border-brand-border pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
                Complementary Pieces
              </span>
              <h2 className="text-2xl font-bold text-black mt-1">
                You May Also Admire
              </h2>
            </div>
            <Link href="/collection" className="text-xs font-semibold uppercase tracking-wider text-black hover:text-brand-charcoal-700">
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

      {/* Sticky Mobile Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3.5 py-2.5 bg-white/95 backdrop-blur-md border-t border-brand-border shadow-[0_-4px_25px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3 pb-safe">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-brand-surface border border-brand-border shrink-0 relative">
            <Image
              src={currentImage.url}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <span className="font-heading font-extrabold text-sm text-black block truncate font-['Poppins']">
              {formatINR(currentPrice)}
            </span>
            <span className="text-[10px] text-brand-charcoal-500 block truncate">
              {selectedFabric ? selectedFabric.colorName : product.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-3.5 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center gap-1.5 shadow-sm transition-all"
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-brand-kraft" />
                <span>Add</span>
              </>
            )}
          </button>
          <button
            onClick={handleWhatsAppEnquire}
            className="p-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-cozly shadow-sm transition-all"
            aria-label="Enquire on WhatsApp"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
          </button>
        </div>
      </div>
    </div>
  );
}
