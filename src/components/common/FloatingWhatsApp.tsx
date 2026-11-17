'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cleanWhatsAppNumber } from '@/lib/formatters';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export default function FloatingWhatsApp({ whatsappNumber = '+919846581241' }: FloatingWhatsAppProps) {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const cleanNumber = cleanWhatsAppNumber(whatsappNumber);

  const defaultMessage = encodeURIComponent(
    'Hello COZLY! 👋 I have a question regarding your sofa collection, custom dimensions, and delivery.'
  );

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 flex items-end gap-3 group">
      {/* Tooltip speech bubble */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-elevated border border-brand-border text-xs font-medium text-brand-charcoal">
          <span>Direct chat with our factory craftsmen</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${cleanNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with COZLY on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-[#25D366] relative z-10" />
      </a>
    </div>
  );
}
