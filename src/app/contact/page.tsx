'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { cleanWhatsAppNumber } from '@/lib/formatters';

export default function ContactPage() {
  const whatsappNumber = '+919846581241';
  const phone = '+919846581241';
  const email = 'sales@cozly.in';
  const address = 'Cozly Sofa Works, Main Road, Erattupetta, Kottayam District, Kerala 686122, India';

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
    let text = `🛋️ *WEBSITE INQUIRY (COZLY.IN)*\n`;
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
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary">
            Visit Our Atelier or Chat Online
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            We welcome customers to visit our Erattupetta timber workshop to inspect raw wood seasoning, touch fabric swatches, and meet our carpenters in person.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-6">
              <h3 className="font-serif font-bold text-xl text-brand-primary">
                Factory & Atelier Details
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border text-brand-accent shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary">Factory Location</h4>
                    <p className="text-brand-muted mt-0.5 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border text-brand-accent shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary">Phone & Orders</h4>
                    <p className="text-brand-muted mt-0.5">
                      <a href={`tel:${phone}`} className="hover:text-brand-primary">{phone}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border text-brand-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary">Email Support</h4>
                    <p className="text-brand-muted mt-0.5">
                      <a href={`mailto:${email}`} className="hover:text-brand-primary">{email}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border text-brand-accent shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary">Working Hours</h4>
                    <p className="text-brand-muted mt-0.5">Monday – Saturday: 9:00 AM – 7:30 PM (IST)</p>
                    <p className="text-[10px] text-brand-muted">Sundays by appointment for custom consultation</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border">
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(
                    'Hello COZLY! I would like to schedule a visit to your Erattupetta workshop.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-cozly flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Delivery Promise Card */}
            <div className="p-6 rounded-cozly bg-brand-primary text-white space-y-2">
              <h4 className="font-serif font-bold text-base text-brand-accent">
                South India Delivery Fleet
              </h4>
              <p className="text-xs text-brand-surface/75 leading-relaxed">
                Direct factory delivery across all districts in Kerala, Tamil Nadu, and Bangalore. Each item is pre-assembled, inspected, and carried into your apartment or bungalow by our staff.
              </p>
            </div>
          </div>

          {/* Form and Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-4">
              <h3 className="font-serif font-bold text-xl text-brand-primary">
                Send a Message to the Workshop
              </h3>
              <p className="text-xs text-brand-muted">
                Fill in your details below and our team will get back to you via WhatsApp or phone within a few hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-cozly bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-sm">Thank You for Reaching Out!</h4>
                  <p className="text-xs text-emerald-800">
                    Your inquiry has been sent to our WhatsApp order desk. Our team will review your message immediately.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Menon"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98465 12345"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kottayam / Bangalore / Kochi"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
                      How can we help? (Sofa model, custom size, or workshop visit) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what you're looking for..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-brand-primary hover:bg-brand-primary-light text-white font-semibold text-xs tracking-wider uppercase rounded-cozly flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Send className="w-4 h-4 text-brand-accent" />
                    <span>Send Inquiry to WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map Embed Container */}
            <div className="rounded-cozly overflow-hidden border border-brand-border shadow-soft h-64 bg-brand-surface relative">
              <iframe
                title="COZLY Workshop Erattupetta Location"
                src="https://maps.google.com/maps?q=Erattupetta,+Kottayam,+Kerala,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
