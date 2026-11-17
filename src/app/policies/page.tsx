import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Policies & Warranty | COZLY by Zoffaro IN',
  description:
    'Warranty terms, delivery policies, and care guidelines for COZLY by Zoffaro IN handcrafted sofas.',
};

export default function PoliciesPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Standards & Terms
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-black tracking-[-0.02em]">
            Warranty and policies
          </h1>
          <p className="text-sm text-neutral-600 mt-2">
            COZLY by Zoffaro IN • Erattupetta, Kottayam, Kerala
          </p>
        </div>

        <div className="space-y-12">
          {/* 1. Frame Warranty */}
          <section className="space-y-3">
            <h2 className="text-lg font-medium text-black">
              1. Structural Frame Warranty
            </h2>
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2">
              <p>
                COZLY by Zoffaro IN warrants all solid wood frames against structural joint loosening, wood warping, and insect infestation under regular domestic usage.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Solid Kerala Teak models include a frame warranty covering timber joinery.</li>
                <li>Cushion cores are warrantied against unnatural sagging greater than 25mm.</li>
                <li>Hydraulic gas lifts and recliner linkages are covered under manufacturer hardware warranty.</li>
              </ul>
            </div>
          </section>

          {/* 2. Direct Delivery */}
          <section className="space-y-3 pt-8 border-t border-neutral-200">
            <h2 className="text-lg font-medium text-black">
              2. Delivery & Handover
            </h2>
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2">
              <p>
                We deliver direct from our Erattupetta workshop across Kerala (5–10 days), Karnataka / Bangalore (7–12 days), and Tamil Nadu (7–12 days).
              </p>
              <p>
                Our delivery personnel bring the piece into your designated room, attach legs if shipped detached for transit security, and inspect the item with you upon delivery.
              </p>
            </div>
          </section>

          {/* 3. Inspection & Returns */}
          <section className="space-y-3 pt-8 border-t border-neutral-200">
            <h2 className="text-lg font-medium text-black">
              3. Inspection & Return Policy
            </h2>
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2">
              <p>
                We urge all customers to inspect the sofa upon arrival. If any transit scuff or fabric defect is found, it will be rectified immediately by our workshop or replaced at zero extra charge.
              </p>
              <p>
                Custom-dimensioned pieces made to specific non-standard measurements are produced to customer order and cannot be returned for change of mind once production has started.
              </p>
            </div>
          </section>

          {/* 4. Privacy & Personal Communication */}
          <section className="space-y-3 pt-8 border-t border-neutral-200">
            <h2 className="text-lg font-medium text-black">
              4. Privacy & Contact Information
            </h2>
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2">
              <p>
                Your phone number, delivery address, and configuration details are used solely to coordinate your sofa build and delivery via WhatsApp. We never share or sell contact information to any third-party marketing agency.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
