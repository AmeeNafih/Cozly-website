'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, MessageCircle, Phone, SlidersHorizontal } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  whatsappNumber?: string;
  phone?: string;
}

export default function Header({
  whatsappNumber = '+919846581241',
  phone = '+919846581241',
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collection', href: '/collection' },
    { label: 'Customize Your Sofa', href: '/customize', highlight: true },
    { label: 'Why COZLY', href: '/#why-cozly' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const cleanWaNumber = whatsappNumber.replace(/\D/g, '');

  return (
    <header className="sticky top-0 z-40 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 py-2 group">
            <div className="relative w-40 sm:w-48 h-12 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/brand/logo.svg"
                alt="COZLY Sofa Atelier Erattupetta"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    link.highlight
                      ? 'bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-white font-semibold flex items-center gap-1.5'
                      : isActive
                      ? 'text-brand-primary font-semibold bg-brand-secondary/60'
                      : 'text-brand-charcoal/80 hover:text-brand-primary hover:bg-black/5'
                  }`}
                >
                  {link.highlight && <SlidersHorizontal className="w-3.5 h-3.5" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: WhatsApp & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* WhatsApp Direct Chat */}
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                'Hello COZLY! I am visiting your website cozly.in and would like to enquire about your handcrafted sofas.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-cozly transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
              className="relative p-2.5 rounded-cozly text-brand-primary hover:bg-brand-secondary/60 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-brand-primary hover:bg-black/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-surface px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-cozly text-base font-medium transition-colors ${
                link.highlight
                  ? 'bg-brand-accent text-white font-semibold'
                  : pathname === link.href
                  ? 'bg-brand-secondary text-brand-primary font-bold'
                  : 'text-brand-charcoal hover:bg-black/5'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-brand-border space-y-2">
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                'Hello COZLY! I am visiting your website cozly.in and would like to enquire about your handcrafted sofas.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-cozly font-semibold text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Order & Enquire on WhatsApp
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-brand-border text-brand-charcoal rounded-cozly font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-brand-accent" />
              Call Factory: {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
