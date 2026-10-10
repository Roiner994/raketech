const DEAD_IMAGE_HOSTS = new Set([
  'storage.googleapis.com',
  'firebasestorage.googleapis.com',
]);

export function isUnusableProductImageUrl(url: string | null | undefined): boolean {
  if (!url) return true;

  if (url.startsWith('/')) {
    return false;
  }

  try {
    const host = new URL(url).hostname;
    return DEAD_IMAGE_HOSTS.has(host);
  } catch {
    return true;
  }
}

export function resolveProductImageUrl(
  url: string | null | undefined,
  fallback = '/images/placeholder.png'
): string {
  if (isUnusableProductImageUrl(url)) {
    return fallback;
  }

  return url as string;
}

export function resolveProductGallery(
  gallery: string[] | undefined,
  imageUrl?: string | null,
  fallback = '/images/placeholder.png'
): string[] {
  const candidates = [
    ...(Array.isArray(gallery) ? gallery : []),
    ...(imageUrl ? [imageUrl] : []),
  ].filter((value): value is string => typeof value === 'string' && value.length > 0);

  const usable = candidates.filter((value) => !isUnusableProductImageUrl(value));
  return usable.length > 0 ? Array.from(new Set(usable)) : [fallback];
}
