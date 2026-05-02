'use client';

import React from 'react';
import { X, ImagePlus, Loader2 } from 'lucide-react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Toggle } from './ui/Toggle';
import { Button } from './ui/Button';
import { RichTextEditor } from './ui/RichTextEditor';
import { storage } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export type ProductFormType = 'Digital' | 'Físico';

export interface ProductFormValues {
  title: string;
  price: string;
  description: string;
  category: string;
  imageUrl: string;
  type: ProductFormType;
  featuresHtml: string;
  // Digital
  platform: string;
  // Physical
  material: string;
  stock: string;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: ProductFormValues) => void;
  initialValues?: Partial<ProductFormValues>;
  title?: string;
  fixedType?: ProductFormType;
}

const PLATFORMS = [
  { value: 'PlayStation', label: 'PlayStation' },
  { value: 'Xbox', label: 'Xbox' },
  { value: 'PC / Steam', label: 'PC / Steam' },
  { value: 'Nintendo', label: 'Nintendo' },
];

const DEFAULT_VALUES: ProductFormValues = {
  title: '',
  price: '',
  description: '',
  category: '',
  imageUrl: '',
  type: 'Digital',
  featuresHtml: '',
  platform: 'PlayStation',
  material: '',
  stock: '',
};

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initialValues,
  title = 'Agregar Producto',
  fixedType,
}: ProductFormModalProps) {
  const [values, setValues] = React.useState<ProductFormValues>({
    ...DEFAULT_VALUES,
    type: fixedType ?? DEFAULT_VALUES.type,
    ...initialValues,
  });

  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  // Reset when opened with new values
  React.useEffect(() => {
    if (isOpen) {
      setValues({
        ...DEFAULT_VALUES,
        type: fixedType ?? DEFAULT_VALUES.type,
        ...initialValues,
      });
    }
  }, [isOpen, initialValues, fixedType]);

  const set = (key: keyof ProductFormValues, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSave = () => {
    onSave(values);
    onClose();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Upload error:", error);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          set('imageUrl', downloadURL);
          setIsUploading(false);
        }
      );
    } catch (error) {
      console.error("Error setting up upload:", error);
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Type toggle (hidden if fixedType is provided) */}
          {!fixedType && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Tipo de Producto
              </p>
              <Toggle
                options={['Digital', 'Físico']}
                value={values.type}
                onChange={(v) => set('type', v)}
              />
            </div>
          )}

          {/* Common fields */}
          <Input
            label="Título del Producto"
            placeholder="Ej. PS Plus Extra 12 meses..."
            value={values.title}
            onChange={(e) => set('title', e.target.value)}
          />
          <Input
            label="Precio (USD)"
            type="number"
            placeholder="0.00"
            value={values.price}
            onChange={(e) => set('price', e.target.value)}
          />
          <Input
            label="Categoría"
            placeholder="Ej. Suscripciones, Accesorios..."
            value={values.category}
            onChange={(e) => set('category', e.target.value)}
          />
          <Input
            label="Descripción Corta"
            placeholder="Breve descripción del producto..."
            value={values.description}
            onChange={(e) => set('description', e.target.value)}
          />
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Imagen del Producto
            </label>
            <div className="relative group overflow-hidden rounded-xl border-2 border-dashed border-slate-700 hover:border-primary/50 transition-colors bg-[#0B1120]">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
              />
              <div className="flex flex-col items-center justify-center p-6 text-center">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                    <span className="text-sm text-slate-400">Subiendo... {uploadProgress}%</span>
                  </div>
                ) : values.imageUrl ? (
                  <div className="w-full relative aspect-video rounded-lg overflow-hidden">
                    <img src={values.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Cambiar imagen</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImagePlus className="w-6 h-6 text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-300">Click o arrastrar imagen</span>
                    <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP (Max 5MB)</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <RichTextEditor
            label="Detalles y Características"
            value={values.featuresHtml}
            onChange={(html) => set('featuresHtml', html)}
          />

          {/* Conditional fields */}
          {values.type === 'Digital' ? (
            <Select
              label="Plataforma"
              options={PLATFORMS}
              value={values.platform}
              onChange={(v) => set('platform', v)}
            />
          ) : (
            <>
              <Input
                label="Material"
                placeholder="Ej. PLA+, Resina ABS..."
                value={values.material}
                onChange={(e) => set('material', e.target.value)}
              />
              <Input
                label="Stock Disponible"
                type="number"
                placeholder="10"
                value={values.stock}
                onChange={(e) => set('stock', e.target.value)}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-end gap-3 p-6 border-t border-slate-800 bg-[#0B1120]">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!values.title || !values.price}
          >
            Guardar Producto
          </Button>
        </div>
      </div>
    </div>
  );
}
