import React from 'react';
import { Plus, Settings, Package, Star, TrendingUp } from 'lucide-react';

interface DigitalDashboardHeroProps {
  totalProducts: number;
  featuredProducts: number;
  onCreateProduct: () => void;
  onSettingsClick: () => void;
  userName?: string;
}

export function DigitalDashboardHero({
  totalProducts,
  featuredProducts,
  onCreateProduct,
  onSettingsClick,
  userName = "Admin"
}: DigitalDashboardHeroProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Main Feature Card - 2x2 on desktop */}
      <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 min-h-[340px] group">
        {/* Background Image/Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40"
          style={{ backgroundImage: 'url("/digital_hero_background.png")' }} // This path might need adjustment based on how public assets are handled
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8 space-y-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white leading-tight">
              Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Digital</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xs">
              Bienvenido de nuevo, {userName}. Gestiona tus juegos y suscripciones digitales con facilidad.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onCreateProduct}
              className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-900 text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-white/10"
            >
              <Plus className="w-4 h-4" />
              Nuevo Producto
            </button>
          </div>
        </div>
      </div>

      {/* Stats Card 1: Total Products */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 hover:border-blue-500/50 transition-all group flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
            <Package className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1 text-[#10B981] text-xs font-bold">
            <TrendingUp className="w-3 h-3" />
            +12%
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium">Total Productos</p>
          <p className="text-3xl font-bold text-white mt-1">{totalProducts}</p>
        </div>
      </div>

      {/* Stats Card 2: Featured Items */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 hover:border-yellow-500/50 transition-all group flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400">
            <Star className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium">Destacados</p>
          <p className="text-3xl font-bold text-white mt-1">{featuredProducts}</p>
        </div>
      </div>

      {/* Settings / Quick Actions - 2x1 bottom on desktop */}
      <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-slate-800 text-slate-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Configuración Global</p>
            <p className="text-slate-400 text-xs">Ajusta los parámetros de tu tienda</p>
          </div>
        </div>
        <button
          onClick={onSettingsClick}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
        >
          Gestionar
        </button>
      </div>
    </div>
  );
}
