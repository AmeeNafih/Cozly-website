'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, MessageCircle, AlertCircle, CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR, checkDeliveryCoverage, generateWhatsAppOrderUrl } from '@/lib/formatters';

interface CartDrawerProps {
  whatsappNumber?: string;
}

export default function CartDrawer({ whatsappNumber = '+919846581241' }: CartDrawerProps) {
  const {
    items,
    customer,
    isCartOpen,
    totalPrice,
    totalItems,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    setCustomer,
    clearCart,
  } = useCart();

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; pincode?: string }>({});

  if (!isCartOpen) return null;

  const coverage = checkDeliveryCoverage(customer.pincode, customer.city);

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; pincode?: string } = {};

    if (!customer.name || customer.name.trim().length < 2) {
      errors.name = 'Please enter your name';
    }
    if (!customer.phone || customer.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit number';
    }
    if (!customer.pincode || customer.pincode.replace(/\D/g, '').length < 6) {
      errors.pincode = 'Please enter a 6-digit pincode';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const url = generateWhatsAppOrderUrl(items, customer, whatsappNumber);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col border-l border-neutral-200">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-white">
            <div>
              <h3 className="font-medium text-base text-black">Cart</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{totalItems} {totalItems === 1 ? 'sofa' : 'sofas'}</p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-500 hover:text-black transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <p className="text-sm text-neutral-600">Your cart is empty.</p>
                <div className="flex flex-col gap-2 w-full max-w-xs pt-2">
                  <Link
                    href="/collection"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 px-4 bg-black text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] text-center hover:bg-neutral-800 transition-colors"
                  >
                    Browse collection
                  </Link>
                  <Link
                    href="/customize"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 px-4 bg-white border border-neutral-200 text-black text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] text-center hover:bg-neutral-50 transition-colors"
                  >
                    Customize a sofa
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="divide-y divide-neutral-200">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 bg-neutral-100 rounded-[4px] overflow-hidden shrink-0 border border-neutral-200">
                        <Image
                          src={item.coverImage || '/images/real/cozly-photo-14.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm text-black truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-400 hover:text-black p-0.5 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-xs text-neutral-500 mt-1 space-y-0.5">
                            {item.isCustomDesign && item.customDetails ? (
                              <p className="text-black font-medium">
                                Custom: {item.customDetails.type} • {item.customDetails.fabric}
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

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-semibold text-sm text-black">
                            {formatINR(item.price * item.quantity)}
                          </span>

                          <div className="flex items-center border border-neutral-200 rounded-[3px]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 hover:bg-neutral-100 text-neutral-700 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 hover:bg-neutral-100 text-neutral-700 transition-colors"
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

                {/* Delivery Form */}
                <div className="pt-4 border-t border-neutral-200 space-y-3">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                    Delivery Details for WhatsApp Order
                  </span>

                  <div className="space-y-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={customer.name}
                        onChange={(e) => setCustomer({ name: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-neutral-500 mt-0.5">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number (10 digits) *"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-neutral-500 mt-0.5">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City / Town *"
                        value={customer.city}
                        onChange={(e) => setCustomer({ city: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                      />
                      <div>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="Pincode *"
                          value={customer.pincode}
                          onChange={(e) => setCustomer({ pincode: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                        />
                        {formErrors.pincode && (
                          <p className="text-[10px] text-neutral-500 mt-0.5">{formErrors.pincode}</p>
                        )}
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Notes / custom instructions (optional)"
                      value={customer.notes || ''}
                      onChange={(e) => setCustomer({ notes: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                    />
                  </div>

                  {customer.pincode.length >= 3 && (
                    <p className="text-[11px] text-neutral-500 leading-tight">
                      {coverage.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-white space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Subtotal</span>
                <span className="font-semibold text-lg text-black">
                  {formatINR(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send order on WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-neutral-600 hover:text-black underline underline-offset-4 text-[11px]"
                >
                  View full cart page
                </Link>
                <button
                  onClick={clearCart}
                  className="text-neutral-400 hover:text-black text-[11px]"
                >
                  Clear cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
