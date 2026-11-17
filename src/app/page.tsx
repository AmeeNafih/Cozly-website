import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryTiles from '@/components/home/CategoryTiles';
import FeaturedSofas from '@/components/home/FeaturedSofas';
import WhyCozly from '@/components/home/WhyCozly';
import CustomizerTeaser from '@/components/home/CustomizerTeaser';
import DeliveryCoverage from '@/components/home/DeliveryCoverage';
import { getProducts, getCategories, getSiteSettings } from '@/lib/data-store';

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [products, categories, settings] = await Promise.all([
    getProducts({ publishedOnly: true }),
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <div className="bg-white">
      {/* 1. Hero: One full-width lifestyle photo, max 6-word title, 1 subline, 2 buttons */}
      <HeroSlider
        slides={settings.heroContent?.slides}
        headline={settings.heroContent?.headline}
        subheadline={settings.heroContent?.subheadline}
      />

      {/* 2. Shop by category: 5 large image tiles, title only */}
      <CategoryTiles categories={categories} />

      {/* 3. Featured sofas: 4 products in a clean 4:5 grid, 'View all' text link */}
      <FeaturedSofas
        products={products}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* 4. One brand story block: Workshop photo + 2-3 short sentences + 'Visit our workshop' link */}
      <WhyCozly
        headline={settings.heroContent?.storyHeadline}
        description={settings.heroContent?.storyText}
        imageUrl={settings.heroContent?.storyImage || '/images/real/cozly-photo-13.jpg'}
      />

      {/* 5. Customize teaser: One clean split section (photo left, short text + button right) */}
      <CustomizerTeaser />

      {/* 6. Delivery and contact strip: All-India delivery coverage + WhatsApp button */}
      <DeliveryCoverage whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
