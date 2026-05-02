// Raketech Design System — Color Tokens
// Use these constants with Tailwind arbitrary values: bg-[colors.bgPrimary]
// Or as CSS vars — they're also declared in globals.css

export const colors = {
  // Backgrounds
  bgPrimary: '#07111f',
  bgCard: '#0f1b2d',
  bgElevated: '#16253a',
  bgSoft: '#1d2e46',

  // Brand Accents
  accentGreen: '#2dd4bf',
  accentBlue: '#60a5fa',
  accentGold: '#f3c96b',
  accentWhatsApp: '#22c55e',
  accentPrimary: '#60a5fa',
  accentPrimaryHover: '#93c5fd',

  // Text
  textPrimary: '#f8fafc',
  textSecondary: '#b8c4d9',
  textMuted: '#7f90aa',

  // Borders
  borderDefault: '#22324a',
  borderSubtle: '#30425d',

  // Feedback
  danger: '#f87171',
  success: '#22c55e',
} as const;

export type ColorToken = keyof typeof colors;
