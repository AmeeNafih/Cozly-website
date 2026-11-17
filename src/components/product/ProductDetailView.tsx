'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  MessageCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
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
  const [isAdded, setIsAdded] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    dimensions: false,
    care: false,
    delivery: false,
    warranty: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fabricModifier = selectedFabric?.priceModifier || 0;
  const currentPrice = product.price + fabricModifier;
  const currentOriginalPrice = product.originalPrice ? product.originalPrice + fabricModifier : undefined;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ id: '1', url: '/images/real/cozly-photo-14.jpg', alt: product.name, isCover: true, order: 1 }];

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

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const url = generateProductEnquiryUrl(
      product,
      selectedFabric?.colorName,
      selectedFabric ? `${selectedFabric.type} - ${selectedFabric.name}` : undefined,
      whatsappNumber
    );
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Breadcrumb */}
        <nav className="text-xs text-neutral-500 mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-black transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        {/* Main Two-Column Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnails on Desktop / Horizontal on Mobile */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0 sm:max-h-[640px]">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-[4px] overflow-hidden border transition-all ${
                      idx === activeImageIdx
                        ? 'border-black opacity-100'
                        : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage (4:5 Ratio) */}
            <div className="relative aspect-[4/5] flex-1 rounded-[4px] overflow-hidden bg-neutral-100 border border-neutral-200/80 group">
              <Image
                src={currentImage.url}
                alt={currentImage.alt || product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Right Column: Sticky Product Details & Configuration (5 cols on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="border-b border-neutral-200 pb-6 space-y-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 block">
                {product.seatingCapacity} • {product.materialType === 'wooden' ? 'Solid Wood' : 'Upholstered'}
              </span>

              <h1 className="text-2xl sm:text-3xl font-normal text-black tracking-[-0.015em]">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-semibold text-black tracking-tight">
                  {formatINR(currentPrice)}
                </span>
                {currentOriginalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatINR(currentOriginalPrice)}
                  </span>
                )}
                {product.stockStatus === 'made_to_order' ? (
                  <span className="text-xs text-neutral-500 font-normal ml-auto">
                    Made to order
                  </span>
                ) : (
                  <span className="text-xs text-neutral-500 font-normal ml-auto">
                    In stock
                  </span>
                )}
              </div>

              {/* Short Factual Description (1-2 sentences) */}
              <p className="text-sm text-neutral-600 leading-relaxed pt-2">
                {product.shortDescription}
              </p>
            </div>

            {/* Fabric & Colour Swatches */}
            {product.fabrics && product.fabrics.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 uppercase tracking-wider">Fabric & Colour</span>
                  <span className="text-black font-medium">
                    {selectedFabric ? `${selectedFabric.type} • ${selectedFabric.colorName}` : ''}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.fabrics.map((fab) => (
                    <button
                      key={fab.id}
                      onClick={() => setSelectedFabric(fab)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-[4px] border text-xs transition-colors ${
                        selectedFabric?.id === fab.id
                          ? 'border-black bg-neutral-50 font-medium text-black'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: fab.colorHex }}
                      />
                      <span>{fab.colorName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wood Finish Options (Pill Buttons) */}
            {product.woodFinishes && product.woodFinishes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 uppercase tracking-wider">Frame Wood Finish</span>
                  <span className="text-black font-medium">{selectedFinish?.name}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.woodFinishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3.5 py-2 rounded-[4px] border text-xs transition-colors ${
                        selectedFinish?.id === finish.id
                          ? 'border-black bg-black text-white font-medium'
                          : 'border-neutral-200 text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {finish.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Primary Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-200 rounded-[4px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-neutral-600 hover:text-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-black min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-neutral-600 hover:text-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart (Black) */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-black hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                      <span>Add to cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Order on WhatsApp (Outline with WhatsApp green icon) */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-6 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-900 text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Quiet Delivery Note */}
            <p className="text-xs text-neutral-500 pt-2 border-t border-neutral-200">
              Direct factory delivery to any pin code across India.
            </p>
          </div>
        </div>

        {/* Clean Accordions Below (Details, Dimensions, Materials and care, Delivery, Warranty) */}
        <div className="mt-20 pt-12 border-t border-neutral-200 max-w-4xl space-y-4">
          {/* 1. Details */}
          <div className="border-b border-neutral-200 pb-4">
            <button
              onClick={() => toggleAccordion('details')}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-sm text-black"
            >
              <span>Product Details</span>
              {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordions.details && (
              <div className="pt-2 pb-4 text-xs sm:text-sm text-neutral-600 space-y-2 leading-relaxed">
                <p>{product.fullDescription || product.shortDescription}</p>
                <p>Designed and built at our workshop in Erattupetta, Kottayam, Kerala.</p>
              </div>
            )}
          </div>

          {/* 2. Dimensions */}
          <div className="border-b border-neutral-200 pb-4">
            <button
              onClick={() => toggleAccordion('dimensions')}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-sm text-black"
            >
              <span>Dimensions</span>
              {openAccordions.dimensions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordions.dimensions && (
              <div className="pt-2 pb-4 text-xs sm:text-sm text-neutral-600 space-y-1.5">
                <p>Width: {product.dimensions.width} {product.dimensions.unit}</p>
                <p>Depth: {product.dimensions.depth} {product.dimensions.unit}</p>
                <p>Height: {product.dimensions.height} {product.dimensions.unit}</p>
                {product.dimensions.seatingHeight && (
                  <p>Seating Height: {product.dimensions.seatingHeight} {product.dimensions.unit}</p>
                )}
              </div>
            )}
          </div>

          {/* 3. Materials and Care */}
          <div className="border-b border-neutral-200 pb-4">
            <button
              onClick={() => toggleAccordion('care')}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-sm text-black"
            >
              <span>Materials & Care</span>
              {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordions.care && (
              <div className="pt-2 pb-4 text-xs sm:text-sm text-neutral-600 space-y-2 leading-relaxed">
                <p>Frame: {product.materialsSpec?.frameWood || 'Solid Kiln-Dried Timber'}</p>
                <p>Cushioning: {product.materialsSpec?.foamType || 'High Resilience 40D Foam'}</p>
                <p>Springs: {product.materialsSpec?.springSystem || 'Heavy-gauge S-spring suspension'}</p>
                <p>Care: Vacuum upholstery regularly with a soft brush attachment. Blot spills immediately with a dry cloth. For exposed wood parts, wipe clean with a soft dry cloth.</p>
              </div>
            )}
          </div>

          {/* 4. Delivery */}
          <div className="border-b border-neutral-200 pb-4">
            <button
              onClick={() => toggleAccordion('delivery')}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-sm text-black"
            >
              <span>Delivery & Handover</span>
              {openAccordions.delivery ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordions.delivery && (
              <div className="pt-2 pb-4 text-xs sm:text-sm text-neutral-600 space-y-2 leading-relaxed">
                <p>All-India Delivery: Dispatched direct from our Erattupetta workshop within 7 to 14 days nationwide.</p>
                <p>Every piece is protected with multi-layer high-density foam, corner guards, and reinforced wooden crating.</p>
              </div>
            )}
          </div>

          {/* 5. Warranty */}
          <div className="border-b border-neutral-200 pb-4">
            <button
              onClick={() => toggleAccordion('warranty')}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-sm text-black"
            >
              <span>Warranty</span>
              {openAccordions.warranty ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordions.warranty && (
              <div className="pt-2 pb-4 text-xs sm:text-sm text-neutral-600 space-y-2 leading-relaxed">
                <p>{product.warrantyYears} years structural frame warranty covering timber joinery and internal construction.</p>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-neutral-200">
            <div className="mb-10">
              <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
                Related Designs
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-black tracking-[-0.015em]">
                You may also like
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
