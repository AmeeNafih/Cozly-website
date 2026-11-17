'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR, checkDeliveryCoverage, generateWhatsAppOrderUrl } from '@/lib/formatters';

interface FullCartViewProps {
  whatsappNumber?: string;
}

export default function FullCartView({ whatsappNumber = '+919846581241' }: FullCartViewProps) {
  const {
    items,
    customer,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    setCustomer,
    clearCart,
  } = useCart();

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; pincode?: string }>({});

  const coverage = checkDeliveryCoverage(customer.pincode, customer.city);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; pincode?: string } = {};

    if (!customer.name || customer.name.trim().length < 2) {
      errors.name = 'Please provide your full name';
    }
    if (!customer.phone || customer.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number';
    }
    if (!customer.pincode || customer.pincode.replace(/\D/g, '').length < 6) {
      errors.pincode = 'Please enter your 6-digit delivery pincode';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://cozly.in';
    const url = generateWhatsAppOrderUrl(items, customer, whatsappNumber, origin);
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-brand-grey-100 flex items-center justify-center text-black">
          <ShoppingBag className="w-10 h-10 stroke-[1.25]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-black tracking-tight">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-600 max-w-md mx-auto">
            You haven't added any handcrafted sofas yet. Explore our solid teak collection or create a custom build.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/collection"
            className="px-6 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-cozly hover:bg-brand-charcoal-800 transition-colors shadow-sm"
          >
            Explore Catalogue
          </Link>
          <Link
            href="/customize"
            className="px-6 py-3.5 bg-white border border-brand-border text-black text-xs font-bold uppercase tracking-wider rounded-cozly hover:bg-brand-grey-100 transition-colors shadow-sm"
          >
            Customize Your Sofa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-brand-border pb-6 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            WhatsApp Order Dispatch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mt-1 tracking-tight">
            Shopping Cart ({totalItems})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-brand-charcoal-500 hover:text-black font-semibold transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Items List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 bg-white rounded-cozly border border-brand-border shadow-soft flex flex-col sm:flex-row gap-4"
            >
              {/* Product Photo */}
              <div className="relative w-full sm:w-32 h-32 bg-brand-grey-100 rounded-lg overflow-hidden shrink-0 border border-brand-border">
                <Image
                  src={item.coverImage || '/images/products/malabar-teak.svg'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base text-black">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-black p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>

                  {/* Config details */}
                  <div className="text-xs text-brand-charcoal-600 space-y-0.5 mt-1">
                    {item.isCustomDesign && item.customDetails ? (
                      <div className="space-y-0.5 text-[11px] bg-brand-grey-50 p-2.5 rounded-lg border border-brand-border">
                        <p><strong>Config:</strong> {item.customDetails.type} ({item.customDetails.size})</p>
                        <p><strong>Timber:</strong> {item.customDetails.wood}</p>
                        <p><strong>Fabric:</strong> {item.customDetails.fabric} • {item.customDetails.color}</p>
                        <p><strong>Firmness:</strong> {item.customDetails.firmness}</p>
                      </div>
                    ) : (
                      <p>
                        {item.selectedFabric && <span>{item.selectedFabric}</span>}
                        {item.selectedColor && <span> • {item.selectedColor}</span>}
                        {item.selectedFinish && <span> • {item.selectedFinish}</span>}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing and Quantity */}
                <div className="flex items-center justify-between pt-2 border-t border-brand-border">
                  <div className="flex items-center border border-brand-border rounded-cozly bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-brand-grey-100 text-black transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-brand-grey-100 text-black transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-lg text-black">
                      {formatINR(item.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-brand-charcoal-500 block">
                      {formatINR(item.price)} each
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Delivery Coverage Assurance */}
          <div className="p-4 bg-white rounded-cozly border border-brand-border shadow-soft flex items-start gap-3">
            <Truck className="w-5 h-5 text-black shrink-0 mt-0.5 stroke-[1.5]" />
            <div className="text-xs text-brand-charcoal-700 space-y-1">
              <p className="font-bold text-black">Direct Factory Delivery Coverage</p>
              <p>
                We deliver direct from our workshop in Erattupetta, Kottayam to all districts across <strong>Kerala</strong>, <strong>Karnataka (including Bangalore)</strong>, and <strong>Tamil Nadu</strong> with white-glove living room placement.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details & WhatsApp Checkout (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-6">
          <div className="border-b border-brand-border pb-4">
            <h3 className="font-bold text-lg text-black">
              Delivery Details
            </h3>
            <p className="text-xs text-brand-charcoal-600 mt-0.5">
              Enter your address to generate the WhatsApp order message. No online gateway required.
            </p>
          </div>

          <form onSubmit={handleWhatsAppCheckout} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Anandhu Krishnan"
                value={customer.name}
                onChange={(e) => setCustomer({ name: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
              />
              {formErrors.name && (
                <p className="text-[10px] text-rose-600 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                WhatsApp Mobile Number *
              </label>
              <input
                type="tel"
                placeholder="e.g. 98465 12345 (10 digits)"
                value={customer.phone}
                onChange={(e) => setCustomer({ phone: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
              />
              {formErrors.phone && (
                <p className="text-[10px] text-rose-600 mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                  City / District *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ernakulam / Bangalore"
                  value={customer.city}
                  onChange={(e) => setCustomer({ city: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                  Pincode (6 digits) *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 682016"
                  value={customer.pincode}
                  onChange={(e) => setCustomer({ pincode: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
            {formErrors.pincode && (
              <p className="text-[10px] text-rose-600">{formErrors.pincode}</p>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                Special Delivery Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 2nd floor elevator delivery, preferred delivery date, etc."
                value={customer.notes || ''}
                onChange={(e) => setCustomer({ notes: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Smart Location Coverage Banner */}
            {customer.pincode.length >= 3 && (
              <div
                className={`p-3 rounded-cozly text-xs flex items-start gap-2.5 ${
                  coverage.isCovered
                    ? 'bg-brand-grey-100 text-black border border-brand-border'
                    : 'bg-brand-grey-100 text-brand-charcoal-700 border border-brand-border'
                }`}
              >
                {coverage.isCovered ? (
                  <CheckCircle className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[1.5]" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-brand-charcoal-600 shrink-0 mt-0.5 stroke-[1.5]" />
                )}
                <div>
                  <p className="font-bold">{coverage.isCovered ? 'Direct Delivery Zone' : 'Delivery Outside Primary Zone'}</p>
                  <p className="text-[11px] text-brand-charcoal-600 mt-0.5">{coverage.message}</p>
                </div>
              </div>
            )}

            {/* Price Summary Breakdown */}
            <div className="pt-4 border-t border-brand-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-brand-charcoal-600">Items Subtotal:</span>
                <span className="font-bold text-black">{formatINR(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoal-600">GST & Taxes:</span>
                <span className="text-black font-semibold">Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoal-600">Delivery & Unpacking:</span>
                <span className="text-black font-semibold">Confirmed on WhatsApp</span>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-brand-charcoal-600 block">Estimated Total</span>
                  <span className="font-bold text-2xl text-black">
                    {formatINR(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-brand-whatsapp hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white text-brand-whatsapp" />
              <span>Place Order on WhatsApp</span>
            </button>
          </form>

          <p className="text-[11px] text-brand-charcoal-500 text-center">
            🔒 By clicking, you will be redirected to WhatsApp where our factory manager will review your specifications, send timber photos, and schedule delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
