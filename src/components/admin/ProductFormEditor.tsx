'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  UploadCloud,
  Trash2,
  CheckCircle,
  Plus,
  Star,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { Product, ProductImage, FabricOption, WoodFinishOption } from '@/types';
import { slugify, formatINR } from '@/lib/formatters';

interface ProductFormEditorProps {
  initialProduct?: Product;
  isNew?: boolean;
}

export default function ProductFormEditor({ initialProduct, isNew = false }: ProductFormEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState(initialProduct?.name || '');
  const [slug, setSlug] = useState(initialProduct?.slug || '');
  const [category, setCategory] = useState(initialProduct?.category || 'wooden-sofas');
  const [materialType, setMaterialType] = useState<Product['materialType']>(initialProduct?.materialType || 'wooden');
  const [seatingCapacity, setSeatingCapacity] = useState<Product['seatingCapacity']>(initialProduct?.seatingCapacity || '3-Seater');
  const [style, setStyle] = useState(initialProduct?.style || 'Modern');
  const [price, setPrice] = useState<number | string>(initialProduct?.price || 35000);
  const [originalPrice, setOriginalPrice] = useState<number | string>(initialProduct?.originalPrice || '');
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialProduct?.fullDescription || '');

  // Dimensions
  const [width, setWidth] = useState(initialProduct?.dimensions?.width || 210);
  const [depth, setDepth] = useState(initialProduct?.dimensions?.depth || 85);
  const [height, setHeight] = useState(initialProduct?.dimensions?.height || 82);
  const [seatingHeight, setSeatingHeight] = useState(initialProduct?.dimensions?.seatingHeight || 45);

  // Materials Spec
  const [frameWood, setFrameWood] = useState(initialProduct?.materialsSpec?.frameWood || '100% Solid Kiln-Dried Kerala Teak');
  const [foamType, setFoamType] = useState(initialProduct?.materialsSpec?.foamType || 'High Resilience 40D Foam Core');
  const [springSystem, setSpringSystem] = useState(initialProduct?.materialsSpec?.springSystem || 'Heavy-gauge S-Spring with anti-sag webbing');
  const [legMaterial, setLegMaterial] = useState(initialProduct?.materialsSpec?.legMaterial || 'Solid Teak tapered legs');

  // Warranty & Delivery
  const [warrantyYears, setWarrantyYears] = useState(initialProduct?.warrantyYears || 10);
  const [deliveryTime, setDeliveryTime] = useState(initialProduct?.deliveryTime || '7-12 Business Days');
  const [stockStatus, setStockStatus] = useState<Product['stockStatus']>(initialProduct?.stockStatus || 'made_to_order');
  const [isFeatured, setIsFeatured] = useState(initialProduct?.isFeatured || false);
  const [isPublished, setIsPublished] = useState(initialProduct?.isPublished ?? true);

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialProduct?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialProduct?.seoDescription || '');

  // Images list
  const [images, setImages] = useState<ProductImage[]>(
    initialProduct?.images || [
      { id: 'img-1', url: '/images/products/malabar-teak.svg', alt: 'Front Angle', isCover: true, order: 1 },
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  // Fabrics
  const [fabrics, setFabrics] = useState<FabricOption[]>(
    initialProduct?.fabrics || [
      { id: 'fab-1', name: 'Belgian Linen', type: 'Linen', colorName: 'Warm Sand', colorHex: '#D8CCA3', priceModifier: 0 },
      { id: 'fab-2', name: 'Royal Velvet', type: 'Velvet', colorName: 'Midnight Slate', colorHex: '#18222D', priceModifier: 2000 },
    ]
  );

  // Wood Finishes
  const [woodFinishes, setWoodFinishes] = useState<WoodFinishOption[]>(
    initialProduct?.woodFinishes || [
      { id: 'wf-1', name: 'Natural Matte Teak', colorHex: '#9E6738' },
      { id: 'wf-2', name: 'Walnut Stain', colorHex: '#4A2E1B' },
    ]
  );

  // Auto-generate slug when name changes if new or not customized
  const handleNameChange = (val: string) => {
    setName(val);
    if (isNew || !initialProduct?.slug) {
      setSlug(slugify(val));
    }
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    const newImg: ProductImage = {
      id: `img-${Date.now()}`,
      url: newImageUrl.trim(),
      alt: name || 'Product Photo',
      isCover: images.length === 0,
      order: images.length + 1,
    };
    setImages([...images, newImg]);
    setNewImageUrl('');
  };

  const handleSetCover = (id: string) => {
    setImages(images.map((img) => ({ ...img, isCover: img.id === id })));
  };

  const handleDeleteImage = (id: string) => {
    const remaining = images.filter((img) => img.id !== id);
    if (remaining.length > 0 && !remaining.some((i) => i.isCover)) {
      remaining[0].isCover = true;
    }
    setImages(remaining);
  };

  const handleAddFabric = () => {
    const newFab: FabricOption = {
      id: `fab-${Date.now()}`,
      name: 'Custom Fabric',
      type: 'Textured Weave',
      colorName: 'New Color',
      colorHex: '#C5A059',
      priceModifier: 0,
    };
    setFabrics([...fabrics, newFab]);
  };

  const handleDeleteFabric = (id: string) => {
    setFabrics(fabrics.filter((f) => f.id !== id));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      name,
      slug: slug || slugify(name),
      category,
      materialType,
      seatingCapacity,
      style,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      shortDescription,
      fullDescription,
      dimensions: {
        width: Number(width),
        depth: Number(depth),
        height: Number(height),
        seatingHeight: Number(seatingHeight),
        unit: 'cm',
      },
      materialsSpec: {
        frameWood,
        foamType,
        springSystem,
        legMaterial,
      },
      warrantyYears: Number(warrantyYears),
      deliveryTime,
      stockStatus,
      isFeatured,
      isPublished,
      seoTitle,
      seoDescription,
      images,
      fabrics,
      woodFinishes,
    };

    try {
      const url = isNew ? '/api/admin/products' : `/api/admin/products/${initialProduct?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save product');
      }

      setSuccess('Product saved successfully!');
      if (isNew) {
        setTimeout(() => router.push('/admin/products'), 1000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg bg-white border border-brand-border text-black hover:bg-brand-grey-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
          </Link>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
              {isNew ? 'Create New Design' : 'Editing Product'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              {name || 'Untitled Sofa Model'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && initialProduct?.slug && (
            <Link
              href={`/collection/${initialProduct.slug}`}
              target="_blank"
              className="px-4 py-2.5 rounded-cozly border border-brand-border bg-white text-xs font-bold text-black hover:bg-brand-grey-100 flex items-center gap-1.5 transition-colors"
            >
              <span>Live Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center gap-2 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4 text-brand-kraft" />
            <span>{loading ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-cozly bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-cozly bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Main Grid: Core Details & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Fields (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Basic Information */}
          <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
            <h3 className="font-bold text-base text-black pb-2 border-b border-brand-border">
              Basic Product Information
            </h3>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black block mb-1">
                Model Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Malabar Solid Teak 3-Seater"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                URL Slug (Auto-generated) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none font-mono text-brand-muted"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none font-medium"
                >
                  <option value="wooden-sofas">Solid Wood Frame Sofas</option>
                  <option value="premium-upholstered">Premium Upholstered</option>
                  <option value="l-shape-sectionals">L-Shape & Sectionals</option>
                  <option value="sofa-cum-beds">Sofa-Cum-Beds</option>
                  <option value="recliners-loungers">Recliners & Chaises</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Material Classification *
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none font-medium"
                >
                  <option value="wooden">Solid Wood Frame</option>
                  <option value="upholstered">Fully Upholstered</option>
                  <option value="both">Wood & Upholstery Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Seating Capacity *
                </label>
                <select
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none font-medium"
                >
                  <option value="1-Seater">1-Seater</option>
                  <option value="2-Seater">2-Seater</option>
                  <option value="3-Seater">3-Seater</option>
                  <option value="L-Shape">L-Shape</option>
                  <option value="Sectional">Sectional</option>
                  <option value="Sofa-Cum-Bed">Sofa-Cum-Bed</option>
                  <option value="Recliner">Recliner</option>
                  <option value="Chaise">Chaise</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  Aesthetic Style
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scandinavian, Chesterfield, Modern Heritage"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Short Description (Listing Cards) *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Brief summary of wood, foam, and key highlight..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Full Description (Detail Page) *
              </label>
              <textarea
                rows={5}
                required
                placeholder="In-depth craftsmanship details, joinery, comfort story, and timber origin..."
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
              />
            </div>
          </div>

          {/* 2. Photo Gallery & WebP Management */}
          <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-primary pb-2 border-b border-brand-border flex items-center justify-between">
              <span>Photo Gallery</span>
              <span className="text-[10px] text-brand-muted font-sans">Set cover image & order</span>
            </h3>

            {/* Existing images list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 bg-brand-surface group ${
                    img.isCover ? 'border-brand-accent' : 'border-brand-border'
                  }`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" />

                  {img.isCover && (
                    <span className="absolute top-2 left-2 bg-brand-accent text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
                      Cover
                    </span>
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {!img.isCover && (
                      <button
                        type="button"
                        onClick={() => handleSetCover(img.id)}
                        className="p-1.5 bg-white text-brand-primary rounded hover:bg-brand-accent hover:text-white transition-colors"
                        title="Set as Cover"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.id)}
                      className="p-1.5 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Image by URL or placeholder */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Paste image URL or /images/products/photo.svg ..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white rounded-cozly text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Add Image
              </button>
            </div>
          </div>

          {/* 3. Dimensions & Materials Specifications */}
          <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-primary pb-2 border-b border-brand-border">
              Dimensions & Craftsmanship Specs
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Width (cm)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Depth (cm)</label>
                <input
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Seat Height (cm)</label>
                <input
                  type="number"
                  value={seatingHeight}
                  onChange={(e) => setSeatingHeight(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">Frame Timber Spec</label>
                <input
                  type="text"
                  value={frameWood}
                  onChange={(e) => setFrameWood(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-brand-surface border border-brand-border rounded-cozly"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">Foam Specification</label>
                <input
                  type="text"
                  value={foamType}
                  onChange={(e) => setFoamType(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-brand-surface border border-brand-border rounded-cozly"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">Spring Suspension</label>
                <input
                  type="text"
                  value={springSystem}
                  onChange={(e) => setSpringSystem(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-brand-surface border border-brand-border rounded-cozly"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">Leg Material & Polish</label>
                <input
                  type="text"
                  value={legMaterial}
                  onChange={(e) => setLegMaterial(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-brand-surface border border-brand-border rounded-cozly"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Pricing, Stock & Settings (1 col) */}
        <div className="space-y-6">
          {/* Pricing Box */}
          <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-primary pb-2 border-b border-brand-border">
              Pricing (₹ INR)
            </h3>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full text-sm font-bold px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Original Price (Strike-through)
              </label>
              <input
                type="number"
                placeholder="e.g. 48000"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
              />
              <span className="text-[10px] text-brand-muted mt-1 block">
                Leave empty if there is no discount offer.
              </span>
            </div>
          </div>

          {/* Visibility & Stock Box */}
          <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-primary pb-2 border-b border-brand-border">
              Inventory & Status
            </h3>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Stock Status
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly font-medium"
              >
                <option value="in_stock">In Stock (Ready to Ship)</option>
                <option value="made_to_order">Made to Order (Workshop Queue)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Delivery Timeline Text
              </label>
              <input
                type="text"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full text-xs px-3.5 py-2 bg-brand-surface border border-brand-border rounded-cozly"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Frame Warranty (Years)
              </label>
              <input
                type="number"
                value={warrantyYears}
                onChange={(e) => setWarrantyYears(Number(e.target.value))}
                className="w-full text-xs px-3.5 py-2 bg-brand-surface border border-brand-border rounded-cozly font-bold"
              />
            </div>

            <div className="pt-2 border-t border-brand-border space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-brand-primary w-4 h-4"
                />
                <span className="text-xs font-bold text-brand-primary">Published on Public Website</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-brand-accent w-4 h-4"
                />
                <span className="text-xs font-bold text-brand-primary">Featured on Homepage</span>
              </label>
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-brand-primary pb-2 border-b border-brand-border">
              SEO Title & Meta
            </h3>

            <div>
              <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Meta Title</label>
              <input
                type="text"
                placeholder="Product Name | COZLY Kerala"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Meta Description</label>
              <textarea
                rows={2}
                placeholder="Keywords for Kerala, Bangalore, teak..."
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
