'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  text?: string;
  link?: string;
}

export default function AnnouncementBar({
  text = 'COZLY by Zoffaro IN — Crafted for every comfort. • Direct Factory Delivery across Kerala, Tamil Nadu & Bangalore',
  link = '/collection',
}: AnnouncementBarProps) {
  return (
    <div className="bg-black text-white text-[11px] sm:text-xs py-2 px-4 border-b border-brand-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto font-medium">
          <Truck className="w-3.5 h-3.5 text-brand-kraft shrink-0 hidden sm:inline" />
          <span>{text}</span>
        </div>
        {link && (
          <Link
            href={link}
            className="hidden sm:inline-flex items-center gap-1 text-brand-kraft hover:underline font-semibold ml-4 shrink-0 text-[11px] uppercase tracking-wider"
          >
            <span>Explore Designs</span>
            <Sparkles className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
