'use client';

import React from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface LoginCardProps {
  onLogin?: (email: string, password: string) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function LoginCard({ onLogin, isLoading, error }: LoginCardProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(email, password);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#10B981]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-black/50">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-black/40 mb-4">
            <span className="text-2xl font-black text-white">R</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
          <p className="text-sm text-slate-400 mt-1">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="admin@raketech.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
