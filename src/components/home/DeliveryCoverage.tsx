'use client';

import React, { useState } from 'react';
import { Truck, CheckCircle2, MapPin, Search, AlertCircle, PhoneCall, Shield } from 'lucide-react';
import { checkDeliveryCoverage } from '@/lib/formatters';

interface DeliveryCoverageProps {
  whatsappNumber?: string;
}

export default function DeliveryCoverage({ whatsappNumber = '+919846581241' }: DeliveryCoverageProps) {
  const [testPincode, setTestPincode] = useState('');
  const [testResult, setTestResult] = useState<{
    isCovered: boolean;
    stateDetected?: string;
    message: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPincode || testPincode.trim().length < 3) return;
    const res = checkDeliveryCoverage(testPincode);
    setTestResult(res);
  };

  const zones = [
    {
      state: 'Kerala',
      cities: 'Kochi, Kottayam, Trivandrum, Kozhikode, Thrissur, Pala, Kannur & all districts',
      time: '5 – 10 Business Days',
      badge: 'Direct Workshop Fleet',
      desc: 'Delivered directly using our dedicated factory transport vehicles with zero transit transfers.',
    },
    {
      state: 'Karnataka (Bangalore)',
      cities: 'Bangalore (Whitefield, Indiranagar, HSR, Koramangala), Mysore, Mangalore',
      time: '7 – 12 Business Days',
      badge: 'Dedicated Route',
      desc: 'Regular direct line to Bangalore apartments and villas with multi-layer bubble & corrugated casing.',
    },
    {
      state: 'Tamil Nadu',
      cities: 'Chennai, Coimbatore, Madurai, Salem, Tirupur, Trichy & surrounding zones',
      time: '7 – 12 Business Days',
      badge: 'Protected Line Haul',
      desc: 'Carefully handled cross-border freight with door-to-door delivery and unpacking.',
    },
  ];

  return (
    <section id="delivery" className="py-20 sm:py-28 bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/15 text-brand-accent text-xs font-bold uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5" />
            <span>3-State Coverage Zone</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary">
            White-Glove Delivery Across South India
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            From our factory in Erattupetta, Kottayam to your living room. Every sofa is inspected, blanket-wrapped, and handled by trained furniture specialists.
          </p>

          {/* Instant Pincode Checker */}
          <form onSubmit={handleCheck} className="pt-4 max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter your 6-digit Pincode (e.g. 560001, 686122)..."
                value={testPincode}
                onChange={(e) => setTestPincode(e.target.value)}
                maxLength={6}
                className="w-full pl-9 pr-3 py-3 text-xs bg-white border border-brand-border rounded-cozly focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-semibold rounded-cozly transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Check</span>
            </button>
          </form>

          {testResult && (
            <div
              className={`p-3.5 rounded-cozly text-xs max-w-md mx-auto flex items-start gap-2.5 transition-all ${
                testResult.isCovered
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {testResult.isCovered ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-left">
                <p className="font-semibold">{testResult.isCovered ? 'Direct Delivery Zone Confirmed!' : 'Outside Primary Zone'}</p>
                <p className="text-[11px] mt-0.5">{testResult.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* 3 Zone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-cozly bg-white border border-brand-border shadow-soft flex flex-col justify-between hover:border-brand-accent/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-brand-secondary text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                    {zone.badge}
                  </span>
                  <span className="text-xs font-medium text-brand-accent">
                    {zone.time}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-brand-primary">
                    {zone.state}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {zone.desc}
                  </p>
                </div>

                <div className="p-3 bg-brand-surface rounded-lg border border-brand-border/60 text-[11px] text-brand-charcoal/80 space-y-1">
                  <span className="font-semibold block text-brand-primary">Key Service Hubs:</span>
                  <p>{zone.cities}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  Transit Insured
                </span>
                <span>Assembly Included</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
