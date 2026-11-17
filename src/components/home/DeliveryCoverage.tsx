'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface DeliveryCoverageProps {
  whatsappNumber?: string;
}

export default function DeliveryCoverage({ whatsappNumber = '+919846581241' }: DeliveryCoverageProps) {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');

  const regions = [
    {
      name: 'Kerala',
      time: '5–10 days',
      details: 'All districts delivered direct from our Erattupetta workshop.',
    },
    {
      name: 'Karnataka (Bangalore)',
      time: '7–12 days',
      details: 'Regular routes to Bangalore metropolitan area and Mysore.',
    },
    {
      name: 'Tamil Nadu',
      time: '7–12 days',
      details: 'Coimbatore, Chennai, Madurai, Salem and surrounding regions.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Coverage
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-[-0.015em]">
              Direct factory delivery
            </h2>
          </div>

          <div>
            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                'Hello COZLY by Zoffaro IN! I would like to check delivery timelines and rates for my city.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Three Short Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-4 border-t border-neutral-200">
          {regions.map((region) => (
            <div key={region.name} className="space-y-2">
              <h3 className="text-base font-medium text-black">
                {region.name}
              </h3>
              <p className="text-sm font-semibold text-black tracking-tight">
                {region.time}
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {region.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
