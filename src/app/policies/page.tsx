import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Policies & Warranty | COZLY by Zoffaro IN',
  description:
    'Read our manufacturer warranty terms, white-glove South India delivery policies, inspection on delivery, and privacy standards.',
};

export default function PoliciesPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Customer Assurance
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
            Warranty, Delivery & Policies
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-600">
            Last updated: November 2026 • COZLY by Zoffaro IN Workshop, Erattupetta, Kottayam, Kerala
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Warranty Policy */}
        <section className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-4">
          <div className="flex items-center gap-3 border-b border-brand-border pb-4">
            <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-black">
                1. Structural Timber Frame Warranty (5 to 15 Years)
              </h2>
              <p className="text-xs text-brand-charcoal-500">Applies to all solid Kerala Teak and hardwood frames</p>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed space-y-3">
            <p>
              COZLY by Zoffaro IN warrants all solid wood carcasses and internal frames against insect infestation (borers and termites), structural joint loosements, and wood warping under normal domestic usage.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Solid Kerala Teak Models:</strong> 10 to 15 Years frame warranty.</li>
              <li><strong>Engineered & Hardwood Carcasses:</strong> 5 to 7 Years frame warranty.</li>
              <li><strong>Foam & Cushion Cores:</strong> 3 Years warranty against sagging greater than 25mm.</li>
              <li><strong>Hydraulic & Reclining Hardware:</strong> 3 Years warranty on lift gas springs and linkage mechanisms.</li>
            </ul>
          </div>
        </section>

        {/* 2. Shipping & White-Glove Delivery */}
        <section className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-4">
          <div className="flex items-center gap-3 border-b border-brand-border pb-4">
            <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black">
              <Truck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-black">
                2. Shipping & Delivery Terms
              </h2>
              <p className="text-xs text-brand-charcoal-500">Kerala, Karnataka (Bangalore), Tamil Nadu & All-India</p>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed space-y-3">
            <p>
              Deliveries within Kerala, Bangalore, and Tamil Nadu are conducted using our dedicated factory transport fleet or specialized line-haul carriers. All items are blanket-wrapped and encased in corrugated heavy cartons.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Our team carries the sofa into your designated room, unboxes, and installs legs/feet.</li>
              <li>Customers must ensure adequate clearance in stairwells, doorways, and apartment elevators.</li>
              <li>Transit insurance is included on all factory shipments with 100% damage protection.</li>
            </ul>
          </div>
        </section>

        {/* 3. Inspection & Returns */}
        <section className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-4">
          <div className="flex items-center gap-3 border-b border-brand-border pb-4">
            <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black">
              <RotateCcw className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-black">
                3. On-Delivery Inspection & Returns
              </h2>
              <p className="text-xs text-brand-charcoal-500">Peace of mind guarantee upon delivery</p>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed space-y-3">
            <p>
              We mandate an on-the-spot inspection upon delivery. You are invited to sit on the sofa, check fabric stitching, and review timber finish while our delivery team is present.
            </p>
            <p>
              In the unlikely event of any transit damage or dimensional defect, we will repair or replace the piece promptly without any extra transportation charges.
            </p>
          </div>
        </section>

        {/* 4. Privacy & Data Handling */}
        <section className="bg-white p-6 sm:p-8 rounded-cozly border border-brand-border shadow-soft space-y-4">
          <div className="flex items-center gap-3 border-b border-brand-border pb-4">
            <div className="p-2.5 rounded-lg bg-brand-grey-100 border border-brand-border text-black">
              <Lock className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-black">
                4. Privacy & Personal Information
              </h2>
              <p className="text-xs text-brand-charcoal-500">Zero spam, zero third-party data selling</p>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed space-y-2">
            <p>
              Customer names, phone numbers, and delivery addresses entered on cozly.in are utilized solely for generating your WhatsApp order and coordinating delivery logistics. We never sell or share customer data with third-party advertisers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
