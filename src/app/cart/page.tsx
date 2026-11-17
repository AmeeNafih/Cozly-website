import React from 'react';
import { Metadata } from 'next';
import FullCartView from '@/components/cart/FullCartView';
import { getSiteSettings } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'Your Cart | Direct WhatsApp Ordering',
  description:
    'Review your selected handcrafted sofas and custom configurations. One-click WhatsApp ordering directly to our Erattupetta workshop.',
};

export default async function CartPage() {
  const settings = await getSiteSettings();

  return <FullCartView whatsappNumber={settings.whatsappNumber} />;
}
