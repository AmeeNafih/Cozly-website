import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/data-store';
import ProductFormEditor from '@/components/admin/ProductFormEditor';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductFormEditor initialProduct={product} isNew={false} />;
}
