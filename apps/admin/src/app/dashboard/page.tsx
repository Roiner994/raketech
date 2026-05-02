"use client";

import { useState } from "react";
import {
  StatsCard,
  DataTable,
  ProductFormModal,
  ToastList,
  useToast,
} from "@raketech/ui";
import type { TableProduct, ProductFormValues } from "@raketech/ui";
import { ShoppingBag, Package, TrendingUp, Users, Plus } from "lucide-react";

const INITIAL_PRODUCTS: TableProduct[] = [
  {
    id: "xgpu-12",
    title: "Xbox Game Pass Ultimate",
    price: 14.99,
    stock: null,
    type: "digital",
    platform: "Xbox",
  },
  {
    id: "psplus-extra-12",
    title: "PS Plus Extra 12 Meses",
    price: 49.99,
    stock: null,
    type: "digital",
    platform: "PlayStation",
  },
  {
    id: "base-ps5-v",
    title: "Base Vertical PS5",
    price: 25.0,
    stock: 8,
    type: "physical",
    material: "PLA+",
  },
  {
    id: "soporte-auricular",
    title: "Soporte Auriculares Gamer",
    price: 15.0,
    stock: 12,
    type: "physical",
    material: "PETG",
  },
  {
    id: "dock-switch",
    title: "Dock Nintendo Switch",
    price: 35.0,
    stock: 3,
    type: "physical",
    material: "Resina",
  },
];

export default function DashboardPage() {
  const [products, setProducts] = useState<TableProduct[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TableProduct | null>(null);
  const toast = useToast();

  const handleSave = (values: ProductFormValues) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: values.title,
                price: parseFloat(values.price),
                type: values.type === "Digital" ? "digital" : "physical",
                platform: values.type === "Digital" ? values.platform : undefined,
                material: values.type === "Físico" ? values.material : undefined,
                stock:
                  values.type === "Físico"
                    ? parseInt(values.stock) || 0
                    : null,
              }
            : p
        )
      );
      toast.showToast("Producto actualizado", { variant: "success" });
    } else {
      const newProduct: TableProduct = {
        id: Math.random().toString(36).slice(2),
        title: values.title,
        price: parseFloat(values.price),
        type: values.type === "Digital" ? "digital" : "physical",
        platform: values.type === "Digital" ? values.platform : undefined,
        material: values.type === "Físico" ? values.material : undefined,
        stock: values.type === "Físico" ? parseInt(values.stock) || 0 : null,
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.showToast("Producto agregado", {
        description: values.title,
        variant: "success",
      });
    }
    setEditingProduct(null);
  };

  const handleEdit = (product: TableProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const product = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.showToast("Producto eliminado", {
      description: product?.title,
      variant: "error",
    });
  };

  const stats = {
    total: products.reduce((s, p) => s + p.price * (p.stock ?? 1), 0),
    active: products.length,
    digital: products.filter((p) => p.type === "digital").length,
    physical: products.filter((p) => p.type === "physical").length,
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Gestiona tus productos y métricas
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-200 text-slate-900 text-sm font-bold rounded-xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Valor en Inventario"
          value={`$${stats.total.toFixed(2)}`}
          trend="12% este mes"
          trendPositive
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatsCard
          label="Productos Activos"
          value={stats.active}
          trend="2 nuevos"
          trendPositive
          icon={<Package className="w-4 h-4" />}
        />
        <StatsCard
          label="Suscripciones"
          value={stats.digital}
          icon={<ShoppingBag className="w-4 h-4" />}
        />
        <StatsCard
          label="Productos Físicos"
          value={stats.physical}
          icon={<Users className="w-4 h-4" />}
        />
      </div>

      {/* Table */}
      <DataTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
        title={editingProduct ? "Editar Producto" : "Agregar Producto"}
        initialValues={
          editingProduct
            ? {
                title: editingProduct.title,
                price: editingProduct.price.toString(),
                type: editingProduct.type === "digital" ? "Digital" : "Físico",
                platform: editingProduct.platform ?? "",
                material: editingProduct.material ?? "",
                stock: editingProduct.stock?.toString() ?? "",
              }
            : undefined
        }
      />

      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </div>
  );
}
