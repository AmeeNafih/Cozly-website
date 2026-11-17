'use client';

import React from 'react';
import Link from 'next/link';

interface AnnouncementBarProps {
  text?: string;
  link?: string;
}

export default function AnnouncementBar({
  text = 'Factory-direct sofas, delivered across Kerala, Tamil Nadu and Bangalore.',
  link = '/collection',
}: AnnouncementBarProps) {
  if (!text) return null;

  return (
    <div className="bg-[#111111] text-neutral-300 text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        {link ? (
          <Link
            href={link}
            className="tracking-wide hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            {text}
          </Link>
        ) : (
          <span className="tracking-wide">{text}</span>
        )}
      </div>
    </div>
  );
}
