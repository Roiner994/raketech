'use client';

import React, { useState } from 'react';
import { Search, Edit, Trash2, Gamepad2, Printer, ChevronUp, ChevronDown, Star } from 'lucide-react';
import { Badge } from './ui/Badge';

export interface TableProduct {
  id: string;
  title: string;
  price: number;
  stock: number | null; // null = digital (infinite)
  type: 'digital' | 'physical';
  platform?: string;
  material?: string;
  imageUrl?: string;
  gallery?: string[];
  description?: string;
  category?: string;
  featuresHtml?: string;
  featured?: boolean;
}

interface DataTableProps {
  products: TableProduct[];
  onEdit?: (product: TableProduct) => void;
  onDelete?: (id: string) => void;
  onToggleFeatured?: (product: TableProduct) => void;
}

type SortKey = 'title' | 'price' | 'stock';
type SortDir = 'asc' | 'desc';

function SortIcon({ activeKey, activeDirection, col }: { activeKey: SortKey; activeDirection: SortDir; col: SortKey }) {
  if (activeKey !== col) {
    return <ChevronUp className="w-3 h-3 text-slate-700" />;
  }

  return activeDirection === 'asc'
    ? <ChevronUp className="w-3 h-3 text-[#3B82F6]" />
    : <ChevronDown className="w-3 h-3 text-[#3B82F6]" />;
}

export function DataTable({ products, onEdit, onDelete, onToggleFeatured }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let aVal: string | number = a[sortKey] ?? '';
      let bVal: string | number = b[sortKey] ?? '';
      if (sortKey === 'stock') { aVal = a.stock ?? Infinity; bVal = b.stock ?? Infinity; }
      const dir = sortDir === 'asc' ? 1 : -1;
      return aVal < bVal ? -dir : aVal > bVal ? dir : 0;
    });

  return (
    <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
      {/* Search */}
      <div className="p-4 border-b border-slate-800">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1120] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-800/40 text-slate-400">
              <th className="px-6 py-3.5 font-medium w-10">
                <span className="sr-only">Imagen</span>
              </th>
              <th
                className="px-4 py-3.5 font-medium cursor-pointer hover:text-slate-200 transition-colors select-none"
                onClick={() => toggleSort('title')}
              >
                <div className="flex items-center gap-1.5">Nombre <SortIcon activeKey={sortKey} activeDirection={sortDir} col="title" /></div>
              </th>
              <th className="px-4 py-3.5 font-medium">Tipo</th>
              <th
                className="px-4 py-3.5 font-medium cursor-pointer hover:text-slate-200 transition-colors select-none"
                onClick={() => toggleSort('price')}
              >
                <div className="flex items-center gap-1.5">Precio <SortIcon activeKey={sortKey} activeDirection={sortDir} col="price" /></div>
              </th>
              <th
                className="px-4 py-3.5 font-medium cursor-pointer hover:text-slate-200 transition-colors select-none"
                onClick={() => toggleSort('stock')}
              >
                <div className="flex items-center gap-1.5">Stock <SortIcon activeKey={sortKey} activeDirection={sortDir} col="stock" /></div>
              </th>
              <th className="px-6 py-3.5 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No se encontraron productos{search && ` para "${search}"`}.
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  {/* Image */}
                  <td className="pl-6 py-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                      ) : product.type === 'digital' ? (
                        <Gamepad2 className="w-5 h-5 text-[#3B82F6]" />
                      ) : (
                        <Printer className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </td>
                  {/* Name */}
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{product.title}</p>
                    {product.platform && <p className="text-xs text-slate-500 mt-0.5">{product.platform}</p>}
                    {product.material && <p className="text-xs text-slate-500 mt-0.5">{product.material}</p>}
                  </td>
                  {/* Type */}
                  <td className="px-4 py-4">
                    <Badge variant={product.type === 'digital' ? 'digital' : 'physical'}>
                      {product.type === 'digital' ? 'Digital' : 'Físico'}
                    </Badge>
                  </td>
                  {/* Price */}
                  <td className="px-4 py-4 text-white font-medium">${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}</td>
                  {/* Stock */}
                  <td className="px-4 py-4">
                    {product.stock === null ? (
                      <span className="text-slate-500">∞</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-white">
                        <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-[#10B981]' : 'bg-red-500'}`} />
                        {product.stock}
                      </span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onToggleFeatured?.(product)}
                        aria-label={product.featured ? `Quitar destacado de ${product.title}` : `Marcar ${product.title} como destacado`}
                        className={[
                          'inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-bold transition-colors',
                          product.featured
                            ? 'border-amber-400/20 bg-amber-400/10 text-amber-200 hover:bg-amber-400/15'
                            : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/30 hover:text-amber-200',
                        ].join(' ')}
                      >
                        <Star className={`h-3.5 w-3.5 ${product.featured ? 'fill-current' : ''}`} />
                        {product.featured ? 'Destacado' : 'Destacar'}
                      </button>
                      <button
                        onClick={() => onEdit?.(product)}
                        aria-label={`Editar ${product.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition-colors hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete?.(product.id)}
                        aria-label={`Eliminar ${product.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition-colors hover:border-red-400/30 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer row */}
      {filtered.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>{filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}</span>
          {search && <span>Filtrado de {products.length} total</span>}
        </div>
      )}
    </div>
  );
}
