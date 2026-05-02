import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  icon?: React.ReactNode;
}

export function StatsCard({ label, value, trend, trendPositive = true, icon }: StatsCardProps) {
  return (
    <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-400 font-medium">{label}</p>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
      {trend && (
        <p
          className={`text-xs mt-2 flex items-center gap-1 font-medium ${
            trendPositive ? 'text-[#10B981]' : 'text-red-400'
          }`}
        >
          {trendPositive ? '↑' : '↓'} {trend}
        </p>
      )}
    </div>
  );
}
