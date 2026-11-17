import React from 'react';
import { Metadata } from 'next';
import SofaCustomizer from '@/components/customizer/SofaCustomizer';
import { getSiteSettings } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'Customize Your Sofa | Step-by-Step Configurator',
  description:
    'Design your dream sofa in 7 simple steps: choose your silhouette, solid teak wood frame, Belgian linens or Italian velvets, cushion firmness, and leg finishes. Order directly on WhatsApp.',
};

export const revalidate = 60;

export default async function CustomizePage() {
  const settings = await getSiteSettings();

  return <SofaCustomizer whatsappNumber={settings.whatsappNumber} />;
}
