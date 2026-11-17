'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does WhatsApp ordering work on cozly.in?',
      a: 'Browse our catalogue or customize your sofa, configure your fabric and wood finishes, and add items to your cart. When you click "Place Order on WhatsApp", a pre-formatted message with your complete itemized specifications, dimensions, and delivery city is sent directly to our workshop manager. We confirm timber availability, answer any questions, and send you production updates.',
    },
    {
      q: 'Why is there no online credit card or payment gateway?',
      a: 'High-end furniture is a significant personal investment. We believe in personal transparency. Speaking directly with our craftsmen ensures you can double-check living room measurements, request physical fabric swatches via courier, and review live workshop photos of the timber before making payment.',
    },
    {
      q: 'Which states and cities do you deliver to?',
      a: 'We provide direct white-glove delivery across Kerala (all districts), Karnataka (Bangalore, Mysore, Mangalore), and Tamil Nadu (Chennai, Coimbatore, Madurai, Salem). Delivery includes bringing the furniture into your home, assembling legs, and removing packing debris. For other Indian states, we arrange specialized third-party freight with multi-layer wooden crating.',
    },
    {
      q: 'What kind of wood do you use for your frames?',
      a: 'We use 100% solid ethically harvested Kerala Teakwood, seasoned in vacuum kilns to reduce moisture content below 10%. This prevents warping, cracking, or termite infestation for generations. We back our solid timber frames with a comprehensive 5 to 15-year structural warranty.',
    },
    {
      q: 'Can I customize dimensions to fit my apartment lift or narrow doorway?',
      a: 'Yes, absolutely. Because we are the actual manufacturer in Erattupetta, we can adjust lengths, depths, and backrest heights to ensure smooth transit through narrow apartment hallways and elevators. Just mention your elevator dimensions on WhatsApp.',
    },
    {
      q: 'What are your delivery timelines?',
      a: 'In-stock models are dispatched within 5 to 8 business days. Made-to-order and custom-configured pieces typically take 10 to 14 business days from order confirmation to door delivery.',
    },
    {
      q: 'Can I visit your factory in Erattupetta?',
      a: 'Yes! We encourage clients to visit our workshop at Main Road, Erattupetta, Kottayam District. You can see raw timber seasoning, watch craftsmen hand-carve joinery, and test different foam densities in person.',
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Got Questions?
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto">
            Everything you need to know about our Kerala teakwood frames, WhatsApp ordering, custom dimensions, and white-glove South India delivery.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-cozly bg-white border border-brand-border overflow-hidden shadow-soft transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-brand-primary hover:text-brand-accent transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-accent shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed border-t border-brand-border/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-12 p-8 rounded-cozly bg-brand-primary text-white text-center space-y-4 shadow-elevated">
          <h3 className="font-serif font-bold text-xl text-white">Have a question not listed here?</h3>
          <p className="text-xs text-brand-surface/75 max-w-md mx-auto">
            Chat directly with our Erattupetta workshop craftsmen. We respond within a few minutes.
          </p>
          <a
            href="https://wa.me/919846581241?text=Hello%20COZLY!%20I%20have%20a%20question%20about%20ordering%20a%20sofa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-cozly text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
