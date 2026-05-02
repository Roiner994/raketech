"use client";

import React, { useState } from 'react';
import { 
  Menu, 
  ShoppingCart, 
  X, 
  Search, 
  Edit, 
  Trash2, 
  LayoutDashboard, 
  Gamepad2, 
  Printer, 
  CheckCircle2, 
  ShoppingBag,
  MessageCircle,
  ChevronRight,
  LogOut,
  ArrowRight,
  Cloud
} from 'lucide-react';

export default function KitchenSink() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'digital' | 'physical'>('digital');
  const [showToast, setShowToast] = useState(false);
  // Initial cart items for demonstration
  const [cartItems, setCartItems] = useState([
    { id: 'prod_digital_1', title: 'Gauntlet Play Premium Pass', price: 14.99, type: 'digital', imageUrl: '/images/xbox_game_pass.png' },
    { id: 'prod_physical_1', title: 'PS5 & Headphone Vertical Stand', price: 35.00, type: 'physical', imageUrl: '/images/ps5_3d_stand.png' }
  ]);

  // Mock product data (Replace this with Firestore fetch later)
  const products = [
    {
      id: "prod_digital_1",
      title: "Gauntlet Play Premium Pass",
      description: "Unlimited access to 1000+ top games, early releases, and exclusive DLC.",
      price: 14.99,
      type: "digital",
      platform: "PC / Xbox / Cloud",
      imageUrl: "/images/xbox_game_pass.png",
      stock: -1
    },
    {
      id: "prod_physical_1",
      title: "PS5 & Headphone Vertical Stand",
      description: "Premium 3D printed vertical stand for PS5 with an integrated headphone mount. Sleek black finish.",
      price: 35.00,
      type: "physical",
      material: "PLA+",
      imageUrl: "/images/ps5_3d_stand.png",
      stock: 15
    }
  ];

  const toggleToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-[#3B82F6] selection:text-white pb-20">
      
      {/* 
        ====================================================
        SECTION 1: PUBLIC STOREFRONT
        ====================================================
      */}
      <div className="bg-[#050914] p-8 md:p-12 mb-20">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Navbar */}
          <nav className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center">
                <span className="text-xl font-black text-white">R</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-xs font-semibold text-white transition-colors">Suscripciones Digitales</a>
              <a href="#" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">Impresión 3D</a>
              <a href="#" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">Nosotros</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2.5 rounded-full bg-[#0066FF] text-white hover:bg-blue-600 transition-all shadow-lg shadow-[#0066FF]/20">
                <Search className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#00E676] text-[#0A101D] hover:bg-[#00C853] transition-all flex items-center gap-2 font-bold text-sm shadow-lg shadow-[#00E676]/20"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white border-2 border-[#00E676]">2</span>
                </div>
                $8.98
              </button>
            </div>
          </nav>

          {/* Hero Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Digital Card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-10 flex flex-col justify-center min-h-[340px] group border border-slate-800/50">
               <div className="absolute inset-0 opacity-30 bg-[url('/images/xbox_game_pass.png')] bg-cover bg-center"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-[#0A101D] via-[#0A101D]/80 to-transparent"></div>
              
              <div className="relative z-10 space-y-5">
                <span className="inline-block px-2.5 py-1 rounded bg-[#00E676] text-[#0A101D] text-[10px] font-black uppercase tracking-wider shadow-lg shadow-[#00E676]/20">DESTACADO</span>
                <h3 className="text-4xl font-bold text-white leading-tight max-w-[280px]">
                  Suscripciones al <span className="text-[#00E676]">Mejor Precio</span>
                </h3>
                <p className="text-slate-300 text-xs max-w-[280px] leading-relaxed">Accede a miles de juegos y beneficios exclusivos con Xbox Game Pass, PS Plus y más. Entrega inmediata.</p>
                <button className="mt-2 px-5 py-2.5 bg-[#00E676] hover:bg-[#00C853] text-[#0A101D] text-xs font-bold rounded flex items-center gap-2 w-max transition-colors shadow-lg shadow-[#00E676]/20">
                  Ver Catálogo <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Physical Card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-10 flex flex-col justify-center min-h-[340px] group border border-slate-800/50">
               <div className="absolute inset-0 opacity-30 bg-[url('/images/ps5_3d_stand.png')] bg-cover bg-center"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-[#0A101D] via-[#0A101D]/80 to-transparent"></div>
              
              <div className="relative z-10 space-y-5">
                <span className="inline-block px-2.5 py-1 rounded bg-[#00E676] text-[#0A101D] text-[10px] font-black uppercase tracking-wider shadow-lg shadow-[#00E676]/20">NUEVO</span>
                <h3 className="text-4xl font-bold text-white leading-tight max-w-[280px]">
                  Bases y Soportes en <span className="text-[#0066FF]">Impresión 3D</span>
                </h3>
                <p className="text-slate-300 text-xs max-w-[280px] leading-relaxed">Eleva tu setup al siguiente nivel con soportes personalizados y de alta resistencia para tus consolas y controles.</p>
                <button className="mt-2 px-5 py-2.5 bg-white hover:bg-slate-200 text-[#0A101D] text-xs font-bold rounded flex items-center gap-2 w-max transition-colors shadow-lg shadow-white/10">
                  Explorar Accesorios <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Digital Subscriptions Section */}
          <section className="space-y-5 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-0.5">Suscripciones Digitales</h2>
                <p className="text-xs text-slate-400">Códigos originales con entrega instantánea.</p>
              </div>
              <a href="#" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                Ver suscripciones <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {/* Xbox Card */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-[#00E676]/40 transition-all group flex flex-col">
                <div className="aspect-square bg-[#1A451A] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('/images/xbox_game_pass.png')] bg-cover bg-center" />
                  <Gamepad2 className="w-12 h-12 text-[#00E676] relative z-10 drop-shadow-lg" />
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">Xbox Game Pass Ultimate</p>
                  <p className="text-[#00E676] text-sm font-bold">$3.99</p>
                  <button className="mt-auto w-full py-1.5 bg-[#1E293B] hover:bg-[#00E676] hover:text-[#0A101D] text-slate-300 text-xs font-bold rounded-lg border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1">
                    + Agregar
                  </button>
                </div>
              </div>

              {/* PS Plus Card */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-[#0066FF]/40 transition-all group flex flex-col">
                <div className="aspect-square bg-[#0A2E7A] flex items-center justify-center relative overflow-hidden">
                  <Gamepad2 className="w-12 h-12 text-[#FFC107] drop-shadow-lg" />
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">PS Plus Deluxe 3 Meses</p>
                  <p className="text-[#FFC107] text-sm font-bold">$15.50</p>
                  <button className="mt-auto w-full py-1.5 bg-[#1E293B] hover:bg-[#FFC107] hover:text-[#0A2E7A] text-slate-300 text-xs font-bold rounded-lg border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1">
                    + Agregar
                  </button>
                </div>
              </div>

              {/* iCloud Card */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-slate-500/40 transition-all group flex flex-col">
                <div className="aspect-square bg-[#1C1C1E] flex items-center justify-center relative overflow-hidden">
                  <Cloud className="w-12 h-12 text-slate-300 drop-shadow-lg" />
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">iCloud+ 200 GB 1 Mes</p>
                  <p className="text-slate-200 text-sm font-bold">$2.99</p>
                  <button className="mt-auto w-full py-1.5 bg-[#1E293B] hover:bg-white hover:text-black text-slate-300 text-xs font-bold rounded-lg border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1">
                    + Agregar
                  </button>
                </div>
              </div>

              {/* Spotify Card */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-[#1DB954]/40 transition-all group flex flex-col">
                <div className="aspect-square bg-[#0D2A1A] flex items-center justify-center relative overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center">
                    <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.237-.431.1-.871-.17-.971-.601-.1-.43.17-.871.601-.971 4.911-1.121 9.122-.641 12.502 1.431.38.25.49.731.241 1.101l.05.036zm1.47-3.28c-.301.461-.921.601-1.381.3-3.451-2.121-8.712-2.741-12.782-1.5-.51.16-1.051-.13-1.211-.641-.16-.51.13-1.051.641-1.211 4.661-1.411 10.453-.721 14.433 1.71.461.281.601.921.3 1.342zm.13-3.41c-4.141-2.461-10.982-2.691-14.943-1.49-.601.19-1.241-.14-1.431-.741-.19-.601.141-1.241.741-1.431 4.543-1.381 12.093-1.111 16.863 1.721.541.321.721 1.021.4 1.561-.321.541-1.021.721-1.561.4l-.069-.02z"/></svg>
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">Spotify Premium 1 Mes</p>
                  <p className="text-[#1DB954] text-sm font-bold">$4.99</p>
                  <button className="mt-auto w-full py-1.5 bg-[#1E293B] hover:bg-[#1DB954] hover:text-black text-slate-300 text-xs font-bold rounded-lg border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1">
                    + Agregar
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* Physical / 3D Accessories Section */}
          <section className="space-y-5 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-0.5">Accesorios 3D</h2>
                <p className="text-xs text-slate-400">Diseños exclusivos, máxima resistencia para tu setup.</p>
              </div>
              <a href="#" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                Ver accesorios <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {/* PS5 Wall Mount */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-[#0066FF]/50 transition-all group flex flex-col">
                <div className="aspect-square bg-[#111827] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('/images/ps5_3d_stand.png')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">Base de Pared para PS5</p>
                  <p className="text-slate-200 text-sm font-bold">$4.99</p>
                  <button className="mt-auto w-full py-1.5 bg-[#1E293B] hover:bg-[#0066FF] hover:text-white text-slate-300 text-xs font-bold rounded-lg border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1">
                    + Agregar
                  </button>
                </div>
              </div>

              {/* Xbox Controller Stand */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-[#0066FF]/50 transition-all group flex flex-col">
                <div className="aspect-square bg-[#111827] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gamepad2 className="w-16 h-16 text-slate-600" />
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">Soporte de Controles Xbox</p>
                  <p className="text-slate-200 text-sm font-bold">$4.99</p>
                  <button className="mt-auto w-full py-1.5 bg-[#1E293B] hover:bg-[#0066FF] hover:text-white text-slate-300 text-xs font-bold rounded-lg border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1">
                    + Agregar
                  </button>
                </div>
              </div>

              {/* Headphone Stand — active/highlighted */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border-2 border-[#0066FF] transition-all group flex flex-col shadow-lg shadow-[#0066FF]/20">
                <div className="aspect-square bg-[#111827] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">Soporte para Audífonos</p>
                  <p className="text-slate-200 text-sm font-bold">$6.50</p>
                  <button className="mt-auto w-full py-1.5 bg-[#00E676] hover:bg-[#00C853] text-[#0A101D] text-xs font-bold rounded-lg border-transparent transition-all flex items-center justify-center gap-1 shadow-lg shadow-[#00E676]/20">
                    + Agregar
                  </button>
                </div>
              </div>

              {/* Nintendo Switch Base */}
              <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-[#0066FF]/50 transition-all group flex flex-col">
                <div className="aspect-square bg-[#111827] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-14 h-14 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="3" strokeWidth={1.5}/><path strokeLinecap="round" strokeWidth={1.5} d="M8 7h1m7 10h1M12 3v18"/></svg>
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-white text-xs font-semibold leading-tight">Base Nintendo Switch</p>
                  <p className="text-slate-200 text-sm font-bold">$5.99</p>
                  <button className="mt-auto w-full py-1.5 bg-[#1E293B] hover:bg-[#0066FF] hover:text-white text-slate-300 text-xs font-bold rounded-lg border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1">
                    + Agregar
                  </button>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      {/* 
        ====================================================
        SECTION 2: ADMIN PANEL
        ====================================================
      */}
      <div className="p-4 md:p-8 space-y-16 max-w-7xl mx-auto mt-20 border-t border-slate-800 pt-20">
        <div className="border-b border-slate-800 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard UI</h1>
          <p className="text-slate-400">Section 2: Private Dashboard Components</p>
        </div>

        {/* Admin Login Screen */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">1. Admin Login Screen</h2>
          <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-8 flex items-center justify-center min-h-[500px] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[100px]"></div>
            
            <div className="w-full max-w-md bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative z-10">
              <div className="text-center mb-8 space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl mx-auto flex items-center justify-center border border-slate-600 mb-4 shadow-lg shadow-black/50">
                  <span className="text-xl font-black text-white">R</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Panel de Control</h3>
                <p className="text-sm text-slate-400">Ingresa tus credenciales para continuar</p>
              </div>

              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    placeholder="admin@raketech.com" 
                    className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contraseña</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                  />
                </div>
                <button className="w-full bg-white hover:bg-slate-200 text-[#0B1120] font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] mt-2">
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Admin Layout & Sidebar & Stats */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">2. Admin Layout & Data Table</h2>
          
          <div className="border border-slate-800 rounded-3xl overflow-hidden flex h-[700px] bg-[#0B1120] relative">
            
            {/* Sidebar (Mobile Toggleable) */}
            <div className={`
              absolute md:relative z-20 h-full w-64 bg-[#1E293B] border-r border-slate-800 transform transition-transform duration-300 ease-in-out
              ${isAdminSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="font-black text-white text-xs">R</span>
                  </div>
                  <span className="font-bold text-white tracking-tight">Admin</span>
                </div>
                <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsAdminSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4 py-2 space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] font-medium border border-[#3B82F6]/20">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 font-medium transition-colors">
                  <Gamepad2 className="w-4 h-4" />
                  Juegos Digitales
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 font-medium transition-colors">
                  <Printer className="w-4 h-4" />
                  Impresiones 3D
                </a>
              </div>

              <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 font-medium transition-colors">
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              
              {/* Header */}
              <header className="h-16 border-b border-slate-800 bg-[#0B1120]/80 backdrop-blur flex items-center px-6 gap-4">
                <button className="md:hidden text-slate-400" onClick={() => setIsAdminSidebarOpen(true)}>
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>
                <button onClick={() => { setModalType('digital'); setIsModalOpen(true); }} className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                  + Nuevo
                </button>
              </header>

              {/* Dashboard Content */}
              <div className="flex-1 overflow-auto p-6 space-y-6">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                    <p className="text-slate-400 text-sm font-medium mb-1">Ventas Totales</p>
                    <p className="text-2xl font-bold text-white">$4,250.00</p>
                    <p className="text-xs text-[#10B981] mt-2 flex items-center gap-1">↑ 12% este mes</p>
                  </div>
                  <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                    <p className="text-slate-400 text-sm font-medium mb-1">Productos Activos</p>
                    <p className="text-2xl font-bold text-white">124</p>
                    <p className="text-xs text-slate-500 mt-2">En 2 categorías</p>
                  </div>
                </div>

                {/* Data Table */}
                <div className="bg-[#1E293B] rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-800/50 text-slate-400">
                        <tr>
                          <th className="px-6 py-4 font-medium">Producto</th>
                          <th className="px-6 py-4 font-medium">Tipo</th>
                          <th className="px-6 py-4 font-medium">Precio</th>
                          <th className="px-6 py-4 font-medium">Stock</th>
                          <th className="px-6 py-4 font-medium text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        <tr className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                              <Gamepad2 className="w-5 h-5 text-[#3B82F6]" />
                            </div>
                            <span className="font-medium text-white">PS Plus Extra (12 Meses)</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-medium border border-[#3B82F6]/20">Digital</span>
                          </td>
                          <td className="px-6 py-4 text-white">$49.99</td>
                          <td className="px-6 py-4 text-slate-400">∞</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                              <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                              <Printer className="w-5 h-5 text-slate-400" />
                            </div>
                            <span className="font-medium text-white">Soporte Auriculares</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 rounded bg-slate-700 text-slate-300 text-xs font-medium border border-slate-600">Físico</span>
                          </td>
                          <td className="px-6 py-4 text-white">$15.00</td>
                          <td className="px-6 py-4 text-white">
                            <span className="inline-flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> 12</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                              <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Overlay for mobile sidebar */}
            {isAdminSidebarOpen && (
              <div 
                className="absolute inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm"
                onClick={() => setIsAdminSidebarOpen(false)}
              ></div>
            )}
          </div>
        </section>

      </div>

      {/* 
        ====================================================
        SECTION 3: MODALS & FEEDBACK
        ====================================================
      */}
      <div className="p-4 md:p-8 space-y-16 max-w-7xl mx-auto mt-20 border-t border-slate-800 pt-20">
        <div className="border-b border-slate-800 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Modals & Feedback</h1>
          <p className="text-slate-400">Section 3: Product forms and notifications</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">Interact to Preview</h2>
          <div className="flex gap-4">
            <button onClick={() => { setModalType('digital'); setIsModalOpen(true); }} className="px-5 py-2.5 bg-[#1E293B] hover:bg-slate-800 border border-slate-700 rounded-xl text-white font-medium transition-colors">
              Open Form Modal (Digital)
            </button>
            <button onClick={() => { setModalType('physical'); setIsModalOpen(true); }} className="px-5 py-2.5 bg-[#1E293B] hover:bg-slate-800 border border-slate-700 rounded-xl text-white font-medium transition-colors">
              Open Form Modal (Physical)
            </button>
            <button onClick={toggleToast} className="px-5 py-2.5 bg-[#1E293B] hover:bg-slate-800 border border-slate-700 rounded-xl text-white font-medium transition-colors">
              Show Toast
            </button>
          </div>
        </section>
      </div>

      {/* 
        ====================================================
        OVERLAYS (Cart Drawer, Modals, Toasts)
        ====================================================
      */}
      
      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#1E293B] h-full shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-slate-800">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-[#0B1120]/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Mi Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-[#0B1120] p-4 rounded-xl border border-slate-800">
                    <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      <p className="text-slate-400 text-xs mt-1 capitalize">{item.type}</p>
                      <p className="text-white font-bold mt-2">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => setCartItems(cartItems.filter(c => c.id !== item.id))} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <ShoppingBag className="w-16 h-16 text-slate-700" />
                  <p className="text-lg font-medium">Tu carrito está vacío</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-800 bg-[#0B1120]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-400">Total a pagar</span>
                <span className="text-2xl font-bold text-white">${cartItems.reduce((a, b) => a + b.price, 0).toFixed(2)}</span>
              </div>
              <button className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold rounded-xl shadow-lg shadow-[#25D366]/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg">
                <MessageCircle className="w-6 h-6" />
                Comprar vía WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Agregar Producto</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* Type Toggle */}
              <div className="flex bg-[#0B1120] p-1 rounded-xl border border-slate-800">
                <button 
                  onClick={() => setModalType('digital')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${modalType === 'digital' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Digital
                </button>
                <button 
                  onClick={() => setModalType('physical')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${modalType === 'physical' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Físico
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Título del Producto</label>
                  <input type="text" className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]" placeholder="Ej. PS Plus Extra..." />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Precio ($)</label>
                  <input type="number" className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]" placeholder="0.00" />
                </div>

                {modalType === 'digital' ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Plataforma</label>
                    <select className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] appearance-none">
                      <option>PlayStation</option>
                      <option>Xbox</option>
                      <option>PC / Steam</option>
                      <option>Nintendo</option>
                    </select>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Etiquetas de Material</label>
                      <input type="text" className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]" placeholder="Ej. PLA+, Resina..." />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock Disponible</label>
                      <input type="number" className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]" placeholder="10" />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-[#0B1120] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-300 font-medium hover:text-white transition-colors">
                Cancelar
              </button>
              <button className="px-6 py-2.5 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all active:scale-95">
                Guardar Producto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transform transition-all duration-500 ease-out ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#1E293B] border border-[#10B981]/30 p-4 rounded-2xl shadow-2xl shadow-black flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">¡Éxito!</p>
            <p className="text-xs text-slate-400">Producto agregado al carrito</p>
          </div>
        </div>
      </div>

    </div>
  );
}
