import type { ToastVariant } from "@raketech/ui";

const FLASH_TOAST_KEY = "raketech-admin-flash-toast";

export interface FlashToast {
  message: string;
  description?: string;
  variant: ToastVariant;
}

export function setFlashToast(toast: FlashToast) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(FLASH_TOAST_KEY, JSON.stringify(toast));
}

export function consumeFlashToast(): FlashToast | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(FLASH_TOAST_KEY);
  if (!raw) {
    return null;
  }

  window.sessionStorage.removeItem(FLASH_TOAST_KEY);

  try {
    return JSON.parse(raw) as FlashToast;
  } catch {
    return null;
  }
}
