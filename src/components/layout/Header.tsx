'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, MessageCircle, Phone, SlidersHorizontal, Instagram, MapPin, ExternalLink } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collection', href: '/collection' },
    { label: 'Customize', href: '/customize', highlight: true },
    { label: 'Why COZLY', href: '/#why-cozly' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const cleanWaNumber = whatsappNumber.replace(/\D/g, '');

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-white ${
        isScrolled
          ? 'border-b border-brand-border shadow-sm'
          : 'border-b border-brand-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Black logo on white background */}
          <Link href="/" className="flex items-center shrink-0 py-2 group">
            <div className="relative w-44 sm:w-52 h-11 transition-opacity duration-200 group-hover:opacity-85">
              <Image
                src="/brand/logo-black.svg"
                alt="COZLY by Zoffaro IN"
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
                  className={`px-3.5 py-2 rounded-cozly text-xs tracking-wider uppercase font-semibold transition-all duration-200 ${
                    link.highlight
                      ? 'bg-black text-white hover:bg-brand-charcoal-800 shadow-sm flex items-center gap-1.5'
                      : isActive
                      ? 'text-black font-bold bg-brand-grey-100'
                      : 'text-brand-charcoal-700 hover:text-black hover:bg-brand-grey-100'
                  }`}
                >
                  {link.highlight && <SlidersHorizontal className="w-3 h-3 text-brand-kraft" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: WhatsApp & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* WhatsApp Direct Chat (WhatsApp Green #25D366 ONLY) */}
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                'Hello COZLY by Zoffaro IN! I am visiting your website and would like to enquire about your handcrafted sofas.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-cozly transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
              className="relative p-2.5 rounded-cozly text-black hover:bg-brand-grey-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-black stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-black hover:bg-brand-grey-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-3 rounded-cozly text-xs uppercase tracking-wider font-semibold transition-colors ${
                  link.highlight
                    ? 'bg-black text-white font-bold flex items-center justify-between'
                    : pathname === link.href
                    ? 'bg-brand-grey-100 text-black font-bold'
                    : 'text-brand-charcoal-700 hover:bg-brand-grey-100'
                }`}
              >
                <span>{link.label}</span>
                {link.highlight && <SlidersHorizontal className="w-3.5 h-3.5 text-brand-kraft" />}
              </Link>
            ))}
          </div>

          {/* Social & Workshop Quick Links on Mobile */}
          <div className="pt-3 border-t border-brand-border grid grid-cols-2 gap-2 text-xs">
            <a
              href="https://www.instagram.com/cozly_by_zoffaro.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-cozly bg-brand-grey-50 border border-brand-border text-black hover:bg-brand-grey-100 transition-colors"
            >
              <Instagram className="w-4 h-4 text-black shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-[11px] truncate">Instagram</p>
                <p className="text-[9px] text-brand-charcoal-500 truncate">@cozly_by_zoffaro.in</p>
              </div>
            </a>

            <a
              href="https://maps.app.goo.gl/XbcbCJcaut3oDnjx8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-cozly bg-brand-grey-50 border border-brand-border text-black hover:bg-brand-grey-100 transition-colors"
            >
              <MapPin className="w-4 h-4 text-brand-kraft shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-[11px] truncate">Factory Map</p>
                <p className="text-[9px] text-brand-charcoal-500 truncate">Erattupetta</p>
              </div>
            </a>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                'Hello COZLY by Zoffaro IN! I would like to enquire about your sofas.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-cozly font-semibold text-xs uppercase tracking-wider shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-brand-border text-black rounded-cozly font-semibold text-xs uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              <span>Call Atelier: {phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
