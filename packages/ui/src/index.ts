// ─── Design Tokens ───────────────────────────────────────────────────────────
export { colors } from './tokens/colors';
export type { ColorToken } from './tokens/colors';

// ─── Primitives ──────────────────────────────────────────────────────────────
export { Button } from './components/ui/Button';
export type { ButtonVariant, ButtonSize } from './components/ui/Button';

export { Input } from './components/ui/Input';
export { Select } from './components/ui/Select';
export { Badge } from './components/ui/Badge';
export type { BadgeVariant } from './components/ui/Badge';

export { Toggle } from './components/ui/Toggle';

// ─── Storefront Components ───────────────────────────────────────────────────
export { Navbar } from './components/Navbar';
export type { NavLink } from './components/Navbar';

export { HeroBanner } from './components/HeroBanner';
export { ProductCard } from './components/ProductCard';
export type { ProductCardData } from './components/ProductCard';
export { StorefrontHeader } from './components/StorefrontHeader';
export type { StorefrontNavLink } from './components/StorefrontHeader';
export { StorefrontHeroGrid } from './components/StorefrontHeroGrid';
export type { StorefrontHeroItem } from './components/StorefrontHeroGrid';
export { StorefrontShowcaseCard } from './components/StorefrontShowcaseCard';
export type { StorefrontShowcaseCardProps } from './components/StorefrontShowcaseCard';
export { StorefrontProductGrid } from './components/StorefrontProductGrid';
export type { StorefrontProductGridProps, StorefrontGridProduct } from './components/StorefrontProductGrid';
export { ProductDetailModal } from './components/ProductDetailModal';
export type { ProductDetailModalProps, ProductDetail } from './components/ProductDetailModal';
export { ProductDetailView } from './components/ProductDetailView';
export type { ProductDetailViewProps } from './components/ProductDetailView';
export { StorefrontFooter } from './components/StorefrontFooter';
export type { StorefrontFooterColumn } from './components/StorefrontFooter';

export { CartDrawer } from './components/CartDrawer';
export { Footer } from './components/Footer';

// ─── Admin Components ────────────────────────────────────────────────────────
export { AdminSidebar } from './components/AdminSidebar';
export type { SidebarLink } from './components/AdminSidebar';

export { StatsCard } from './components/StatsCard';
export { DataTable } from './components/DataTable';
export type { TableProduct } from './components/DataTable';

export { LoginCard } from './components/LoginCard';
export { ProductFormModal } from './components/ProductFormModal';
export type { ProductFormValues, ProductFormType } from './components/ProductFormModal';

// ─── Feedback ────────────────────────────────────────────────────────────────
export { ToastList } from './components/Toast';

// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useCart } from './hooks/useCart';
export type { CartItem, UseCartReturn } from './hooks/useCart';

// ─── Toast Hooks ─────────────────────────────────────────────────────────────
export { useToast } from './hooks/useToast';
export type { Toast, ToastVariant, UseToastReturn } from './hooks/useToast';

// ─── Firebase ────────────────────────────────────────────────────────────────
export { app, db, storage, auth } from './lib/firebase';
