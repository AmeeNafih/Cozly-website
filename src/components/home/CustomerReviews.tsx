'use client';

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { Review } from '@/types';

interface CustomerReviewsProps {
  reviews: Review[];
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="py-20 sm:py-28 bg-brand-grey-50 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Real Kerala & Bangalore Homes
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
            Loved by Over 800+ Families
          </h2>
          <p className="text-sm sm:text-base text-brand-charcoal-600 leading-relaxed">
            Read what homeowners have to say about our solid wood durability, ergonomic comfort, and personal WhatsApp service.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-cozly bg-white border border-brand-border shadow-soft flex flex-col justify-between hover:border-black/20 hover:shadow-md transition-all duration-300 relative"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'text-brand-kraft fill-brand-kraft' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-brand-charcoal-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-brand-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-black">
                      {rev.customerName}
                    </h4>
                    <p className="text-[11px] text-brand-charcoal-500">{rev.location}</p>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-black bg-brand-grey-100 px-2 py-0.5 rounded-full font-medium border border-brand-border">
                      <CheckCircle className="w-3 h-3 text-black stroke-[1.5]" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-brand-charcoal-700 font-semibold mt-1">
                  Model: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
