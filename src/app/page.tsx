import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryTiles from '@/components/home/CategoryTiles';
import FeaturedSofas from '@/components/home/FeaturedSofas';
import WhyCozly from '@/components/home/WhyCozly';
import DeliveryCoverage from '@/components/home/DeliveryCoverage';
import CustomizerTeaser from '@/components/home/CustomizerTeaser';
import CustomerReviews from '@/components/home/CustomerReviews';
import LivingRoomGallery from '@/components/home/LivingRoomGallery';
import { getProducts, getCategories, getSiteSettings, getReviews } from '@/lib/data-store';

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [products, categories, settings, reviews] = await Promise.all([
    getProducts({ publishedOnly: true }),
    getCategories(),
    getSiteSettings(),
    getReviews(),
  ]);

  return (
    <div>
      {/* 1. Hero Section (Controlled from Admin) */}
      <HeroSlider slides={settings.heroContent?.slides} />

      {/* 2. Category Tiles */}
      <CategoryTiles categories={categories} />

      {/* 3. Featured Sofas */}
      <FeaturedSofas
        products={products}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* 4. Why COZLY Craftsmanship */}
      <WhyCozly points={settings.whyCozly} />

      {/* 5. Customizer Teaser */}
      <CustomizerTeaser />

      {/* 6. Delivery Coverage (Kerala, Tamil Nadu, Karnataka / Bangalore) */}
      <DeliveryCoverage whatsappNumber={settings.whatsappNumber} />

      {/* 7. Customer Reviews */}
      <CustomerReviews reviews={reviews} />

      {/* 8. Workshop & Living Room Photo Gallery */}
      <LivingRoomGallery />
    </div>
  );
}
