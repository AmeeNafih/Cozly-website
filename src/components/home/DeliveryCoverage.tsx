'use client';

import React, { useState } from 'react';
import { Truck, CheckCircle2, MapPin, Search, AlertCircle, PhoneCall, Shield, ExternalLink } from 'lucide-react';
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
    <section id="delivery" className="py-20 sm:py-28 bg-brand-grey-50 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>3-State Coverage Zone</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
            White-Glove Delivery Across South India
          </h2>
          <p className="text-sm sm:text-base text-brand-charcoal-600 leading-relaxed">
            From our atelier in Erattupetta, Kottayam directly to your living room. Every sofa is inspected, blanket-wrapped, and handled by trained furniture specialists.
          </p>

          {/* Instant Pincode Checker */}
          <form onSubmit={handleCheck} className="pt-4 max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-brand-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter your 6-digit Pincode (e.g. 560001, 686122)..."
                value={testPincode}
                onChange={(e) => setTestPincode(e.target.value)}
                maxLength={6}
                className="w-full pl-9 pr-3 py-3 text-xs bg-white border border-brand-border rounded-cozly focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Check</span>
            </button>
          </form>

          {testResult && (
            <div
              className={`p-3.5 rounded-cozly text-xs max-w-md mx-auto flex items-start gap-2.5 transition-all ${
                testResult.isCovered
                  ? 'bg-white text-black border border-black shadow-sm'
                  : 'bg-brand-grey-100 text-brand-charcoal-800 border border-brand-border'
              }`}
            >
              {testResult.isCovered ? (
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-brand-charcoal-700 shrink-0 mt-0.5" />
              )}
              <div className="text-left">
                <p className="font-bold">{testResult.isCovered ? 'Direct Delivery Zone Confirmed!' : 'Outside Primary Zone'}</p>
                <p className="text-[11px] text-brand-charcoal-600 mt-0.5">{testResult.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* 3 Zone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-cozly bg-white border border-brand-border shadow-soft flex flex-col justify-between hover:border-black/30 hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-brand-grey-100 text-black text-[10px] font-bold uppercase tracking-wider border border-brand-border">
                    {zone.badge}
                  </span>
                  <span className="text-xs font-semibold text-brand-charcoal-700">
                    {zone.time}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-black">
                    {zone.state}
                  </h3>
                  <p className="text-xs text-brand-charcoal-600 mt-1 leading-relaxed">
                    {zone.desc}
                  </p>
                </div>

                <div className="p-3 bg-brand-grey-50 rounded-lg border border-brand-border text-[11px] text-brand-charcoal-700 space-y-1">
                  <span className="font-bold block text-black">Key Service Hubs:</span>
                  <p>{zone.cities}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between text-xs text-brand-charcoal-600">
                <span className="flex items-center gap-1.5 font-medium text-black">
                  <Shield className="w-3.5 h-3.5 stroke-[1.5]" />
                  Transit Insured
                </span>
                <span className="font-medium text-black">Assembly Included</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Map Direction Strip */}
        <div className="mt-12 bg-white rounded-cozly p-6 sm:p-8 border border-brand-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-grey-100 border border-brand-border text-black shrink-0">
              <MapPin className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-kraft block">
                Direct Workshop Visit
              </span>
              <h4 className="font-bold text-lg text-black">
                Zoffaro Furniture & COZLY Atelier, Erattupetta
              </h4>
              <p className="text-xs text-brand-charcoal-600 max-w-xl">
                Inspect raw timber logs, choose custom fabric rolls in person, and sit on our trial cushions before you order.
              </p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/XbcbCJcaut3oDnjx8"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly transition-all shadow-sm flex items-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-kraft" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
