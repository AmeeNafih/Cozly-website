'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { formatINR, generateProductEnquiryUrl } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  whatsappNumber?: string;
}

export default function ProductCard({ product, whatsappNumber = '+919846581241' }: ProductCardProps) {
  const { addToCart } = useCart();

  const coverImage = product.images.find((img) => img.isCover)?.url || product.images[0]?.url || '/images/products/malabar-teak.svg';
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: `cart-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      coverImage: coverImage,
      selectedFabric: product.fabrics[0]?.name,
      selectedColor: product.fabrics[0]?.colorName,
      selectedFinish: product.woodFinishes[0]?.name,
    });
  };

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = generateProductEnquiryUrl(product, undefined, undefined, whatsappNumber);
    window.open(url, '_blank');
  };

  return (
    <div className="group rounded-cozly bg-white border border-brand-border shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Stage */}
      <Link href={`/collection/${product.slug}`} className="relative block aspect-[4/3] bg-brand-grey-50 overflow-hidden">
        <Image
          src={coverImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent && (
            <span className="px-2 py-0.5 rounded bg-brand-kraft text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {discountPercent}% Off
            </span>
          )}
          {product.stockStatus === 'in_stock' ? (
            <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Ready to Ship
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-wider">
              Made to Order
            </span>
          )}
        </div>

        {/* Quick Actions Hover Drawer on Desktop */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold rounded-cozly backdrop-blur-md transition-colors flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white stroke-[1.5]" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleWhatsAppEnquiry}
            className="p-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-cozly backdrop-blur-md transition-colors shadow-md"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widestSection text-brand-charcoal-500 font-bold">
            <span>
              {product.seatingCapacity} • {product.materialType === 'wooden' ? 'Solid Wood' : product.materialType === 'upholstered' ? 'Upholstered' : 'Wood & Fabric'}
            </span>
            <span>{product.warrantyYears} Yr Warranty</span>
          </div>

          <Link href={`/collection/${product.slug}`} className="block">
            <h3 className="font-heading font-bold text-sm text-black group-hover:text-brand-charcoal-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-brand-charcoal-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Swatches and Price Row */}
        <div className="pt-2 border-t border-brand-border flex items-center justify-between">
          {/* Swatch color dots */}
          <div className="flex items-center space-x-1">
            {product.fabrics.slice(0, 4).map((fab) => (
              <span
                key={fab.id}
                title={`${fab.name} - ${fab.colorName}`}
                className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner"
                style={{ backgroundColor: fab.colorHex }}
              />
            ))}
            {product.fabrics.length > 4 && (
              <span className="text-[10px] text-brand-charcoal-400 font-medium ml-1">
                +{product.fabrics.length - 4}
              </span>
            )}
          </div>

          {/* Price in Poppins Bold */}
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="font-heading font-extrabold text-base text-black tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">Direct Factory</p>
          </div>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="sm:hidden grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleQuickAdd}
            className="py-2 px-3 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center justify-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Add</span>
          </button>
          <button
            onClick={handleWhatsAppEnquiry}
            className="py-2 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold uppercase tracking-wider rounded-cozly flex items-center justify-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
