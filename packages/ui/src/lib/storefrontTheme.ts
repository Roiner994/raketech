export type StorefrontTheme = "dark" | "light";
export type StorefrontId = "digital" | "physical";

export const STOREFRONT_SETTINGS_COLLECTION = "storefrontSettings";
export const DEFAULT_STOREFRONT_THEME: StorefrontTheme = "dark";

export function isStorefrontTheme(value: unknown): value is StorefrontTheme {
  return value === "dark" || value === "light";
}

export function resolveStorefrontTheme(value: unknown): StorefrontTheme {
  return isStorefrontTheme(value) ? value : DEFAULT_STOREFRONT_THEME;
}
