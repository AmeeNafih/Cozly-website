'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  whatsappNumber?: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [];
  const coverImage = images.find((img) => img.isCover)?.url || images[0]?.url || '/images/real/cozly-photo-14.jpg';
  const secondaryImage = images.length > 1 ? (images.find((img) => !img.isCover)?.url || images[1]?.url) : null;

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);

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
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const materialLabel =
    product.materialType === 'wooden'
      ? 'Solid Wood'
      : product.materialType === 'upholstered'
      ? 'Upholstered'
      : 'Solid Wood & Upholstered';

  return (
    <div className="group flex flex-col w-full">
      {/* 4:5 Image Stage with Second Photo on Hover */}
      <Link
        href={`/collection/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-[4px] border border-neutral-200/80"
      >
        {/* Primary Cover Image */}
        <Image
          src={coverImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-all duration-500 ease-out ${
            secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-103'
          }`}
        />

        {/* Secondary Hover Image (if present) */}
        {secondaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} angle`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500 ease-out"
          />
        )}

        {/* Small "Add to cart" on Hover (Desktop) / Compact on Mobile */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-black hover:bg-neutral-800 text-white text-[11px] font-medium tracking-[0.14em] uppercase rounded-[4px] shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Add to cart</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1 justify-between space-y-1.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/collection/${product.slug}`}
              className="text-sm sm:text-base font-normal text-black hover:underline underline-offset-4"
            >
              {product.name}
            </Link>

            {/* Mobile Compact Add Icon */}
            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
              className="sm:hidden p-1.5 text-neutral-700 hover:text-black border border-neutral-200 rounded-[3px]"
            >
              {isAdded ? <Check className="w-3.5 h-3.5 text-black" /> : <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />}
            </button>
          </div>

          {/* Small grey line with type and material */}
          <p className="text-xs text-neutral-500 font-normal">
            {product.seatingCapacity} • {materialLabel}
          </p>
        </div>

        {/* Price Presentation: Offer price in black, original struck through */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm sm:text-base font-semibold text-black tracking-tight">
            {formatINR(product.price)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs text-neutral-400 line-through">
                {formatINR(product.originalPrice!)}
              </span>
              <span className="text-[11px] text-neutral-500 font-normal">
                save {formatINR(product.originalPrice! - product.price)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
