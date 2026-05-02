'use client';

import React from 'react';
import { LayoutDashboard, Gamepad2, Printer, LogOut, X } from 'lucide-react';

export interface SidebarLink {
  label: string;
  href: string;
  icon: 'dashboard' | 'games' | 'print';
  active?: boolean;
}

const ICON_MAP = {
  dashboard: LayoutDashboard,
  games: Gamepad2,
  print: Printer,
};

interface AdminSidebarProps {
  links?: SidebarLink[];
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const defaultLinks: SidebarLink[] = [
  { label: 'Juegos Digitales', href: '/dashboard/digital', icon: 'games' },
  { label: 'Impresiones 3D', href: '/dashboard/physical', icon: 'print' },
];

export function AdminSidebar({
  links = defaultLinks,
  isOpen,
  onClose,
  onLogout,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40 inset-y-0 left-0
          w-64 bg-[#1E293B] border-r border-slate-800
          flex flex-col transition-transform duration-300 ease-in-out
          md:translate-x-0 md:flex
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
              <span className="text-xs font-black text-white">R</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Raketech</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 mb-2">
            Menú
          </p>
          {links.map((link) => {
            const Icon = ICON_MAP[link.icon];
            return (
              <a
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-150 group
                  ${
                    link.active
                      ? 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {link.label}
                {link.active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}
