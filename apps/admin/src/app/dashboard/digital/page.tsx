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
import { ShoppingBag, TrendingUp, Plus } from "lucide-react";
import { collection, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

const INITIAL_PRODUCTS: TableProduct[] = [
  {
    id: "xgpu-12",
    title: "Xbox Game Pass Ultimate",
    price: 14.99,
    stock: null,
    type: "digital",
    platform: "Xbox",
    category: "Suscripciones",
    description: "Accede a cientos de juegos de alta calidad en consola, PC y la nube. Incluye EA Play y todos los beneficios de Xbox Live Gold.",
    imageUrl: "/images/xbox_game_pass.png",
    featuresHtml: `<ul><li><strong>Multijugador Online</strong>: Juega con amigos en la red más avanzada.</li><li><strong>Garantía Total</strong>: Código 100% original con soporte técnico.</li><li><strong>Entrega Instantánea</strong>: Recibe tu código por WhatsApp o correo.</li></ul>`,
  },
  {
    id: "psplus-extra-12",
    title: "PS Plus Extra 12 Meses",
    price: 49.99,
    stock: null,
    type: "digital",
    platform: "PlayStation",
    category: "Suscripciones",
    description: "La membresía definitiva de PlayStation. Incluye catálogo de juegos, clásicos, pruebas de juegos y multijugador online.",
    imageUrl: "/images/ps_plus.png",
    featuresHtml: `<ul><li><strong>Juego Online</strong>: Desbloquea el multijugador.</li><li><strong>Juegos Mensuales</strong>: Descarga juegos cada mes.</li></ul>`,
  },
];

export default function DigitalDashboardPage() {
  const [products, setProducts] = useState<TableProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TableProduct | null>(null);
  const toast = useToast();

  const fetchProducts = async () => {
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
          type: "digital",
          platform: data.platform,
          featuresHtml: data.featuresHtml,
          stock: data.stock || null,
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
          platform: values.platform,
          featuresHtml: values.featuresHtml,
        });
        toast.showToast("Producto digital actualizado", { variant: "success" });
      } else {
        await addDoc(collection(db, "products"), {
          title: values.title,
          price: parseFloat(values.price),
          description: values.description,
          category: values.category,
          imageUrl: values.imageUrl,
          type: "digital",
          platform: values.platform,
          featuresHtml: values.featuresHtml,
          stock: null,
        });
        toast.showToast("Producto digital agregado", {
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
    total: products.reduce((s, p) => s + p.price, 0),
    active: products.length,
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
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-200 text-slate-900 text-sm font-bold rounded-xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto Digital
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          label="Suscripciones Activas"
          value={stats.active}
          trend="2 nuevas"
          trendPositive
          icon={<ShoppingBag className="w-4 h-4" />}
        />
        <StatsCard
          label="Ingreso Mensual (Est.)"
          value={`$${stats.total.toFixed(2)}`}
          trend="5% este mes"
          trendPositive
          icon={<TrendingUp className="w-4 h-4" />}
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
        title={editingProduct ? "Editar Producto Digital" : "Agregar Producto Digital"}
        fixedType="Digital"
        initialValues={
          editingProduct
            ? {
                title: editingProduct.title,
                price: editingProduct.price.toString(),
                description: editingProduct.description ?? "",
                category: editingProduct.category ?? "",
                imageUrl: editingProduct.imageUrl ?? "",
                platform: editingProduct.platform ?? "",
                featuresHtml: editingProduct.featuresHtml ?? "",
              }
            : undefined
        }
      />

      <ToastList toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </div>
  );
}
