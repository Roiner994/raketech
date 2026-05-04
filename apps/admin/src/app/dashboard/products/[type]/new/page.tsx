'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProductEditorPage } from '@/components/ProductEditorPage';

export default function NewProductPage() {
  const params = useParams();
  const router = useRouter();
  const productType = params.type as string;

  useEffect(() => {
    if (productType !== 'digital' && productType !== 'physical') {
      router.replace('/dashboard/digital');
    }
  }, [productType, router]);

  if (productType !== 'digital' && productType !== 'physical') {
    return null;
  }

  return <ProductEditorPage productType={productType} />;
}
