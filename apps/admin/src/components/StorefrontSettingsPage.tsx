"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Loader2, Moon, Sun } from "lucide-react";
import {
  DEFAULT_STOREFRONT_THEME,
  STOREFRONT_SETTINGS_COLLECTION,
  resolveStorefrontTheme,
  type StorefrontId,
  type StorefrontTheme,
  ToastList,
  useToast,
} from "@raketech/ui";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type StorefrontConfig = {
  id: StorefrontId;
  name: string;
  previewHref: string;
};

interface StorefrontSettingsPageProps {
  storefronts: StorefrontConfig[];
}

type SettingsState = Record<
  StorefrontId,
  { theme: StorefrontTheme; savedTheme: StorefrontTheme; isLoading: boolean; isSaving: boolean }
>;

const THEME_OPTIONS: Array<{
  value: StorefrontTheme;
  label: string;
  description: string;
  icon: typeof Moon;
}> = [
  {
    value: "dark",
    label: "Oscuro",
    description: "Mantiene la experiencia premium actual.",
    icon: Moon,
  },
  {
    value: "light",
    label: "Claro",
    description: "Activa la nueva paleta clara para esta tienda.",
    icon: Sun,
  },
];

function getInitialState(storefronts: StorefrontConfig[]): SettingsState {
  return storefronts.reduce((acc, storefront) => {
    acc[storefront.id] = {
      theme: DEFAULT_STOREFRONT_THEME,
      savedTheme: DEFAULT_STOREFRONT_THEME,
      isLoading: true,
      isSaving: false,
    };
    return acc;
  }, {} as SettingsState);
}

function getStateLabel(theme: StorefrontTheme) {
  return theme === "light" ? "Claro" : "Oscuro";
}

export function StorefrontSettingsPage({ storefronts }: StorefrontSettingsPageProps) {
  const [state, setState] = useState<SettingsState>(() => getInitialState(storefronts));
  const toast = useToast();
  const { showToast, toasts, dismissToast } = toast;

  useEffect(() => {
    let alive = true;

    const loadSettings = async () => {
      const entries = await Promise.all(
        storefronts.map(async (storefront) => {
          try {
            const settingsRef = doc(db, STOREFRONT_SETTINGS_COLLECTION, storefront.id);
            const snapshot = await getDoc(settingsRef);
            const resolvedTheme = resolveStorefrontTheme(snapshot.data()?.theme);

            return [
              storefront.id,
              {
                theme: resolvedTheme,
                savedTheme: resolvedTheme,
                isLoading: false,
                isSaving: false,
              },
            ] as const;
          } catch (error) {
            console.error(`Error loading storefront theme settings for ${storefront.id}:`, error);
            showToast("Error cargando la configuración", {
              description: `Se usará el modo oscuro como respaldo para ${storefront.name}.`,
              variant: "error",
            });
            return [
              storefront.id,
              {
                theme: DEFAULT_STOREFRONT_THEME,
                savedTheme: DEFAULT_STOREFRONT_THEME,
                isLoading: false,
                isSaving: false,
              },
            ] as const;
          }
        })
      );

      if (!alive) return;
      setState((current) => ({ ...current, ...Object.fromEntries(entries) }));
    };

    void loadSettings();

    return () => {
      alive = false;
    };
  }, [showToast, storefronts]);

  const handleSave = async (storefront: StorefrontConfig) => {
    const current = state[storefront.id];
    if (!current) return;

    try {
      setState((prev) => ({
        ...prev,
        [storefront.id]: { ...prev[storefront.id], isSaving: true },
      }));

      await setDoc(
        doc(db, STOREFRONT_SETTINGS_COLLECTION, storefront.id),
        {
          theme: current.theme,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setState((prev) => ({
        ...prev,
        [storefront.id]: {
          ...prev[storefront.id],
          savedTheme: current.theme,
          isSaving: false,
        },
      }));

      showToast("Tema actualizado", {
        description: `${storefront.name} ahora se mostrará en modo ${getStateLabel(current.theme)}.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Error saving storefront theme settings:", error);
      setState((prev) => ({
        ...prev,
        [storefront.id]: { ...prev[storefront.id], isSaving: false },
      }));
      showToast("No se pudo guardar el tema", {
        description: "Revisa tu conexión e inténtalo nuevamente.",
        variant: "error",
      });
    }
  };

  return (
    <>
      <div className="space-y-8 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al dashboard
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white">Settings</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Cambia aquí el tema público de ambos proyectos. Cada storefront guarda su configuración por separado en Firebase.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {storefronts.map((storefront) => {
            const current = state[storefront.id];
            const isLoading = current?.isLoading ?? true;
            const isSaving = current?.isSaving ?? false;
            const hasChanges = current ? current.theme !== current.savedTheme : false;

            return (
              <section
                key={storefront.id}
                className="rounded-[28px] border border-slate-800 bg-[#10192B] p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.95)]"
              >
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                      Configuración visual
                    </p>
                    <h2 className="mt-2 text-xl font-black text-white">{storefront.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Elige el modo visual que verán los usuarios de esta tienda.
                    </p>
                  </div>

                  <Link
                    href={storefront.previewHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                  >
                    Abrir storefront
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>

                {isLoading ? (
                  <div className="flex min-h-52 items-center justify-center">
                    <Loader2 className="h-7 w-7 animate-spin text-slate-400" />
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {THEME_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isActive = current?.theme === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              [storefront.id]: {
                                ...prev[storefront.id],
                                theme: option.value,
                              },
                            }))
                          }
                          className={[
                            "rounded-[24px] border p-5 text-left transition-all",
                            isActive
                              ? "border-blue-500/40 bg-blue-500/10 shadow-[0_20px_45px_-35px_rgba(59,130,246,0.75)]"
                              : "border-slate-800 bg-[#0B1120] hover:border-slate-700 hover:bg-slate-950",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                                <Icon className="h-5 w-5 text-slate-100" />
                              </div>
                              <h3 className="mt-4 text-lg font-bold text-white">{option.label}</h3>
                              <p className="mt-1 text-sm text-slate-400">{option.description}</p>
                            </div>
                            <span
                              className={[
                                "mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                                isActive
                                  ? "border-blue-400 bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.14)]"
                                  : "border-slate-600 bg-transparent",
                              ].join(" ")}
                            >
                              <span
                                className={[
                                  "h-2 w-2 rounded-full",
                                  isActive ? "bg-white" : "bg-transparent",
                                ].join(" ")}
                              />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Tema guardado</p>
                  <p className="mt-1 text-2xl font-black text-white">
                    {getStateLabel(current?.savedTheme ?? DEFAULT_STOREFRONT_THEME)}
                  </p>
                  <p className="mt-4 text-sm text-slate-400">Tema seleccionado</p>
                  <p className="mt-1 text-2xl font-black text-white">
                    {getStateLabel(current?.theme ?? DEFAULT_STOREFRONT_THEME)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void handleSave(storefront)}
                  disabled={isLoading || isSaving || !hasChanges}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Guardar configuración
                </button>
              </section>
            );
          })}
        </div>
      </div>

      <ToastList toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
