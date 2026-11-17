'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does WhatsApp ordering work on cozly.in?',
      a: 'Browse our collection or configure custom measurements, select your fabric and finish, and add items to your cart. Clicking "Send order on WhatsApp" opens a pre-formatted message with your full configuration and delivery city directly to our workshop manager. We confirm timber availability, discuss any adjustments, and guide you through delivery.',
    },
    {
      q: 'Why is there no online payment gateway?',
      a: 'A sofa is an important piece for your home. Speaking directly with our craftsmen ensures you can confirm measurements, request physical fabric swatches, and review live workshop photos of the frame before finalizing payment.',
    },
    {
      q: 'Which states and cities do you deliver to?',
      a: 'We deliver directly across Kerala, Karnataka (Bangalore and surrounding cities), and Tamil Nadu. Delivery includes bringing the sofa into your room and checking the setup.',
    },
    {
      q: 'What wood do you use for your frames?',
      a: 'We use solid seasoned Kerala Teakwood and internal hardwoods assembled with mortise-and-tenon joinery. We do not use particle board or hollow cardboard cores.',
    },
    {
      q: 'Can I customize dimensions to fit my apartment lift or narrow hallway?',
      a: 'Yes. Because each piece is manufactured in our Erattupetta workshop, we can customize total lengths, depths, and backrest heights to fit your doorways and elevators.',
    },
    {
      q: 'What are your delivery timelines?',
      a: 'In-stock pieces are dispatched within 5 to 8 days. Made-to-order and custom pieces typically take 10 to 14 days from order confirmation to your doorstep.',
    },
    {
      q: 'Can I visit the workshop in Erattupetta?',
      a: 'Yes. Clients are welcome to visit our workshop at Main Road, Erattupetta, Kottayam to see timber frames, inspect joinery, and test fabric textures in person.',
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Information
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-black tracking-[-0.02em]">
            Frequently asked questions
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            Key details about our solid timber frames, WhatsApp ordering, custom sizing, and direct factory delivery.
          </p>
        </div>

        {/* Accordions */}
        <div className="divide-y divide-neutral-200 border-b border-neutral-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-medium text-sm sm:text-base text-black"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed max-w-prose">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-8 text-center text-xs text-neutral-500 space-y-2">
          <p>Have a question not listed here?</p>
          <Link
            href="/contact"
            className="text-black font-medium underline underline-offset-4 inline-block"
          >
            Contact our workshop directly
          </Link>
        </div>
      </div>
    </div>
  );
}
