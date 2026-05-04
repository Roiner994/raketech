'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { collection, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import {
  ProductFormModal,
  ToastList,
  useToast,
  db,
} from '@raketech/ui';
import type { ProductFormValues, ProductFormType, TableProduct } from '@raketech/ui';
import { setFlashToast } from '@/lib/flashToast';

type ProductTypeSlug = 'digital' | 'physical';

interface ProductEditorPageProps {
  productType: ProductTypeSlug;
  productId?: string;
}

function slugToFixedType(productType: ProductTypeSlug): ProductFormType {
  return productType === 'digital' ? 'Digital' : 'Físico';
}

function slugToFirestoreType(productType: ProductTypeSlug): TableProduct['type'] {
  return productType;
}

function backHref(productType: ProductTypeSlug) {
  return productType === 'digital' ? '/dashboard/digital' : '/dashboard/physical';
}

function buildInitialValues(productType: ProductTypeSlug, data: Record<string, unknown>): Partial<ProductFormValues> {
  if (productType === 'digital') {
    return {
      title: typeof data.title === 'string' ? data.title : '',
      price: typeof data.price === 'number' ? String(data.price) : '',
      description: typeof data.description === 'string' ? data.description : '',
      category: typeof data.category === 'string' ? data.category : '',
      featured: data.featured === true,
      imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : '',
      gallery: Array.isArray(data.gallery) ? data.gallery.filter((item): item is string => typeof item === 'string') : [],
      platform: typeof data.platform === 'string' ? data.platform : 'PlayStation',
      featuresHtml: typeof data.featuresHtml === 'string' ? data.featuresHtml : '',
      type: 'Digital',
    };
  }

  return {
    title: typeof data.title === 'string' ? data.title : '',
    price: typeof data.price === 'number' ? String(data.price) : '',
    description: typeof data.description === 'string' ? data.description : '',
    category: typeof data.category === 'string' ? data.category : '',
    featured: data.featured === true,
    imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : '',
    gallery: Array.isArray(data.gallery) ? data.gallery.filter((item): item is string => typeof item === 'string') : [],
    material: typeof data.material === 'string' ? data.material : '',
    stock: typeof data.stock === 'number' ? String(data.stock) : '',
    featuresHtml: typeof data.featuresHtml === 'string' ? data.featuresHtml : '',
    type: 'Físico',
  };
}

export function ProductEditorPage({ productType, productId }: ProductEditorPageProps) {
  const router = useRouter();
  const toast = useToast();
  const { showToast } = toast;
  const [initialValues, setInitialValues] = React.useState<Partial<ProductFormValues> | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(Boolean(productId));
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    if (!productId) {
      return;
    }

    let active = true;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (!active) {
          return;
        }

        if (!docSnap.exists() || docSnap.data().type !== slugToFirestoreType(productType)) {
          setNotFound(true);
          setInitialValues(undefined);
          return;
        }

        setInitialValues(buildInitialValues(productType, docSnap.data()));
      } catch (error) {
        console.error('Error fetching product for editor:', error);
        if (active) {
          setNotFound(true);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      active = false;
    };
  }, [productId, productType]);

  const handleSave = async (values: ProductFormValues) => {
    try {
      const basePayload = {
        title: values.title,
        price: parseFloat(values.price),
        description: values.description,
        category: values.category,
        featured: values.featured,
        imageUrl: values.imageUrl,
        gallery: values.gallery || [],
        featuresHtml: values.featuresHtml,
      };

      if (productType === 'digital') {
        const payload = {
          ...basePayload,
          type: 'digital' as const,
          platform: values.platform,
          stock: null,
        };

        if (productId) {
          await updateDoc(doc(db, 'products', productId), payload);
          setFlashToast({
            message: 'Producto digital actualizado',
            variant: 'success',
          });
        } else {
          await addDoc(collection(db, 'products'), payload);
          setFlashToast({
            message: 'Producto digital agregado',
            description: values.title,
            variant: 'success',
          });
        }
      } else {
        const payload = {
          ...basePayload,
          type: 'physical' as const,
          material: values.material,
          stock: parseInt(values.stock) || 0,
        };

        if (productId) {
          await updateDoc(doc(db, 'products', productId), payload);
          setFlashToast({
            message: 'Producto físico actualizado',
            variant: 'success',
          });
        } else {
          await addDoc(collection(db, 'products'), payload);
          setFlashToast({
            message: 'Producto físico agregado',
            description: values.title,
            variant: 'success',
          });
        }
      }

    } catch (error) {
      console.error('Error saving product:', error);
      showToast('Error guardando el producto', { variant: 'error' });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-transparent">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-transparent px-6 text-center">
        <h1 className="text-3xl font-black text-white">Producto no encontrado</h1>
        <p className="max-w-md text-sm text-slate-400">
          El producto que intentas editar no existe o no coincide con esta categoría.
        </p>
        <button
          onClick={() => router.push(backHref(productType))}
          className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
        >
          Volver al listado
        </button>
        <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <ProductFormModal
        key={productId ?? `new-${productType}`}
        isOpen
        layout="page"
        onClose={() => router.push(backHref(productType))}
        onSave={handleSave}
        title={productId ? (productType === 'digital' ? 'Editar Producto Digital' : 'Editar Producto Físico') : (productType === 'digital' ? 'Nuevo Producto Digital' : 'Nuevo Producto Físico')}
        fixedType={slugToFixedType(productType)}
        initialValues={initialValues}
      />
      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </div>
  );
}
