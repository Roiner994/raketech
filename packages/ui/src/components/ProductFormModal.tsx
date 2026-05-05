'use client';

import React from 'react';
import { ArrowLeft, Check, ImagePlus, Images, Loader2, Star, Trash2, Upload, X } from 'lucide-react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Toggle } from './ui/Toggle';
import { Button } from './ui/Button';
import { RichTextEditor } from './ui/RichTextEditor';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';

export type ProductFormType = 'Digital' | 'Físico';

export interface ProductFormValues {
  title: string;
  price: string;
  description: string;
  category: string;
  featured: boolean;
  imageUrl: string;
  gallery: string[];
  type: ProductFormType;
  featuresHtml: string;
  platform: string;
  material: string;
  stock: string;
}

interface ProductFormModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave: (values: ProductFormValues) => void | Promise<void>;
  storage: FirebaseStorage;
  initialValues?: Partial<ProductFormValues>;
  title?: string;
  fixedType?: ProductFormType;
  layout?: 'modal' | 'page';
}

interface UploadState {
  active: boolean;
  completed: number;
  total: number;
  progress: number;
}

interface PendingImage {
  id: string;
  kind: 'pending';
  file: File;
  previewUrl: string;
}

interface SavedImage {
  id: string;
  kind: 'saved';
  url: string;
}

type ProductImage = PendingImage | SavedImage;

const PLATFORMS = [
  { value: 'PlayStation', label: 'PlayStation' },
  { value: 'Xbox', label: 'Xbox' },
  { value: 'PC / Steam', label: 'PC / Steam' },
  { value: 'Nintendo', label: 'Nintendo' },
];

const DEFAULT_VALUES: ProductFormValues = {
  title: '',
  price: '',
  description: '',
  category: '',
  featured: false,
  imageUrl: '',
  gallery: [],
  type: 'Digital',
  featuresHtml: '',
  platform: 'PlayStation',
  material: '',
  stock: '',
};

const DEFAULT_UPLOAD_STATE: UploadState = {
  active: false,
  completed: 0,
  total: 0,
  progress: 0,
};

const MAX_IMAGE_DIMENSION = 1600;
const LARGE_IMAGE_BYTES = 4 * 1024 * 1024;
const DEFAULT_WEBP_QUALITY = 0.82;
const LARGE_IMAGE_WEBP_QUALITY = 0.72;

function normalizeValues(
  initialValues: Partial<ProductFormValues> | undefined,
  fixedType?: ProductFormType
): ProductFormValues {
  const nextValues = {
    ...DEFAULT_VALUES,
    type: fixedType ?? DEFAULT_VALUES.type,
    ...initialValues,
  };

  const gallery = Array.from(
    new Set([nextValues.imageUrl, ...(nextValues.gallery ?? [])].filter(Boolean))
  );

  return {
    ...nextValues,
    imageUrl: nextValues.imageUrl || gallery[0] || '',
    gallery,
  };
}

function createSavedImages(gallery: string[]) {
  return gallery.map((url, index) => ({
    id: `saved-${index}-${url}`,
    kind: 'saved' as const,
    url,
  }));
}

function uploadFile(file: File, storage: FirebaseStorage) {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      undefined,
      reject,
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

async function loadImageElement(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new window.Image();
    image.src = objectUrl;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function optimizeImage(file: File) {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  const image = await loadImageElement(file);
  const longestSide = Math.max(image.width, image.height);
  const needsResize = longestSide > MAX_IMAGE_DIMENSION;
  const quality = file.size > LARGE_IMAGE_BYTES ? LARGE_IMAGE_WEBP_QUALITY : DEFAULT_WEBP_QUALITY;

  if (!needsResize && file.type === 'image/webp' && file.size <= LARGE_IMAGE_BYTES) {
    return file;
  }

  const scale = needsResize ? MAX_IMAGE_DIMENSION / longestSide : 1;
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((generatedBlob) => resolve(generatedBlob), 'image/webp', quality);
  });

  if (!blob) {
    return file;
  }

  const fileName = file.name.replace(/\.[^.]+$/, '');
  return new File([blob], `${fileName}.webp`, {
    type: 'image/webp',
    lastModified: Date.now(),
  });
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getImagePreview(image: ProductImage) {
  return image.kind === 'saved' ? image.url : image.previewUrl;
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-800/80 bg-[#10192B] p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.85)]">
      <div className="mb-4">
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-200">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  storage,
  initialValues,
  title = 'Agregar Producto',
  fixedType,
  layout = 'modal',
}: ProductFormModalProps) {
  const isPageLayout = layout === 'page';
  const normalizedInitialValues = React.useMemo(
    () => normalizeValues(initialValues, fixedType),
    [fixedType, initialValues]
  );
  const [values, setValues] = React.useState<ProductFormValues>(normalizedInitialValues);
  const [images, setImages] = React.useState<ProductImage[]>(() =>
    createSavedImages(normalizedInitialValues.gallery)
  );
  const [primaryImageId, setPrimaryImageId] = React.useState<string | null>(() => {
    const savedImages = createSavedImages(normalizedInitialValues.gallery);
    const primaryImage = savedImages.find((image) => image.url === normalizedInitialValues.imageUrl);
    return primaryImage?.id ?? savedImages[0]?.id ?? null;
  });
  const [uploadState, setUploadState] = React.useState<UploadState>(DEFAULT_UPLOAD_STATE);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isDragActive, setIsDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const pendingUrlSetRef = React.useRef(new Set<string>());

  const clearPendingUrls = React.useCallback(() => {
    pendingUrlSetRef.current.forEach((url) => URL.revokeObjectURL(url));
    pendingUrlSetRef.current.clear();
  }, []);

  React.useEffect(() => {
    return () => {
      clearPendingUrls();
    };
  }, [clearPendingUrls]);

  const set = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const addFiles = (fileList: FileList | File[]) => {
    const selectedFiles = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
    if (!selectedFiles.length) {
      return;
    }

    setErrorMessage('');

    const newImages = selectedFiles.map((file, index) => {
      const previewUrl = URL.createObjectURL(file);
      pendingUrlSetRef.current.add(previewUrl);

      return {
        id: `pending-${Date.now()}-${index}-${file.name}`,
        kind: 'pending' as const,
        file,
        previewUrl,
      };
    });

    setImages((current) => {
      const nextImages = [...current, ...newImages];
      setPrimaryImageId((currentPrimary) => currentPrimary ?? newImages[0]?.id ?? null);
      return nextImages;
    });
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(event.target.files ?? []);
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    addFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!uploadState.active) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setIsDragActive(false);
  };

  const removeImage = (imageId: string) => {
    setImages((current) => {
      const imageToRemove = current.find((image) => image.id === imageId);
      if (imageToRemove?.kind === 'pending') {
        URL.revokeObjectURL(imageToRemove.previewUrl);
        pendingUrlSetRef.current.delete(imageToRemove.previewUrl);
      }

      const nextImages = current.filter((image) => image.id !== imageId);
      setPrimaryImageId((currentPrimary) => {
        if (currentPrimary !== imageId) {
          return currentPrimary;
        }

        return nextImages[0]?.id ?? null;
      });

      return nextImages;
    });
  };

  const handleSave = async () => {
    if (!values.title || !values.price || uploadState.active) {
      return;
    }

    setErrorMessage('');

    try {
      const totalPendingImages = images.filter((image) => image.kind === 'pending').length;
      const uploadedUrlsById = new Map<string, string>();
      let completedUploads = 0;

      setUploadState({
        active: true,
        completed: 0,
        total: totalPendingImages,
        progress: totalPendingImages > 0 ? 0 : 100,
      });

      for (const image of images) {
        if (image.kind === 'saved') {
          uploadedUrlsById.set(image.id, image.url);
          continue;
        }

        const optimizedFile = await optimizeImage(image.file);
      const uploadedUrl = await uploadFile(optimizedFile, storage);
        uploadedUrlsById.set(image.id, uploadedUrl);

        completedUploads += 1;
        setUploadState({
          active: true,
          completed: completedUploads,
          total: totalPendingImages,
          progress: Math.round((completedUploads / totalPendingImages) * 100),
        });
      }

      const gallery = images
        .map((image) => uploadedUrlsById.get(image.id))
        .filter((url): url is string => Boolean(url));
      const primaryImageUrl =
        (primaryImageId ? uploadedUrlsById.get(primaryImageId) : undefined) ?? gallery[0] ?? '';

      await onSave({
        ...values,
        imageUrl: primaryImageUrl,
        gallery,
      });

      clearPendingUrls();
      onClose();
    } catch (error) {
      console.error('Error saving product with images:', error);
      setErrorMessage('No pudimos procesar o subir las imágenes. Revisa los archivos e inténtalo de nuevo.');
      setUploadState(DEFAULT_UPLOAD_STATE);
    }
  };

  if (!isPageLayout && !isOpen) return null;

  const selectedImageCount = images.length;
  const primaryIndex = images.findIndex((image) => image.id === primaryImageId);
  const primaryImage = images.find((image) => image.id === primaryImageId) ?? images[0] ?? null;
  const canSave = Boolean(values.title && values.price) && !uploadState.active;

  return (
    <div
      className={
        isPageLayout
          ? 'min-h-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,#0B1120_0%,#07101C_100%)]'
          : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4'
      }
    >
      {!isPageLayout ? (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={uploadState.active ? undefined : onClose} />
      ) : null}

      <div
        className={
          isPageLayout
            ? 'relative mx-auto flex min-h-full w-full max-w-[1600px] flex-col overflow-hidden rounded-[32px] border border-slate-700/70 bg-[#09111F]/95 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.95)] backdrop-blur'
            : 'relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-slate-700/70 bg-[#09111F] shadow-[0_30px_90px_-30px_rgba(15,23,42,0.95)]'
        }
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(9,17,31,0.92))] px-6 py-5">
          <div>
            <h2 className="text-xl font-black text-white">{title}</h2>
            <p className="mt-1 text-sm text-slate-400">
              Selecciona o arrastra imágenes, define la principal y guarda el producto cuando todo esté listo.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={uploadState.active}
            className="rounded-xl border border-slate-700 bg-slate-900/70 p-2 text-slate-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isPageLayout ? 'Volver al listado' : 'Cerrar'}
          >
            {isPageLayout ? <ArrowLeft className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              {!fixedType && (
                <Section
                  title="Tipo de producto"
                  description="Selecciona si este producto pertenece al catálogo digital o físico."
                >
                  <Toggle
                    options={['Digital', 'Físico']}
                    value={values.type}
                    onChange={(value) => set('type', value as ProductFormType)}
                  />
                </Section>
              )}

              <Section
                title="Galería del producto"
                description="Agrega varias imágenes, ordénalas visualmente y elige cuál será la portada principal."
              >
                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {selectedImageCount
                            ? `${selectedImageCount} imagen${selectedImageCount === 1 ? '' : 'es'} seleccionada${selectedImageCount === 1 ? '' : 's'}`
                            : 'Todavía no hay imágenes'}
                        </p>
                        <p className="text-xs text-slate-500">
                          La imagen principal se usará como portada en admin y storefront.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                        <Images className="h-3.5 w-3.5" />
                        Principal {primaryIndex >= 0 ? primaryIndex + 1 : 0}
                      </div>
                    </div>

                    {primaryImage ? (
                      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                        <div className="relative aspect-[16/10] w-full">
                          <img
                            src={getImagePreview(primaryImage)}
                            alt="Imagen principal del producto"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-blue-500/30">
                            <Star className="h-3.5 w-3.5" />
                            Principal
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 text-center">
                        <div>
                          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
                            <Images className="h-6 w-6 text-slate-500" />
                          </div>
                          <p className="text-sm font-medium text-slate-300">La portada principal aparecerá aquí</p>
                          <p className="mt-1 text-xs text-slate-500">Selecciona varias imágenes para armar la galería</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {images.map((image, index) => {
                        const isPrimary = primaryImageId === image.id;

                        return (
                          <div
                            key={image.id}
                            className={`rounded-2xl border p-2 transition-all ${
                              isPrimary
                                ? 'border-primary bg-primary/10 shadow-lg shadow-blue-500/10'
                                : 'border-slate-800 bg-[#0B1120]'
                            }`}
                          >
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-950">
                              <img
                                src={getImagePreview(image)}
                                alt={`Imagen ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-slate-950/85 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                                {isPrimary ? (
                                  <>
                                    <Check className="h-3 w-3 text-primary" />
                                    Principal
                                  </>
                                ) : (
                                  <>Imagen {index + 1}</>
                                )}
                              </div>
                              <div className="absolute bottom-2 left-2 rounded-full bg-slate-950/85 px-2 py-1 text-[10px] font-bold text-slate-200">
                                {image.kind === 'saved' ? 'Guardada' : `Nueva · ${formatFileSize(image.file.size)}`}
                              </div>
                            </div>

                            <div className="mt-3 flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant={isPrimary ? 'green' : 'secondary'}
                                className="flex-1"
                                onClick={() => setPrimaryImageId(image.id)}
                              >
                                {isPrimary ? 'Seleccionada' : 'Hacer principal'}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="px-2.5"
                                onClick={() => removeImage(image.id)}
                                disabled={uploadState.active}
                                aria-label={`Eliminar imagen ${index + 1}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`overflow-hidden rounded-2xl border-2 border-dashed bg-[linear-gradient(180deg,rgba(11,17,32,0.95),rgba(16,25,43,0.95))] transition-colors ${
                      isDragActive
                        ? 'border-primary/70'
                        : 'border-slate-700 hover:border-primary/50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelection}
                      disabled={uploadState.active}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadState.active}
                      className="flex w-full flex-col items-center justify-center p-7 text-center disabled:cursor-not-allowed"
                    >
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 transition-transform">
                        {uploadState.active ? (
                          <Loader2 className="h-7 w-7 animate-spin text-slate-200" />
                        ) : (
                          <ImagePlus className="h-7 w-7 text-slate-300" />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-200">
                        {uploadState.active ? 'Guardando producto e imágenes...' : 'Selecciona o arrastra imágenes'}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {uploadState.active
                          ? 'Estamos procesando y subiendo las imágenes a Firebase.'
                          : 'Compatible con PNG, JPG y WEBP. Las imágenes se subirán al guardar el producto.'}
                      </p>
                      {!uploadState.active ? (
                        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                          <Upload className="h-3.5 w-3.5" />
                          Abrir archivos
                        </span>
                      ) : null}
                    </button>
                  </div>

                  {uploadState.active ? (
                    <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <div>
                          <p className="text-sm font-semibold text-white">Guardando producto</p>
                          <p className="text-xs text-slate-400">
                            {uploadState.total > 0
                              ? `Imágenes procesadas ${uploadState.completed}/${uploadState.total}`
                              : 'Procesando la información del producto'}
                          </p>
                        </div>
                      </div>
                      {uploadState.total > 0 ? (
                        <>
                          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${uploadState.progress}%` }}
                            />
                          </div>
                          <p className="mt-2 text-xs font-semibold text-primary">{uploadState.progress}% completado</p>
                        </>
                      ) : null}
                    </div>
                  ) : null}

                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {errorMessage}
                    </div>
                  ) : null}
                </div>
              </Section>

              <Section
                title="Información básica"
                description="Define la portada textual y los datos principales con los que se listará el producto."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Título del producto"
                    placeholder="Ej. PS Plus Extra 12 meses"
                    value={values.title}
                    onChange={(event) => set('title', event.target.value)}
                    className="md:col-span-2"
                  />
                  <Input
                    label="Precio (USD)"
                    type="number"
                    placeholder="0.00"
                    value={values.price}
                    onChange={(event) => set('price', event.target.value)}
                  />
                  <Input
                    label="Categoría"
                    placeholder="Ej. Suscripciones, Accesorios"
                    value={values.category}
                    onChange={(event) => set('category', event.target.value)}
                  />
                  <Input
                    label="Descripción corta"
                    placeholder="Breve descripción del producto"
                    value={values.description}
                    onChange={(event) => set('description', event.target.value)}
                    className="md:col-span-2"
                  />
                </div>
              </Section>
            </div>

            <div className="space-y-6">
              <Section
                title="Visibilidad en portada"
                description="Define si este producto aparecerá en el carrusel principal de destacados de la tienda."
              >
                <div className="space-y-3">
                  <Toggle
                    options={['Normal', 'Destacado']}
                    value={values.featured ? 'Destacado' : 'Normal'}
                    onChange={(value) => set('featured', value === 'Destacado')}
                  />
                  <p className="text-sm text-slate-400">
                    Los productos destacados se mostrarán primero en la portada para resaltar ofertas, lanzamientos o promociones.
                  </p>
                </div>
              </Section>

              <Section
                title="Contenido detallado"
                description="Agrega los detalles ricos que se mostrarán en la vista completa del producto."
              >
                <RichTextEditor
                  label="Detalles y características"
                  value={values.featuresHtml}
                  onChange={(html) => set('featuresHtml', html)}
                />
              </Section>

              <Section
                title={values.type === 'Digital' ? 'Configuración digital' : 'Configuración física'}
                description={
                  values.type === 'Digital'
                    ? 'Selecciona la plataforma asociada al producto digital.'
                    : 'Completa el material y el stock disponible para este producto físico.'
                }
              >
                <div className="space-y-4">
                  {values.type === 'Digital' ? (
                    <Select
                      label="Plataforma"
                      options={PLATFORMS}
                      value={values.platform}
                      onChange={(value) => set('platform', value)}
                    />
                  ) : (
                    <>
                      <Input
                        label="Material"
                        placeholder="Ej. PLA+, PETG, Resina ABS"
                        value={values.material}
                        onChange={(event) => set('material', event.target.value)}
                      />
                      <Input
                        label="Stock disponible"
                        type="number"
                        placeholder="10"
                        value={values.stock}
                        onChange={(event) => set('stock', event.target.value)}
                      />
                    </>
                  )}
                </div>
              </Section>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-800/80 bg-[#0B1120] px-6 py-4">
          <p className="text-xs text-slate-500">
            {uploadState.active
              ? 'Estamos guardando el producto. Si falla una imagen, no se guardará nada.'
              : 'Las imágenes se procesarán y subirán únicamente cuando pulses guardar.'}
          </p>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onClose} disabled={uploadState.active}>
              {isPageLayout ? 'Volver al listado' : 'Cancelar'}
            </Button>
            <Button variant="primary" onClick={() => void handleSave()} disabled={!canSave}>
              {uploadState.active ? 'Guardando producto...' : 'Guardar producto'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
