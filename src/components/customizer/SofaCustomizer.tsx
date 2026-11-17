'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR, cleanWhatsAppNumber } from '@/lib/formatters';

interface CustomizerProps {
  whatsappNumber?: string;
}

export default function SofaCustomizer({ whatsappNumber = '+919846581241' }: CustomizerProps) {
  const { addToCart } = useCart();
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Current Step (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);

  // Configuration Choices
  const [selectedType, setSelectedType] = useState({
    id: 'type-3seater',
    name: '3-Seater Classic Living',
    basePrice: 38000,
    image: '/images/real/cozly-photo-16.jpg',
  });

  const [selectedSize, setSelectedSize] = useState({
    id: 'size-std',
    name: 'Standard Dimensions (210cm)',
    modifier: 0,
    desc: 'Ideal for most living rooms and apartments',
  });

  const [selectedWood, setSelectedWood] = useState({
    id: 'wood-teak',
    name: 'Solid Kiln-Dried Kerala Teak',
    modifier: 4500,
    desc: 'Ethically harvested Kerala Teakwood seasoned for lifetime structural stability',
  });

  const [selectedFabric, setSelectedFabric] = useState({
    id: 'fab-linen',
    name: 'Belgian Textured Linen',
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
    desc: 'Optimal ergonomic balance for everyday family seating and posture support',
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
    { id: 'type-2seater', name: '2-Seater Studio Lounge', basePrice: 28000, image: '/images/real/cozly-photo-09.jpg' },
    { id: 'type-3seater', name: '3-Seater Classic Living', basePrice: 38000, image: '/images/real/cozly-photo-16.jpg' },
    { id: 'type-lshape', name: 'L-Shape Modular Sectional', basePrice: 54000, image: '/images/real/cozly-photo-08.jpg' },
    { id: 'type-sofabed', name: 'Hydraulic Sofa-Cum-Bed', basePrice: 44000, image: '/images/real/cozly-photo-21.jpg' },
    { id: 'type-recliner', name: 'Push-Back Recliner Lounger', basePrice: 30000, image: '/images/real/cozly-photo-06.jpg' },
    { id: 'type-chaise', name: 'Organic Curved Chaise', basePrice: 36000, image: '/images/real/cozly-photo-01.jpg' },
  ];

  const sizes = [
    { id: 'size-std', name: 'Standard Ergonomic (210cm)', modifier: 0, desc: 'Optimized standard dimensions for modern living rooms' },
    { id: 'size-deep', name: 'Deep-Lounge Extra (+15cm Depth)', modifier: 3500, desc: 'Extra deep seating for lounging with cushions' },
    { id: 'size-grand', name: 'Grand Living (+30cm Length)', modifier: 6000, desc: 'Spacious extended configuration for open-concept floor plans' },
  ];

  const woods = [
    { id: 'wood-teak', name: 'Solid Kiln-Dried Kerala Teak', modifier: 4500, desc: 'Ethically sourced Kerala Teakwood with lifetime structural integrity' },
    { id: 'wood-rosewood', name: 'Solid Teak in Rosewood Stain', modifier: 3500, desc: 'Deep warm reddish-brown luster with satin hand-rubbed finish' },
    { id: 'wood-concealed', name: 'Seasoned Hardwood (Internal)', modifier: 0, desc: 'Reinforced internal hardwood frame fully encased in upholstery' },
  ];

  const fabrics = [
    { id: 'fab-linen', name: 'Belgian Textured Linen', type: 'Linen', modifier: 0 },
    { id: 'fab-velvet', name: 'Italian Cotton Velvet', type: 'Velvet', modifier: 2500 },
    { id: 'fab-boucle', name: 'Scandinavian Architectural Bouclé', type: 'Bouclé', modifier: 3000 },
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
    { id: 'firm-soft', name: 'Soft-Cloud (32D)', modifier: 0, desc: 'Plush sink-in comfort with down-like microfibers' },
    { id: 'firm-medium', name: 'Medium-Balanced (40D)', modifier: 0, desc: 'Our standard balanced ergonomic support for everyday seating' },
    { id: 'firm-ortho', name: 'Orthopedic Extra-Firm (50D)', modifier: 1500, desc: 'Superior spine alignment and firmer lumbar support' },
  ];

  const legs = [
    { id: 'legs-teak', name: 'Tapered Solid Teak 6"', modifier: 0 },
    { id: 'legs-brass', name: 'Brushed Brass PVD Spindle', modifier: 1800 },
    { id: 'legs-block', name: 'Low-Profile Architectural Block', modifier: 0 },
    { id: 'legs-black', name: 'Matte Charcoal Steel', modifier: 800 },
  ];

  const stepsList = [
    { num: 1, label: 'Type' },
    { num: 2, label: 'Size' },
    { num: 3, label: 'Timber' },
    { num: 4, label: 'Fabric' },
    { num: 5, label: 'Colour' },
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

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
  };

  const handleDirectWhatsApp = () => {
    const cleanNumber = cleanWhatsAppNumber(whatsappNumber);
    let msg = `CUSTOM SOFA ENQUIRY — COZLY by Zoffaro IN\n`;
    msg += `─────────────────────────\n`;
    msg += `I have configured a custom sofa online:\n\n`;
    msg += `• Silhouette: ${selectedType.name}\n`;
    msg += `• Dimensions: ${selectedSize.name}\n`;
    msg += `• Frame Wood: ${selectedWood.name}\n`;
    msg += `• Fabric: ${selectedFabric.name}\n`;
    msg += `• Colour: ${selectedColor.name}\n`;
    msg += `• Cushion Firmness: ${selectedFirmness.name}\n`;
    msg += `• Leg Style: ${selectedLegs.name}\n`;
    msg += `\nEstimated Total: ${formatINR(totalPrice)}\n`;
    msg += `─────────────────────────\n`;
    msg += `Could you share photos of these materials from your Erattupetta workshop and confirm delivery?`;

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Bespoke Configurator
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-black tracking-[-0.02em]">
            Customize your sofa
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            Choose your configuration, solid wood frame, upholstery weave, and cushioning with live workshop pricing.
          </p>

          {/* Calm Progress Indicator */}
          <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-4 overflow-x-auto gap-4">
            {stepsList.map((step) => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`text-xs uppercase tracking-[0.14em] pb-1 whitespace-nowrap transition-colors border-b-2 ${
                  currentStep === step.num
                    ? 'border-black text-black font-semibold'
                    : currentStep > step.num
                    ? 'border-neutral-300 text-neutral-800'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {step.num}. {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Workspace: Left Configurator / Right Sticky Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Step Content (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Type */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-base font-medium text-black">
                  1. Select Silhouette & Type
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {types.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedType(t)}
                      className={`text-left rounded-[4px] overflow-hidden border transition-all ${
                        selectedType.id === t.id
                          ? 'border-black ring-1 ring-black'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full bg-neutral-100">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                      <div className="p-3 bg-white">
                        <p className="text-xs font-medium text-black">{t.name}</p>
                        <p className="text-xs text-neutral-500 mt-0.5">{formatINR(t.basePrice)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Size */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-base font-medium text-black">
                  2. Dimensions & Depth
                </h2>
                <div className="space-y-3">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSize(s)}
                      className={`w-full text-left p-4 rounded-[4px] border transition-all flex items-start justify-between gap-4 ${
                        selectedSize.id === s.id
                          ? 'border-black ring-1 ring-black bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-black">{s.name}</p>
                        <p className="text-xs text-neutral-500 mt-1">{s.desc}</p>
                      </div>
                      <span className="text-xs font-semibold text-black shrink-0">
                        {s.modifier > 0 ? `+${formatINR(s.modifier)}` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Timber Frame */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-base font-medium text-black">
                  3. Solid Frame Timber
                </h2>
                <div className="space-y-3">
                  {woods.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWood(w)}
                      className={`w-full text-left p-4 rounded-[4px] border transition-all flex items-start justify-between gap-4 ${
                        selectedWood.id === w.id
                          ? 'border-black ring-1 ring-black bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-black">{w.name}</p>
                        <p className="text-xs text-neutral-500 mt-1">{w.desc}</p>
                      </div>
                      <span className="text-xs font-semibold text-black shrink-0">
                        {w.modifier > 0 ? `+${formatINR(w.modifier)}` : 'Included'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Fabric */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-base font-medium text-black">
                  4. Upholstery Weave
                </h2>
                <div className="space-y-3">
                  {fabrics.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFabric(f)}
                      className={`w-full text-left p-4 rounded-[4px] border transition-all flex items-center justify-between gap-4 ${
                        selectedFabric.id === f.id
                          ? 'border-black ring-1 ring-black bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-black">{f.name}</p>
                        <p className="text-xs text-neutral-500 mt-0.5">Type: {f.type}</p>
                      </div>
                      <span className="text-xs font-semibold text-black shrink-0">
                        {f.modifier > 0 ? `+${formatINR(f.modifier)}` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Colour */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-base font-medium text-black">
                  5. Shade & Colour
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`p-3 rounded-[4px] border text-left flex items-center gap-2.5 transition-all ${
                        selectedColor.name === c.name
                          ? 'border-black ring-1 ring-black bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-medium text-black truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Cushion Firmness */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <h2 className="text-base font-medium text-black">
                  6. Cushion Firmness
                </h2>
                <div className="space-y-3">
                  {firmnesses.map((fm) => (
                    <button
                      key={fm.id}
                      onClick={() => setSelectedFirmness(fm)}
                      className={`w-full text-left p-4 rounded-[4px] border transition-all flex items-start justify-between gap-4 ${
                        selectedFirmness.id === fm.id
                          ? 'border-black ring-1 ring-black bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-black">{fm.name}</p>
                        <p className="text-xs text-neutral-500 mt-1">{fm.desc}</p>
                      </div>
                      <span className="text-xs font-semibold text-black shrink-0">
                        {fm.modifier > 0 ? `+${formatINR(fm.modifier)}` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Legs */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <h2 className="text-base font-medium text-black">
                  7. Leg Style
                </h2>
                <div className="space-y-3">
                  {legs.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLegs(l)}
                      className={`w-full text-left p-4 rounded-[4px] border transition-all flex items-center justify-between gap-4 ${
                        selectedLegs.id === l.id
                          ? 'border-black ring-1 ring-black bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <p className="text-sm font-medium text-black">{l.name}</p>
                      <span className="text-xs font-semibold text-black shrink-0">
                        {l.modifier > 0 ? `+${formatINR(l.modifier)}` : 'Included'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 border border-neutral-200 rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] flex items-center gap-1.5 text-black hover:bg-neutral-50"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 7 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2.5 bg-black text-white rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] flex items-center gap-1.5 hover:bg-neutral-800"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-2.5 bg-black text-white rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] flex items-center gap-1.5 hover:bg-neutral-800"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to cart</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Configuration Summary (5 cols on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 bg-neutral-50 p-6 rounded-[4px] border border-neutral-200">
            <div className="relative aspect-[16/10] w-full bg-neutral-100 rounded-[4px] overflow-hidden border border-neutral-200">
              <Image
                src={selectedType.image}
                alt={selectedType.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 border-b border-neutral-200 pb-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 block">
                Your Configuration
              </span>
              <h3 className="text-xl font-medium text-black">
                Custom {selectedType.name}
              </h3>
              <p className="text-2xl font-semibold text-black tracking-tight">
                {formatINR(totalPrice)}
              </p>
            </div>

            {/* Itemized Specs */}
            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span className="text-neutral-500">Dimensions:</span>
                <span className="font-medium text-black text-right">{selectedSize.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Timber:</span>
                <span className="font-medium text-black text-right">{selectedWood.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Upholstery:</span>
                <span className="font-medium text-black text-right">{selectedFabric.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Colour:</span>
                <span className="font-medium text-black text-right">{selectedColor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Cushioning:</span>
                <span className="font-medium text-black text-right">{selectedFirmness.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Legs:</span>
                <span className="font-medium text-black text-right">{selectedLegs.name}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors flex items-center justify-center gap-2"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to cart ({formatINR(totalPrice)})</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-3 px-4 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-900 text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
