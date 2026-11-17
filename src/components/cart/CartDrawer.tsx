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
    const url = generateWhatsAppOrderUrl(items, customer, whatsappNumber);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-surface shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-brand-secondary/70 rounded-cozly text-brand-primary">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-primary">Your Sofa Cart</h3>
                <p className="text-xs text-brand-muted">{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-brand-muted hover:text-brand-charcoal rounded-lg hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-secondary/60 flex items-center justify-center text-brand-muted">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-brand-primary">Your cart is empty</h4>
                  <p className="text-xs text-brand-muted max-w-xs">
                    Explore our catalogue of handcrafted teakwood & upholstered sofas or customize your own design.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs pt-4">
                  <Link
                    href="/collection"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 bg-brand-primary text-white text-xs font-semibold uppercase tracking-wider rounded-cozly hover:bg-brand-primary-light text-center transition-colors shadow-sm"
                  >
                    Browse Catalogue
                  </Link>
                  <Link
                    href="/customize"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 bg-brand-accent/15 text-brand-accent text-xs font-semibold uppercase tracking-wider rounded-cozly hover:bg-brand-accent hover:text-white text-center transition-colors"
                  >
                    Sofa Customizer
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-cozly border border-brand-border flex gap-3 shadow-sm hover:border-brand-primary/30 transition-colors"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-20 bg-brand-secondary/40 rounded-lg overflow-hidden shrink-0 border border-brand-border/50">
                        <Image
                          src={item.coverImage || '/images/products/malabar-teak.svg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-serif font-bold text-sm text-brand-primary truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-rose-600 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Selected Specifications */}
                          <div className="text-[11px] text-brand-muted space-y-0.5 mt-0.5">
                            {item.isCustomDesign && item.customDetails ? (
                              <p className="text-brand-accent font-medium">
                                Custom: {item.customDetails.type} • {item.customDetails.fabric}
                              </p>
                            ) : (
                              <>
                                {item.selectedFabric && <span>{item.selectedFabric}</span>}
                                {item.selectedColor && <span> • {item.selectedColor}</span>}
                                {item.selectedFinish && <span> • {item.selectedFinish}</span>}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-bold text-sm text-brand-primary">
                            {formatINR(item.price * item.quantity)}
                          </span>

                          <div className="flex items-center border border-brand-border rounded-lg bg-brand-surface overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-brand-secondary text-brand-charcoal transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-brand-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-brand-secondary text-brand-charcoal transition-colors"
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

                {/* Delivery Information Form */}
                <div className="p-4 bg-white rounded-cozly border border-brand-border space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                      Delivery Details for WhatsApp Order
                    </h4>
                    <span className="text-[10px] text-brand-muted">No online payment required</span>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        value={customer.name}
                        onChange={(e) => setCustomer({ name: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent"
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="WhatsApp / Phone Number (10 digits) *"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent"
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="City / Town *"
                          value={customer.city}
                          onChange={(e) => setCustomer({ city: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="6-Digit Pincode *"
                          value={customer.pincode}
                          onChange={(e) => setCustomer({ pincode: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent"
                        />
                      </div>
                    </div>
                    {formErrors.pincode && (
                      <p className="text-[10px] text-rose-600">{formErrors.pincode}</p>
                    )}

                    <input
                      type="text"
                      placeholder="Special instructions / custom dimensions (optional)"
                      value={customer.notes || ''}
                      onChange={(e) => setCustomer({ notes: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent"
                    />
                  </div>

                  {/* Delivery Location Check Banner */}
                  {customer.pincode.length >= 3 && (
                    <div
                      className={`p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                        coverage.isCovered
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {coverage.isCovered ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <p className="text-[11px] leading-tight">{coverage.message}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-brand-border bg-white space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-muted">Estimated Subtotal</span>
                <span className="font-serif font-bold text-xl text-brand-primary">
                  {formatINR(totalPrice)}
                </span>
              </div>

              <p className="text-[11px] text-brand-muted leading-tight">
                *Prices include GST. Final delivery fee and assembly will be confirmed on WhatsApp based on your exact floor and city location.
              </p>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-cozly font-semibold text-sm flex items-center justify-center gap-2.5 transition-colors shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Place Order on WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-brand-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>Open Full Cart Page</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-rose-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
