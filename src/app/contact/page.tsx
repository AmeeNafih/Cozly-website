'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';
import { cleanWhatsAppNumber } from '@/lib/formatters';

export default function ContactPage() {
  const whatsappNumber = '+919846581241';
  const phone = '+919846581241';
  const email = 'sales@cozly.in';
  const address = 'Cozly Sofa Works, Main Road, Erattupetta, Kottayam, Kerala 686122, India';
  const googleMapsUrl = 'https://maps.app.goo.gl/XbcbCJcaut3oDnjx8';
  const instagramUrl = 'https://www.instagram.com/cozly_by_zoffaro.in';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = cleanWhatsAppNumber(whatsappNumber);
    let text = `CONTACT ENQUIRY — COZLY by Zoffaro IN\n`;
    text += `─────────────────────────\n`;
    text += `Name: ${form.name}\n`;
    text += `Phone: ${form.phone}\n`;
    text += `City: ${form.city}\n`;
    if (form.message) text += `Message: ${form.message}\n`;
    text += `─────────────────────────`;

    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Get in touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-black tracking-[-0.02em]">
            Contact our workshop
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            You are welcome to visit our workshop in Erattupetta to touch fabric swatches, see timber joinery, or discuss custom requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Details (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.16em] text-neutral-500 font-medium">
                Location & Hours
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="leading-relaxed font-medium text-black">{address}</p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-black underline underline-offset-4 mt-1.5 text-xs font-normal"
                    >
                      <span>Open Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                </div>

                <div className="flex items-start gap-3 pt-2 text-neutral-500">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Monday – Saturday: 9:00 AM – 7:30 PM</span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Instagram className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-black font-medium"
                  >
                    @cozly_by_zoffaro.in
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-[4px] space-y-3">
              <h3 className="text-sm font-medium text-black">Immediate assistance</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                For rapid answers about current workshop models, live timber photos, or custom sizes, message us directly.
              </p>
              <a
                href={`https://wa.me/${cleanWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(
                  'Hello COZLY by Zoffaro IN! I would like to enquire about your sofas.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Form (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[4px] border border-neutral-200 space-y-6">
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-1">
                Direct Message
              </span>
              <h2 className="text-lg font-medium text-black">
                Send an enquiry to our craftsmen
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    City / Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ernakulam / 682001"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Which model or dimensions are you interested in?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-black hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
