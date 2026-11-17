import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, getSiteSettings } from '@/lib/data-store';
import ProductDetailView from '@/components/product/ProductDetailView';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found | COZLY',
    };
  }

  const coverImage = product.images.find((i) => i.isCover)?.url || product.images[0]?.url || '/images/products/malabar-teak.svg';

  return {
    title: product.seoTitle || `${product.name} | Handcrafted in Kerala`,
    description: product.seoDescription || product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: coverImage, alt: product.name }],
      type: 'article',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const [product, allProducts, settings] = await Promise.all([
    getProductBySlug(params.slug),
    getProducts({ publishedOnly: true }),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category);

  // Schema.org Product Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => img.url),
    brand: {
      '@type': 'Brand',
      name: 'COZLY',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability:
        product.stockStatus === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'COZLY Sofa Atelier',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Erattupetta',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView
        product={product}
        relatedProducts={related.length > 0 ? related : allProducts.filter((p) => p.id !== product.id)}
        whatsappNumber={settings.whatsappNumber}
      />
    </>
  );
}
