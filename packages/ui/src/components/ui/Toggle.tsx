import React from 'react';

interface ToggleProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Toggle({ options, value, onChange, className = '' }: ToggleProps) {
  return (
    <div
      className={`flex bg-[#0B1120] p-1 rounded-xl border border-slate-800 ${className}`}
      role="tablist"
    >
      {options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={`
              flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]
              ${
                isActive
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-500 hover:text-slate-300'
              }
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
