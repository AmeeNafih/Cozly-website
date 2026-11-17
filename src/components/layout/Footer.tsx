'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, MessageCircle, ShieldCheck, Truck, Sparkles, Lock, Instagram, ExternalLink } from 'lucide-react';
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
    <footer className="bg-black text-white pt-16 pb-12 border-t border-brand-charcoal-800 relative overflow-hidden">
      {/* Large subtle sofa-outline icon watermark in background */}
      <div className="absolute -bottom-10 right-4 w-96 h-96 opacity-[0.035] pointer-events-none select-none">
        <Image
          src="/brand/sofa-icon-white.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-brand-charcoal-800">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-brand-charcoal-900 border border-brand-charcoal-800 shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">100% Solid Timber</h4>
              <p className="text-xs text-gray-400 mt-1">Kiln-seasoned Kerala Teakwood with 5 to 15 years structural warranty.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-brand-charcoal-900 border border-brand-charcoal-800 shrink-0">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">White-Glove Delivery</h4>
              <p className="text-xs text-gray-400 mt-1">Direct from our Erattupetta factory to Kerala, Tamil Nadu & Bangalore.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-brand-charcoal-900 border border-brand-charcoal-800 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">Bespoke Customization</h4>
              <p className="text-xs text-gray-400 mt-1">Modify dimensions, wood finishes, fabrics, and cushion firmness.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-brand-charcoal-900 border border-brand-charcoal-800 shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">WhatsApp Ordering</h4>
              <p className="text-xs text-gray-400 mt-1">Zero checkout hassle. Send your cart directly to our craftsmen.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info with White Logo on Black */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-48 h-12">
              <Image
                src="/brand/logo-white.svg"
                alt="COZLY by Zoffaro IN"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-kraft">
              Crafted for every comfort.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Artisanal sofa manufacturing based in Erattupetta, Kottayam, Kerala. Bringing timeless Scandinavian aesthetics together with traditional South Indian carpentry and factory-direct honest pricing.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                  'Hello COZLY by Zoffaro IN! I would like to enquire about visiting your Erattupetta workshop.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-cozly bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/cozly_by_zoffaro.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-cozly bg-brand-charcoal-900 border border-brand-charcoal-800 hover:border-white text-white font-semibold text-xs tracking-wider transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>@cozly_by_zoffaro.in</span>
              </a>
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/collection?material=wooden" className="hover:text-white transition-colors">
                  Solid Teakwood Sofas
                </Link>
              </li>
              <li>
                <Link href="/collection?material=upholstered" className="hover:text-white transition-colors">
                  Premium Upholstered
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=L-Shape" className="hover:text-white transition-colors">
                  L-Shape Sectionals
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=Sofa-Cum-Bed" className="hover:text-white transition-colors">
                  Hydraulic Sofa Beds
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=Recliner" className="hover:text-white transition-colors">
                  Recliners & Chaises
                </Link>
              </li>
              <li>
                <Link href="/customize" className="text-brand-kraft font-semibold hover:underline">
                  Customize Your Own →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Atelier & Heritage
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Projects & Client Homes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Visit Workshop in Erattupetta
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQs & Delivery Zones
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Warranty & Return Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Factory Location & Hours */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Factory & Showroom
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <span>{address}</span>
                  <a
                    href="https://maps.app.goo.gl/XbcbCJcaut3oDnjx8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-kraft hover:text-white font-semibold text-[11px] mt-1.5 transition-colors"
                  >
                    View on Google Maps ↗
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${phone}`} className="hover:underline text-gray-300">{phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline text-gray-300">{email}</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-brand-charcoal-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} COZLY by Zoffaro IN (cozly.in). All rights reserved. Handcrafted in Erattupetta, Kottayam, Kerala.</p>
          <div className="flex items-center space-x-6">
            <span>Kerala • Tamil Nadu • Karnataka / Bangalore</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
