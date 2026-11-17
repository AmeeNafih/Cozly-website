'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Armchair, SlidersHorizontal, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface MobileBottomNavProps {
  whatsappNumber?: string;
}

export default function MobileBottomNav({
  whatsappNumber = '+919846581241',
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const cleanWaNumber = whatsappNumber.replace(/\D/g, '');

  // Hide on admin routes or product detail pages (where ProductDetailView provides a dedicated sticky purchase bar)
  const isProductDetail = pathname.startsWith('/collection/') && pathname !== '/collection';
  if (pathname.startsWith('/admin') || isProductDetail) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Sofas',
      href: '/collection',
      icon: Armchair,
      isActive: pathname === '/collection' || pathname.startsWith('/collection/'),
    },
    {
      label: 'Customize',
      href: '/customize',
      icon: SlidersHorizontal,
      isActive: pathname === '/customize',
      highlight: true,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                item.isActive
                  ? 'text-black font-bold'
                  : 'text-brand-charcoal-500 hover:text-black font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 stroke-[1.75] ${item.isActive ? 'scale-110' : ''} transition-transform`} />
                {item.highlight && !item.isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-kraft" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-brand-charcoal-500 hover:text-black font-medium transition-all"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Cart</span>
        </button>

        {/* WhatsApp Direct Action */}
        <a
          href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
            'Hello COZLY by Zoffaro IN! I am browsing your mobile catalogue and have a question.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[#25D366] hover:opacity-90 font-semibold transition-all"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm">
            <MessageCircle className="w-4 h-4 fill-white" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight leading-none text-brand-charcoal-700">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
