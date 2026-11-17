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
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 group">
      {/* Tooltip speech bubble */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-elevated border border-brand-border animate-bounce text-xs font-medium text-brand-charcoal">
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
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-modal hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500 relative z-10" />
      </a>
    </div>
  );
}
