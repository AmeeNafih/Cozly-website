'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Instagram, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const whatsappNumber = settings?.whatsappNumber || '+919846581241';
  const phone = settings?.phone || '+919846581241';
  const email = settings?.email || 'sales@cozly.in';
  const address = settings?.factoryAddress || 'Cozly Sofa Works, Main Road, Erattupetta, Kottayam, Kerala 686122, India';
  const cleanWaNumber = whatsappNumber.replace(/\D/g, '');

  return (
    <footer className="bg-black text-white pt-20 pb-12 border-t border-neutral-900 relative overflow-hidden">
      {/* Subtle sofa-outline watermark */}
      <div className="absolute -bottom-8 -right-8 w-80 h-80 opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/brand/sofa-icon-white.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Grid: Shop, Company, Help, Visit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-neutral-900">
          {/* Column 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <Link href="/collection?material=wooden" className="hover:text-white transition-colors">
                  Solid Teak Sofas
                </Link>
              </li>
              <li>
                <Link href="/collection?material=upholstered" className="hover:text-white transition-colors">
                  Upholstered Sofas
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=L-Shape" className="hover:text-white transition-colors">
                  L-Shape & Sectionals
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=Sofa-Cum-Bed" className="hover:text-white transition-colors">
                  Sofa-Cum-Beds
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=Recliner" className="hover:text-white transition-colors">
                  Recliners & Chaises
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/customize" className="text-white hover:underline underline-offset-4 font-medium flex items-center gap-1">
                  <span>Customizer</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Atelier
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Living Room Gallery
                </Link>
              </li>
              <li>
                <Link href="/about#craft" className="hover:text-white transition-colors">
                  Kiln-Dried Timber & Joinery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Erattupetta Workshop
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cozly_by_zoffaro.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-neutral-400" />
                  <span>@cozly_by_zoffaro.in</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Ordering on WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/faq#delivery" className="hover:text-white transition-colors">
                  All-India Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Frame Warranty & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq#care" className="hover:text-white transition-colors">
                  Fabric & Wood Care
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                    'Hello COZLY by Zoffaro IN! I have a question about placing an order.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline underline-offset-4 flex items-center gap-1"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Visit */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Visit
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="leading-relaxed">{address}</p>
                  <a
                    href="https://maps.app.goo.gl/XbcbCJcaut3oDnjx8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white hover:underline underline-offset-4 mt-1"
                  >
                    <span>Google Maps</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </div>

              <div className="flex items-start gap-2 pt-1 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>Mon – Sat, 9:00 AM – 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location Only (Admin link removed from public footer) */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-500 gap-3">
          <p>© {new Date().getFullYear()} COZLY by Zoffaro IN (cozly.in). Handcrafted in Erattupetta, Kerala.</p>
          <p className="text-neutral-500 text-[11px]">Factory-direct delivery across all of India.</p>
        </div>
      </div>
    </footer>
  );
}
