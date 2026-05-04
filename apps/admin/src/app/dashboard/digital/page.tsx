"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable, ToastList, useToast, db } from "@raketech/ui";
import type { TableProduct } from "@raketech/ui";
import { Plus } from "lucide-react";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { consumeFlashToast } from "@/lib/flashToast";

export default function DigitalDashboardPage() {
  const [products, setProducts] = useState<TableProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { showToast } = toast;
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "products"), where("type", "==", "digital"));
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
          type: "digital",
          platform: data.platform,
          featuresHtml: data.featuresHtml,
          stock: data.stock || null,
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
    router.push(`/dashboard/products/digital/${product.id}`);
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

  return (
    <div className="p-6 space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Juegos Digitales</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Gestiona tus suscripciones y juegos digitales
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/products/digital/new")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-200 text-slate-900 text-sm font-bold rounded-xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto Digital
        </button>
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
