'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Menu, X, MessageCircle, Search } from 'lucide-react';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Shop', href: '/collection' },
    { label: 'Customize', href: '/customize' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const cleanWaNumber = whatsappNumber.replace(/\D/g, '');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collection?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Determine appearance based on route and scroll
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent text-white border-b border-white/10'
          : 'bg-white text-black border-b border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo (left-aligned) */}
          <Link href="/" className="flex items-center shrink-0 py-2 group">
            <div className="relative w-40 sm:w-48 h-10 transition-opacity duration-200 group-hover:opacity-80">
              <Image
                src={isTransparent ? '/brand/logo-white.svg' : '/brand/logo-black.svg'}
                alt="COZLY by Zoffaro IN"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Centered / Right-Aligned Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-[0.16em] uppercase transition-all duration-200 ${
                    isTransparent
                      ? isActive
                        ? 'text-white font-semibold underline underline-offset-8 decoration-1'
                        : 'text-white/80 hover:text-white'
                      : isActive
                      ? 'text-black font-semibold underline underline-offset-8 decoration-1'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons: Search, WhatsApp, Cart, Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search catalogue"
              className={`p-2 transition-colors ${
                isTransparent
                  ? 'text-white/90 hover:text-white'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              <Search className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                'Hello COZLY by Zoffaro IN! I am visiting your website and would like to enquire about your handcrafted sofas.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-[4px] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className={`relative p-2 transition-colors ${
                isTransparent
                  ? 'text-white/90 hover:text-white'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-medium h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2 transition-colors ${
                isTransparent
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Inline Search Dropdown */}
        {searchOpen && (
          <div className="pb-4 pt-1 border-t border-neutral-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search sofas, materials, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-sm bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-[4px] focus:outline-none focus:border-black text-black placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider font-medium px-2.5 py-1 bg-black text-white rounded-[2px]"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white text-black px-6 pt-6 pb-8 space-y-6 animate-fadeIn shadow-lg">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm tracking-[0.16em] uppercase transition-colors ${
                  pathname === link.href
                    ? 'font-semibold text-black underline underline-offset-4'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                'Hello COZLY by Zoffaro IN! I would like to enquire about your sofas.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-[4px] text-xs font-medium uppercase tracking-[0.14em]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-neutral-200 text-black rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] hover:bg-neutral-50"
            >
              <span>Call: {phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
