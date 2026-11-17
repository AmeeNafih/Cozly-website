import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts, getCategories, getSiteSettings } from '@/lib/data-store';
import CollectionCatalogue from '@/components/product/CollectionCatalogue';

export const metadata: Metadata = {
  title: 'Sofa Collection | Solid Teak & Upholstered Designs',
  description:
    'Browse our handcrafted sofa catalogue: 3-seaters, modular L-shapes, recliners, and hydraulic sofa-cum-beds with All-India factory-direct delivery.',
};

export const revalidate = 60;

export default async function CollectionPage() {
  const [products, categories, settings] = await Promise.all([
    getProducts({ publishedOnly: true }),
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-sm text-brand-muted">Loading catalogue...</div>}>
      <CollectionCatalogue
        initialProducts={products}
        categories={categories}
        whatsappNumber={settings.whatsappNumber}
      />
    </Suspense>
  );
}
