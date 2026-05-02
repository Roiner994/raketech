"use client";

import { useState, useEffect } from "react";
import {
  StatsCard,
  DataTable,
  ProductFormModal,
  ToastList,
  useToast,
  db,
} from "@raketech/ui";
import type { TableProduct, ProductFormValues } from "@raketech/ui";
import { Package, Users, Plus } from "lucide-react";
import { collection, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

const INITIAL_PRODUCTS: TableProduct[] = [
  {
    id: "base-ps5-v",
    title: "Base Vertical PS5",
    price: 25.0,
    stock: 8,
    type: "physical",
    material: "PLA+",
    category: "Accesorios Consolas",
    description: "Soporte vertical elegante y estable para PlayStation 5, diseñado para mejorar la ventilación.",
    imageUrl: "/images/ps5_stand.png",
    featuresHtml: `<ul><li><strong>Material PLA Premium</strong>: Acabado liso y resistente.</li><li><strong>Alta Resolución</strong>: Capas de 0.1mm para máxima calidad de detalle.</li><li><strong>Tamaño Personalizado</strong>: 15cm de alto, base de 10cm.</li></ul>`,
  },
  {
    id: "soporte-auricular",
    title: "Soporte Auriculares Gamer",
    price: 15.0,
    stock: 12,
    type: "physical",
    material: "PETG",
    category: "Accesorios Escritorio",
    description: "Mantén tus auriculares ordenados con este soporte resistente en forma de joystick retro.",
    imageUrl: "/images/headset_stand.png",
    featuresHtml: `<ul><li><strong>Detalle Extremo</strong>: Ideal para pintar y coleccionar.</li><li><strong>Material Resistente</strong>: Soporta pequeñas caídas.</li></ul>`,
  },
  {
    id: "dock-switch",
    title: "Dock Nintendo Switch",
    price: 35.0,
    stock: 3,
    type: "physical",
    material: "Resina",
    category: "Accesorios Consolas",
    description: "Estación de carga miniatura de diseño exclusivo para Nintendo Switch.",
    imageUrl: "/images/switch_dock.png",
    featuresHtml: `<ul><li><strong>Impresión 3D de Alta Calidad</strong></li><li><strong>Compatible con accesorios Switch</strong></li></ul>`,
  },
];

export default function PhysicalDashboardPage() {
  const [products, setProducts] = useState<TableProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TableProduct | null>(null);
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "products"), where("type", "==", "physical"));
      const querySnapshot = await getDocs(q);
      const loadedProducts: TableProduct[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loadedProducts.push({
          id: docSnap.id,
          title: data.title,
          price: data.price,
          description: data.description,
          category: data.category,
          imageUrl: data.imageUrl,
          type: "physical",
          material: data.material,
          stock: data.stock || 0,
          featuresHtml: data.featuresHtml,
        });
      });
      setProducts(loadedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.showToast("Error cargando productos", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        const docRef = doc(db, "products", editingProduct.id);
        await updateDoc(docRef, {
          title: values.title,
          price: parseFloat(values.price),
          description: values.description,
          category: values.category,
          imageUrl: values.imageUrl,
          material: values.material,
          stock: parseInt(values.stock) || 0,
          featuresHtml: values.featuresHtml,
        });
        toast.showToast("Producto físico actualizado", { variant: "success" });
      } else {
        await addDoc(collection(db, "products"), {
          title: values.title,
          price: parseFloat(values.price),
          description: values.description,
          category: values.category,
          imageUrl: values.imageUrl,
          type: "physical",
          material: values.material,
          stock: parseInt(values.stock) || 0,
          featuresHtml: values.featuresHtml,
        });
        toast.showToast("Producto físico agregado", {
          description: values.title,
          variant: "success",
        });
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.showToast("Error guardando el producto", { variant: "error" });
    }
  };

  const handleEdit = (product: TableProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const product = products.find((p) => p.id === id);
      await deleteDoc(doc(db, "products", id));
      toast.showToast("Producto eliminado", {
        description: product?.title,
        variant: "error",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.showToast("Error al eliminar el producto", { variant: "error" });
    }
  };

  const stats = {
    totalValue: products.reduce((s, p) => s + p.price * (p.stock ?? 1), 0),
    active: products.length,
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Impresiones 3D</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Gestiona tu inventario de productos físicos
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
          Nuevo Producto Físico
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          label="Productos en Catálogo"
          value={stats.active}
          trend="1 nuevo"
          trendPositive
          icon={<Package className="w-4 h-4" />}
        />
        <StatsCard
          label="Valor en Inventario"
          value={`$${stats.totalValue.toFixed(2)}`}
          icon={<Users className="w-4 h-4" />}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <DataTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
        title={editingProduct ? "Editar Producto Físico" : "Agregar Producto Físico"}
        fixedType="Físico"
        initialValues={
          editingProduct
            ? {
                title: editingProduct.title,
                price: editingProduct.price.toString(),
                description: editingProduct.description ?? "",
                category: editingProduct.category ?? "",
                imageUrl: editingProduct.imageUrl ?? "",
                material: editingProduct.material ?? "",
                stock: editingProduct.stock?.toString() ?? "",
                featuresHtml: editingProduct.featuresHtml ?? "",
              }
            : undefined
        }
      />

      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </div>
  );
}
