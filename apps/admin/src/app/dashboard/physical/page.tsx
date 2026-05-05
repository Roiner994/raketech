"use client";

import { useCallback, useEffect, useState } from "react";
import { StatsCard, DataTable, ToastList, useToast } from "@raketech/ui";
import type { TableProduct } from "@raketech/ui";
import { Package, Users, Plus } from "lucide-react";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { consumeFlashToast } from "@/lib/flashToast";
import { db } from "@/lib/firebase";

export default function PhysicalDashboardPage() {
  const [products, setProducts] = useState<TableProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { showToast } = toast;
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
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
          gallery: data.gallery || [],
          type: "physical",
          material: data.material,
          stock: data.stock || 0,
          featuresHtml: data.featuresHtml,
          featured: data.featured === true,
        });
      });
      setProducts(loadedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("Error cargando productos", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchProducts();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchProducts]);

  useEffect(() => {
    const flashToast = consumeFlashToast();
    if (flashToast) {
      showToast(flashToast.message, {
        description: flashToast.description,
        variant: flashToast.variant,
      });
    }
  }, [showToast]);

  const handleEdit = (product: TableProduct) => {
    router.push(`/dashboard/products/physical/${product.id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const product = products.find((p) => p.id === id);
      await deleteDoc(doc(db, "products", id));
      showToast("Producto eliminado", {
        description: product?.title,
        variant: "error",
      });
      void fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Error al eliminar el producto", { variant: "error" });
    }
  };

  const handleToggleFeatured = async (product: TableProduct) => {
    try {
      await updateDoc(doc(db, "products", product.id), {
        featured: !product.featured,
      });
      void fetchProducts();
    } catch (error) {
      console.error("Error updating featured state:", error);
      showToast("Error actualizando destacado", { variant: "error" });
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/settings")}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
          >
            Configuración
          </button>
          <button
            onClick={() => router.push("/dashboard/products/physical/new")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-200 text-slate-900 text-sm font-bold rounded-xl transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Nuevo Producto Físico
          </button>
        </div>
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
          value={`$${stats.totalValue % 1 === 0 ? stats.totalValue : stats.totalValue.toFixed(2)}`}
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
          onToggleFeatured={handleToggleFeatured}
        />
      )}

      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </div>
  );
}
