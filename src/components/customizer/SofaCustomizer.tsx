'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  SlidersHorizontal,
  Check,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR, cleanWhatsAppNumber } from '@/lib/formatters';

interface CustomizerProps {
  whatsappNumber?: string;
}

export default function SofaCustomizer({ whatsappNumber = '+919846581241' }: CustomizerProps) {
  const { addToCart } = useCart();

  // Current Step (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);

  // Configuration Choices
  const [selectedType, setSelectedType] = useState({
    id: 'type-3seater',
    name: '3-Seater Classic Living',
    basePrice: 38000,
    image: '/images/products/malabar-teak.svg',
  });

  const [selectedSize, setSelectedSize] = useState({
    id: 'size-std',
    name: 'Standard Dimensions (210cm)',
    modifier: 0,
    desc: 'Ideal for most living rooms and apartments',
  });

  const [selectedWood, setSelectedWood] = useState({
    id: 'wood-teak',
    name: '100% Solid Kiln-Dried Kerala Teak',
    modifier: 4500,
    desc: 'Heirloom grade, moisture <10%, 10-year structural warranty',
  });

  const [selectedFabric, setSelectedFabric] = useState({
    id: 'fab-linen',
    name: 'Premium Belgian Textured Linen',
    type: 'Linen',
    modifier: 0,
  });

  const [selectedColor, setSelectedColor] = useState({
    name: 'Warm Sand Oat',
    hex: '#E5DAC6',
  });

  const [selectedFirmness, setSelectedFirmness] = useState({
    id: 'firm-medium',
    name: 'Medium-Balanced (40D High Resilience)',
    modifier: 0,
    desc: 'Optimal support for everyday family seating and posture balance',
  });

  const [selectedLegs, setSelectedLegs] = useState({
    id: 'legs-teak',
    name: 'Tapered Solid Teak Nordic 6"',
    modifier: 0,
  });

  // Calculate live total price
  const totalPrice =
    selectedType.basePrice +
    selectedSize.modifier +
    selectedWood.modifier +
    selectedFabric.modifier +
    selectedFirmness.modifier +
    selectedLegs.modifier;

  // Options Data
  const types = [
    { id: 'type-2seater', name: '2-Seater Studio Lounge', basePrice: 28000, image: '/images/products/highrange-2seater.svg' },
    { id: 'type-3seater', name: '3-Seater Classic Living', basePrice: 38000, image: '/images/products/malabar-teak.svg' },
    { id: 'type-lshape', name: 'L-Shape Modular Sectional', basePrice: 54000, image: '/images/products/vembanad-lshape.svg' },
    { id: 'type-sofabed', name: 'Hydraulic Sofa-Cum-Bed', basePrice: 44000, image: '/images/products/sahyadri-sofabed.svg' },
    { id: 'type-recliner', name: 'Push-Back Recliner Lounger', basePrice: 30000, image: '/images/products/munnar-recliner.svg' },
    { id: 'type-chaise', name: 'Organic Curved Chaise', basePrice: 36000, image: '/images/products/periyar-chaise.svg' },
  ];

  const sizes = [
    { id: 'size-std', name: 'Standard Ergonomic (210cm)', modifier: 0, desc: 'Optimized standard dimensions for standard living rooms' },
    { id: 'size-deep', name: 'Deep-Lounge Extra (+15cm Depth)', modifier: 3500, desc: 'Ultra-deep seating for curling up with cushions' },
    { id: 'size-grand', name: 'Grand Living (+30cm Length)', modifier: 6000, desc: 'Spacious configuration for open-concept floor plans' },
  ];

  const woods = [
    { id: 'wood-teak', name: '100% Solid Kiln-Dried Kerala Teak', modifier: 4500, desc: 'Ethically sourced Kerala Teakwood with lifetime structural integrity' },
    { id: 'wood-rosewood', name: 'Solid Teak in Rosewood Stain', modifier: 3500, desc: 'Deep rich reddish-brown luster with high-gloss satin finish' },
    { id: 'wood-concealed', name: 'Seasoned Hardwood (Concealed)', modifier: 0, desc: 'Reinforced internal hardwood frame fully encased in plush upholstery' },
  ];

  const fabrics = [
    { id: 'fab-linen', name: 'Belgian Textured Linen', type: 'Linen', modifier: 0 },
    { id: 'fab-velvet', name: 'Royal Italian Velvet (Stain-Guarded)', type: 'Velvet', modifier: 2500 },
    { id: 'fab-boucle', name: 'Architectural Bouclé (Scandinavian)', type: 'Bouclé', modifier: 3000 },
    { id: 'fab-performance', name: 'Pet-Friendly Microfiber Weave', type: 'Performance', modifier: 2000 },
    { id: 'fab-leatherette', name: 'Full-Grain Vintage Leatherette', type: 'Leatherette', modifier: 3500 },
  ];

  const colors = [
    { name: 'Warm Sand Oat', hex: '#E5DAC6' },
    { name: 'Midnight Slate', hex: '#18222D' },
    { name: 'Kerala Ochre', hex: '#D9822B' },
    { name: 'Forest Olive', hex: '#3B4E38' },
    { name: 'Dusty Terracotta', hex: '#B85B3D' },
    { name: 'Royal Emerald', hex: '#1B4D3E' },
    { name: 'Cloud Pearl Grey', hex: '#DCD9D4' },
    { name: 'Charcoal Heather', hex: '#2C2D30' },
  ];

  const firmnesses = [
    { id: 'firm-soft', name: 'Soft-Cloud (32D Supersoft)', modifier: 0, desc: 'Plush sink-in comfort with down-like microfibers' },
    { id: 'firm-medium', name: 'Medium-Balanced (40D High Resilience)', modifier: 0, desc: 'Our most popular balance of ergonomic support and comfort' },
    { id: 'firm-ortho', name: 'Orthopedic Extra-Firm (50D Bonded Base)', modifier: 1500, desc: 'Superior spine and lumbar alignment, recommended for elders' },
  ];

  const legs = [
    { id: 'legs-teak', name: 'Tapered Solid Teak Nordic 6"', modifier: 0 },
    { id: 'legs-brass', name: 'Brushed Brass PVD Spindle Legs', modifier: 1800 },
    { id: 'legs-block', name: 'Low-Profile Architectural Block Feet', modifier: 0 },
    { id: 'legs-black', name: 'Matte Charcoal Steel Spindle', modifier: 800 },
  ];

  const stepsList = [
    { num: 1, label: 'Type' },
    { num: 2, label: 'Size' },
    { num: 3, label: 'Timber' },
    { num: 4, label: 'Fabric' },
    { num: 5, label: 'Color' },
    { num: 6, label: 'Cushions' },
    { num: 7, label: 'Legs' },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedType.name}`,
      price: totalPrice,
      quantity: 1,
      coverImage: selectedType.image,
      isCustomDesign: true,
      customDetails: {
        type: selectedType.name,
        size: selectedSize.name,
        wood: selectedWood.name,
        fabric: selectedFabric.name,
        color: selectedColor.name,
        firmness: selectedFirmness.name,
        legs: selectedLegs.name,
      },
    });
  };

  const handleDirectWhatsApp = () => {
    const cleanNumber = cleanWhatsAppNumber(whatsappNumber);
    let msg = `🛋️ *CUSTOM SOFA ENQUIRY (COZLY.IN)*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `I just configured a bespoke sofa design on your customizer:\n\n`;
    msg += `• *Model / Type:* ${selectedType.name}\n`;
    msg += `• *Dimensions:* ${selectedSize.name}\n`;
    msg += `• *Frame Wood:* ${selectedWood.name}\n`;
    msg += `• *Fabric:* ${selectedFabric.name}\n`;
    msg += `• *Color Shade:* ${selectedColor.name}\n`;
    msg += `• *Cushion Firmness:* ${selectedFirmness.name}\n`;
    msg += `• *Leg Style:* ${selectedLegs.name}\n`;
    msg += `\n*Estimated Config Total:* *${formatINR(totalPrice)}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Could you share photos of these materials from your Erattupetta workshop and confirm delivery timeline?`;

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title */}
      <div className="max-w-3xl mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-accent">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Interactive Sofa Atelier</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary">
          Design Your Bespoke Sofa
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted">
          Configure every detail from kiln-dried timber frames to custom fabric weaves with live transparent pricing and direct WhatsApp ordering.
        </p>
      </div>

      {/* Step Progress Tracker */}
      <div className="mb-10 bg-white p-3 sm:p-4 rounded-cozly border border-brand-border shadow-soft overflow-x-auto">
        <div className="flex items-center justify-between min-w-[580px] sm:min-w-0">
          {stepsList.map((s, idx) => (
            <React.Fragment key={s.num}>
              <button
                onClick={() => setCurrentStep(s.num)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <span
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    currentStep === s.num
                      ? 'bg-brand-accent text-white ring-4 ring-brand-accent/20'
                      : currentStep > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-secondary text-brand-muted'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    currentStep === s.num
                      ? 'text-brand-primary'
                      : currentStep > s.num
                      ? 'text-emerald-700'
                      : 'text-brand-muted'
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {idx < stepsList.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 transition-colors ${
                    currentStep > s.num ? 'bg-emerald-600' : 'bg-brand-border'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Two-Column Configurator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Selection Steps (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-6">
          {/* STEP 1: TYPE */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Step 1 of 7</span>
                <h3 className="font-serif font-bold text-xl text-brand-primary">Select Sofa Silhouette & Type</h3>
                <p className="text-xs text-brand-muted">Choose the underlying layout structure for your room.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {types.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t)}
                    className={`p-4 rounded-cozly border text-left transition-all ${
                      selectedType.id === t.id
                        ? 'border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/30'
                        : 'border-brand-border hover:border-brand-primary/40'
                    }`}
                  >
                    <div className="relative h-24 w-full bg-brand-surface rounded-lg mb-2 overflow-hidden">
                      <Image src={t.image} alt={t.name} fill className="object-contain p-2" />
                    </div>
                    <h4 className="font-bold text-xs text-brand-primary">{t.name}</h4>
                    <p className="text-xs font-semibold text-brand-accent mt-1">From {formatINR(t.basePrice)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SIZE */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Step 2 of 7</span>
                <h3 className="font-serif font-bold text-xl text-brand-primary">Select Seating Proportions & Depth</h3>
                <p className="text-xs text-brand-muted">Scale the length and seat depth to your room's blueprint.</p>
              </div>

              <div className="space-y-3 pt-2">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`w-full p-4 rounded-cozly border text-left flex items-center justify-between transition-all ${
                      selectedSize.id === s.id
                        ? 'border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/30'
                        : 'border-brand-border hover:border-brand-primary/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-brand-primary">{s.name}</h4>
                      <p className="text-xs text-brand-muted mt-0.5">{s.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-brand-accent">
                      {s.modifier === 0 ? 'Included' : `+${formatINR(s.modifier)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: WOOD */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Step 3 of 7</span>
                <h3 className="font-serif font-bold text-xl text-brand-primary">Select Frame Timber & Exposed Finish</h3>
                <p className="text-xs text-brand-muted">All our timber is kiln-dried to sub-10% moisture to eliminate warping in tropical weather.</p>
              </div>

              <div className="space-y-3 pt-2">
                {woods.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWood(w)}
                    className={`w-full p-4 rounded-cozly border text-left flex items-center justify-between transition-all ${
                      selectedWood.id === w.id
                        ? 'border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/30'
                        : 'border-brand-border hover:border-brand-primary/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-brand-primary">{w.name}</h4>
                      <p className="text-xs text-brand-muted mt-0.5">{w.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-brand-accent">
                      {w.modifier === 0 ? 'Included' : `+${formatINR(w.modifier)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: FABRIC TYPE */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Step 4 of 7</span>
                <h3 className="font-serif font-bold text-xl text-brand-primary">Select Upholstery Fabric Category</h3>
                <p className="text-xs text-brand-muted">High Rub-Count (30,000+ Martindale) designer fabrics woven for everyday resilience.</p>
              </div>

              <div className="space-y-3 pt-2">
                {fabrics.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFabric(f)}
                    className={`w-full p-4 rounded-cozly border text-left flex items-center justify-between transition-all ${
                      selectedFabric.id === f.id
                        ? 'border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/30'
                        : 'border-brand-border hover:border-brand-primary/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-brand-primary">{f.name}</h4>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-accent">
                        {f.type}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-brand-accent">
                      {f.modifier === 0 ? 'Included' : `+${formatINR(f.modifier)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: COLOR SWATCH */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Step 5 of 7</span>
                <h3 className="font-serif font-bold text-xl text-brand-primary">Select Fabric Color Shade</h3>
                <p className="text-xs text-brand-muted">Chosen: <strong className="text-brand-primary">{selectedColor.name}</strong></p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`p-3 rounded-cozly border text-center flex flex-col items-center gap-2 transition-all ${
                      selectedColor.name === c.name
                        ? 'border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/30 shadow-sm'
                        : 'border-brand-border hover:border-brand-primary/40'
                    }`}
                  >
                    <span
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs font-semibold text-brand-primary">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: CUSHION FIRMNESS */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Step 6 of 7</span>
                <h3 className="font-serif font-bold text-xl text-brand-primary">Select Cushion Core Density</h3>
                <p className="text-xs text-brand-muted">Tailor the seating firmness to your comfort preference.</p>
              </div>

              <div className="space-y-3 pt-2">
                {firmnesses.map((fm) => (
                  <button
                    key={fm.id}
                    onClick={() => setSelectedFirmness(fm)}
                    className={`w-full p-4 rounded-cozly border text-left flex items-center justify-between transition-all ${
                      selectedFirmness.id === fm.id
                        ? 'border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/30'
                        : 'border-brand-border hover:border-brand-primary/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-brand-primary">{fm.name}</h4>
                      <p className="text-xs text-brand-muted mt-0.5">{fm.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-brand-accent">
                      {fm.modifier === 0 ? 'Included' : `+${formatINR(fm.modifier)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: LEG STYLE */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">Step 7 of 7</span>
                <h3 className="font-serif font-bold text-xl text-brand-primary">Select Foot & Leg Style</h3>
                <p className="text-xs text-brand-muted">Complete the architecture with solid wood or brass accented legs.</p>
              </div>

              <div className="space-y-3 pt-2">
                {legs.map((lg) => (
                  <button
                    key={lg.id}
                    onClick={() => setSelectedLegs(lg)}
                    className={`w-full p-4 rounded-cozly border text-left flex items-center justify-between transition-all ${
                      selectedLegs.id === lg.id
                        ? 'border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/30'
                        : 'border-brand-border hover:border-brand-primary/40'
                    }`}
                  >
                    <h4 className="font-bold text-sm text-brand-primary">{lg.name}</h4>
                    <span className="text-xs font-bold text-brand-accent">
                      {lg.modifier === 0 ? 'Included' : `+${formatINR(lg.modifier)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Next / Prev Navigation Buttons */}
          <div className="pt-6 border-t border-brand-border flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`px-4 py-2.5 rounded-cozly text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                currentStep === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-brand-charcoal hover:bg-black/5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < 7 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(7, prev + 1))}
                className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Configuration Complete!
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Live Visual Render & Itemized Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Stage */}
          <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
            <div className="relative aspect-[4/3] rounded-lg bg-brand-surface overflow-hidden border border-brand-border/60">
              <Image
                src={selectedType.image}
                alt={selectedType.name}
                fill
                className="object-contain p-4"
              />

              {/* Color Swatch Badge Overlay */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-brand-border shadow-sm">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-[11px] font-semibold text-brand-primary">
                  {selectedColor.name}
                </span>
              </div>
            </div>

            {/* Live Breakdown List */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-serif font-bold text-sm text-brand-primary pb-2 border-b border-brand-border flex items-center justify-between">
                <span>Custom Specification Summary</span>
                <span className="text-[10px] text-brand-accent font-sans uppercase">Atelier Blueprint</span>
              </h4>

              <div className="flex justify-between">
                <span className="text-brand-muted">Base Model:</span>
                <span className="font-semibold text-brand-primary text-right">{selectedType.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Dimensions:</span>
                <span className="font-semibold text-brand-primary text-right">{selectedSize.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Frame Wood:</span>
                <span className="font-semibold text-brand-primary text-right">{selectedWood.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Fabric:</span>
                <span className="font-semibold text-brand-primary text-right">{selectedFabric.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Firmness:</span>
                <span className="font-semibold text-brand-primary text-right">{selectedFirmness.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Legs:</span>
                <span className="font-semibold text-brand-primary text-right">{selectedLegs.name}</span>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-brand-border flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-brand-muted block">Estimated Factory Total</span>
                  <span className="font-serif font-bold text-2xl text-brand-primary">{formatINR(totalPrice)}</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                  Inclusive of GST
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 bg-brand-primary hover:bg-brand-primary-light text-white font-semibold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-brand-accent" />
                <span>Add Custom Design to Cart</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Enquire Design on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
