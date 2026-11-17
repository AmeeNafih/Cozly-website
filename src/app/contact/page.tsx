'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Instagram, ExternalLink } from 'lucide-react';
import { cleanWhatsAppNumber } from '@/lib/formatters';

export default function ContactPage() {
  const whatsappNumber = '+919846581241';
  const phone = '+919846581241';
  const email = 'sales@cozly.in';
  const address = 'Zoffaro Furniture / COZLY Atelier, Main Road, Erattupetta, Kottayam District, Kerala 686122, India';
  const googleMapsUrl = 'https://maps.app.goo.gl/XbcbCJcaut3oDnjx8';
  const instagramUrl = 'https://www.instagram.com/cozly_by_zoffaro.in';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = cleanWhatsAppNumber(whatsappNumber);
    let text = `🛋️ *WEBSITE INQUIRY (COZLY by Zoffaro IN)*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `• *Name:* ${form.name}\n`;
    text += `• *Phone:* ${form.phone}\n`;
    text += `• *City:* ${form.city}\n`;
    text += `• *Message:* ${form.message}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
            Visit Our Atelier or Chat Online
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed">
            We welcome customers to visit our Erattupetta timber workshop to inspect raw wood seasoning, touch fabric swatches, and meet our carpenters in person.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-6">
              <h3 className="font-bold text-xl text-black">
                Factory & Atelier Details
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black shrink-0">
                    <MapPin className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-black">Factory & Atelier</h4>
                    <p className="text-brand-charcoal-600 mt-0.5 leading-relaxed">{address}</p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-kraft hover:text-black font-bold text-xs mt-2 transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black shrink-0">
                    <Instagram className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Official Instagram</h4>
                    <p className="text-brand-charcoal-600 mt-0.5">Follow our new sofa drops and workshop reels</p>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-kraft hover:text-black font-bold text-xs mt-1 transition-colors"
                    >
                      <span>@cozly_by_zoffaro.in</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black shrink-0">
                    <Phone className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Phone & Orders</h4>
                    <p className="text-brand-charcoal-600 mt-0.5">
                      <a href={`tel:${phone}`} className="hover:text-black font-semibold">{phone}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black shrink-0">
                    <Mail className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Email Support</h4>
                    <p className="text-brand-charcoal-600 mt-0.5">
                      <a href={`mailto:${email}`} className="hover:text-black font-semibold">{email}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black shrink-0">
                    <Clock className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Working Hours</h4>
                    <p className="text-brand-charcoal-600 mt-0.5">Monday – Saturday: 9:00 AM – 7:30 PM (IST)</p>
                    <p className="text-[10px] text-brand-charcoal-500">Sundays by appointment for custom consultation</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border">
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(
                    'Hello COZLY by Zoffaro IN! I would like to schedule a visit to your Erattupetta workshop.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-brand-whatsapp hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Delivery Promise Card */}
            <div className="p-6 rounded-cozly bg-black text-white space-y-2">
              <h4 className="font-bold text-base text-brand-kraft">
                South India Delivery Fleet
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Direct factory delivery across all districts in Kerala, Tamil Nadu, and Bangalore. Each item is pre-assembled, inspected, and carried into your apartment or bungalow by our staff.
              </p>
            </div>
          </div>

          {/* Form and Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-4">
              <h3 className="font-bold text-xl text-black">
                Send a Message to the Workshop
              </h3>
              <p className="text-xs text-brand-charcoal-600">
                Fill in your details below and our team will get back to you via WhatsApp or phone within a few hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-cozly bg-brand-grey-100 border border-brand-border text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-black mx-auto stroke-[1.5]" />
                  <h4 className="font-bold text-black text-sm">Thank You for Reaching Out!</h4>
                  <p className="text-xs text-brand-charcoal-700">
                    Your inquiry has been sent to our WhatsApp order desk. Our team will review your message immediately.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Menon"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98465 12345"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kottayam / Bangalore / Kochi"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1">
                      How can we help? (Sofa model, custom size, or workshop visit) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what you're looking for..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-black hover:bg-brand-charcoal-800 text-white font-bold text-xs uppercase tracking-wider rounded-cozly flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map Embed Container */}
            <div className="rounded-cozly overflow-hidden border border-brand-border shadow-soft h-72 bg-brand-surface relative group">
              <iframe
                title="Zoffaro Furniture / COZLY Atelier Erattupetta Location"
                src="https://maps.google.com/maps?q=9.6808537,76.7796198&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 right-3 z-10">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-bold shadow-lg hover:bg-brand-charcoal-800 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-kraft" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
