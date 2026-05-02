# Raketech Monorepo

A premium, dark-mode UI monorepo for **Raketech** — containing 3 independent Next.js applications sharing a single design system.

## Apps

| App | Port | Description |
|-----|------|-------------|
| `apps/storefront-digital` | `:3000` | Digital Games & Subscriptions Store |
| `apps/storefront-physical` | `:3001` | 3D Printing & Physical Products Store |
| `apps/admin` | `:3002` | Private Admin Dashboard |

## Shared Package

`packages/ui` → imported as `@raketech/ui`

- **Design tokens** — color palette, CSS variables
- **Primitives** — Button, Input, Select, Badge, Toggle
- **Storefront** — Navbar, HeroBanner, ProductCard, CartDrawer, Footer
- **Admin** — AdminSidebar, DataTable, StatsCard, LoginCard, ProductFormModal
- **Feedback** — ToastList
- **Hooks** — `useCart`, `useToast`

## Getting Started

```bash
# Install all workspace dependencies
npm install

# Run each app individually
npm run dev:digital    # http://localhost:3000
npm run dev:physical   # http://localhost:3001
npm run dev:admin      # http://localhost:3002
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0B1120` | Page background |
| Card | `#1E293B` | Cards, panels |
| Xbox Green | `#10B981` | Success, add-to-cart |
| PlayStation Blue | `#3B82F6` | Primary actions |
| Gold | `#FBBF24` | Duration badges |
| WhatsApp | `#25D366` | Checkout CTA |

## Project Structure

```
raketech/
├── apps/
│   ├── storefront-digital/   # App 1
│   ├── storefront-physical/  # App 2
│   └── admin/                # App 3
├── packages/
│   └── ui/                   # @raketech/ui
│       └── src/
│           ├── tokens/
│           ├── components/
│           │   └── ui/       # Primitives
│           └── hooks/
├── package.json              # npm workspaces root
└── tsconfig.base.json        # Shared TS config
```
