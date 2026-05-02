'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Toggle } from './ui/Toggle';
import { Button } from './ui/Button';

export type ProductFormType = 'Digital' | 'Físico';

export interface ProductFormValues {
  title: string;
  price: string;
  type: ProductFormType;
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
  type: 'Digital',
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
}: ProductFormModalProps) {
  const [values, setValues] = React.useState<ProductFormValues>({
    ...DEFAULT_VALUES,
    ...initialValues,
  });

  // Reset when opened with new values
  React.useEffect(() => {
    if (isOpen) setValues({ ...DEFAULT_VALUES, ...initialValues });
  }, [isOpen, initialValues]);

  const set = (key: keyof ProductFormValues, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSave = () => {
    onSave(values);
    onClose();
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
          {/* Type toggle */}
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
