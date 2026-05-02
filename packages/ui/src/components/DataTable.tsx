'use client';

import React, { useState } from 'react';
import { Search, Edit, Trash2, Gamepad2, Printer, ChevronUp, ChevronDown } from 'lucide-react';
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
}

interface DataTableProps {
  products: TableProduct[];
  onEdit?: (product: TableProduct) => void;
  onDelete?: (id: string) => void;
}

type SortKey = 'title' | 'price' | 'stock';
type SortDir = 'asc' | 'desc';

export function DataTable({ products, onEdit, onDelete }: DataTableProps) {
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

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col
      ? sortDir === 'asc'
        ? <ChevronUp className="w-3 h-3 text-[#3B82F6]" />
        : <ChevronDown className="w-3 h-3 text-[#3B82F6]" />
      : <ChevronUp className="w-3 h-3 text-slate-700" />;

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
                <div className="flex items-center gap-1.5">Nombre <SortIcon col="title" /></div>
              </th>
              <th className="px-4 py-3.5 font-medium">Tipo</th>
              <th
                className="px-4 py-3.5 font-medium cursor-pointer hover:text-slate-200 transition-colors select-none"
                onClick={() => toggleSort('price')}
              >
                <div className="flex items-center gap-1.5">Precio <SortIcon col="price" /></div>
              </th>
              <th
                className="px-4 py-3.5 font-medium cursor-pointer hover:text-slate-200 transition-colors select-none"
                onClick={() => toggleSort('stock')}
              >
                <div className="flex items-center gap-1.5">Stock <SortIcon col="stock" /></div>
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
                  <td className="px-4 py-4 text-white font-medium">${product.price.toFixed(2)}</td>
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
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit?.(product)}
                        aria-label={`Editar ${product.title}`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete?.(product.id)}
                        aria-label={`Eliminar ${product.title}`}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
