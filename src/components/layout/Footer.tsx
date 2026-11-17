'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, MessageCircle, ShieldCheck, Truck, Sparkles, Lock } from 'lucide-react';
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
    <footer className="bg-brand-primary text-brand-surface pt-16 pb-12 border-t border-brand-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-brand-primary-light/40">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-white/5 border border-white/10 shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">100% Solid Teak Frames</h4>
              <p className="text-xs text-brand-surface/70 mt-1">Kiln-seasoned Kerala timber with 5 to 15 years structural warranty.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-white/5 border border-white/10 shrink-0">
              <Truck className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">White-Glove Delivery</h4>
              <p className="text-xs text-brand-surface/70 mt-1">Direct from our Erattupetta factory to Kerala, Tamil Nadu & Bangalore.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-white/5 border border-white/10 shrink-0">
              <Sparkles className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Bespoke Customization</h4>
              <p className="text-xs text-brand-surface/70 mt-1">Modify dimensions, wood finishes, fabrics, and cushion firmness.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-cozly bg-white/5 border border-white/10 shrink-0">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">WhatsApp Ordering</h4>
              <p className="text-xs text-brand-surface/70 mt-1">Zero checkout hassle. Send your cart directly to our craftsmen.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-44 h-12">
              <Image
                src="/brand/logo-light.svg"
                alt="COZLY Sofa Atelier"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-brand-surface/80 leading-relaxed max-w-sm">
              Artisanal sofa manufacturing based in Erattupetta, Kottayam, Kerala. Bringing timeless Scandinavian aesthetics together with traditional South Indian carpentry and factory-direct honest pricing.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                  'Hello COZLY! I would like to enquire about visiting your Erattupetta workshop.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-cozly bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Workshop Team</span>
              </a>
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-surface/80">
              <li>
                <Link href="/collection?material=wooden" className="hover:text-brand-accent transition-colors">
                  Solid Teakwood Sofas
                </Link>
              </li>
              <li>
                <Link href="/collection?material=upholstered" className="hover:text-brand-accent transition-colors">
                  Premium Upholstered
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=L-Shape" className="hover:text-brand-accent transition-colors">
                  L-Shape Sectionals
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=Sofa-Cum-Bed" className="hover:text-brand-accent transition-colors">
                  Hydraulic Sofa Beds
                </Link>
              </li>
              <li>
                <Link href="/collection?seating=Recliner" className="hover:text-brand-accent transition-colors">
                  Recliners & Chaises
                </Link>
              </li>
              <li>
                <Link href="/customize" className="text-brand-accent font-semibold hover:underline">
                  Customize Your Own →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-surface/80">
              <li>
                <Link href="/about" className="hover:text-brand-accent transition-colors">
                  Our Atelier & Heritage
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-accent transition-colors">
                  Projects & Client Homes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-accent transition-colors">
                  Visit Workshop in Erattupetta
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-accent transition-colors">
                  FAQs & Delivery Zones
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-brand-accent transition-colors">
                  Warranty & Return Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Factory Location & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-4">
              Factory & Showroom
            </h4>
            <div className="space-y-3 text-xs text-brand-surface/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-brand-primary-light/40 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-surface/60 gap-4">
          <p>© {new Date().getFullYear()} COZLY (cozly.in). All rights reserved. Handcrafted in Erattupetta, Kottayam, Kerala.</p>
          <div className="flex items-center space-x-6">
            <span>Kerala • Tamil Nadu • Karnataka / Bangalore</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-brand-surface/40 hover:text-brand-surface/80 transition-colors"
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
