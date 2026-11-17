'use client';

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { Review } from '@/types';

interface CustomerReviewsProps {
  reviews: Review[];
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="py-20 sm:py-28 bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Real Kerala & Bangalore Homes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-primary">
            Loved by Over 800+ Families
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Read what homeowners have to say about our solid wood durability, foam comfort, and personal WhatsApp customer service.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-cozly bg-white border border-brand-border shadow-soft flex flex-col justify-between hover:shadow-elevated transition-shadow duration-300 relative"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-brand-charcoal/80 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-brand-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-brand-primary">
                      {rev.customerName}
                    </h4>
                    <p className="text-[11px] text-brand-muted">{rev.location}</p>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-brand-accent font-semibold mt-1">
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
