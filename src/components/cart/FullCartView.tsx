'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  MessageCircle,
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
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-normal text-black tracking-tight">Your cart is empty</h1>
        <p className="text-sm text-neutral-600 max-w-sm mx-auto">
          Explore our solid teak and upholstered sofas or configure your own measurements.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/collection"
            className="px-6 py-3 bg-black text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] hover:bg-neutral-800 transition-colors"
          >
            Explore collection
          </Link>
          <Link
            href="/customize"
            className="px-6 py-3 bg-white border border-neutral-200 text-black text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] hover:bg-neutral-50 transition-colors"
          >
            Customize your sofa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Page Header */}
        <div className="flex items-baseline justify-between border-b border-neutral-200 pb-6 mb-10">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Order Summary
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-black tracking-[-0.02em]">
              Shopping cart
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-neutral-400 hover:text-black underline underline-offset-4 transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Cart Items (7 cols on lg) */}
          <div className="lg:col-span-7 divide-y divide-neutral-200">
            {items.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 flex flex-col sm:flex-row gap-6">
                {/* Photo (4:5 Ratio) */}
                <div className="relative w-28 h-36 bg-neutral-100 rounded-[4px] overflow-hidden shrink-0 border border-neutral-200">
                  <Image
                    src={item.coverImage || '/images/real/cozly-photo-14.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-medium text-base text-black">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-black transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-neutral-500 mt-1 space-y-0.5">
                      {item.isCustomDesign && item.customDetails ? (
                        <p className="text-black font-medium">
                          Custom: {item.customDetails.type} • {item.customDetails.wood} • {item.customDetails.fabric}
                        </p>
                      ) : (
                        <p>
                          {[item.selectedFabric, item.selectedColor, item.selectedFinish]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <span className="font-semibold text-base text-black">
                      {formatINR(item.price * item.quantity)}
                    </span>

                    <div className="flex items-center border border-neutral-200 rounded-[3px]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-neutral-100 text-neutral-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-neutral-100 text-neutral-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Delivery Form & WhatsApp Checkout (5 cols on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 bg-neutral-50 p-6 sm:p-8 rounded-[4px] border border-neutral-200 space-y-6">
            <div className="border-b border-neutral-200 pb-4">
              <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-1">
                Direct Dispatch
              </span>
              <h2 className="text-lg font-medium text-black">
                Delivery information
              </h2>
            </div>

            <form onSubmit={handleWhatsAppCheckout} className="space-y-3.5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thomas Mathew"
                  value={customer.name}
                  onChange={(e) => setCustomer({ name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                />
                {formErrors.name && (
                  <p className="text-[10px] text-neutral-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9846581241"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ phone: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                />
                {formErrors.phone && (
                  <p className="text-[10px] text-neutral-500 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kochi / Bangalore"
                    value={customer.city}
                    onChange={(e) => setCustomer({ city: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 682001"
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ pincode: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                  />
                  {formErrors.pincode && (
                    <p className="text-[10px] text-neutral-500 mt-1">{formErrors.pincode}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Notes or Custom Measurements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Apartment floor, lift availability, or special requests..."
                  value={customer.notes || ''}
                  onChange={(e) => setCustomer({ notes: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black resize-none"
                />
              </div>

              {customer.pincode.length >= 3 && (
                <p className="text-xs text-neutral-500 leading-tight pt-1">
                  {coverage.message}
                </p>
              )}

              {/* Total & Checkout */}
              <div className="pt-4 border-t border-neutral-200 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Total</span>
                  <span className="font-semibold text-2xl text-black">
                    {formatINR(totalPrice)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send order on WhatsApp</span>
                </button>

                <p className="text-[11px] text-neutral-500 leading-relaxed text-center">
                  Zero online payment gateway. Your order is sent directly to our Erattupetta workshop for verification.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
