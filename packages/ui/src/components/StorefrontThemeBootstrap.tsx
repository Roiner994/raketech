'use client';

import React from 'react';
import { doc, onSnapshot, type Firestore } from 'firebase/firestore';
import {
  DEFAULT_STOREFRONT_THEME,
  resolveStorefrontTheme,
  STOREFRONT_SETTINGS_COLLECTION,
  type StorefrontId,
  type StorefrontTheme,
} from '../lib/storefrontTheme';

interface StorefrontThemeBootstrapProps {
  db: Firestore | null;
  storefrontId: StorefrontId;
}

function applyTheme(theme: StorefrontTheme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function StorefrontThemeBootstrap({
  db,
  storefrontId,
}: StorefrontThemeBootstrapProps) {
  React.useEffect(() => {
    applyTheme(DEFAULT_STOREFRONT_THEME);

    if (!db) {
      return;
    }

    const settingsRef = doc(db, STOREFRONT_SETTINGS_COLLECTION, storefrontId);

    return onSnapshot(
      settingsRef,
      (snapshot) => {
        const theme = resolveStorefrontTheme(snapshot.data()?.theme);
        applyTheme(theme);
      },
      () => {
        applyTheme(DEFAULT_STOREFRONT_THEME);
      }
    );
  }, [db, storefrontId]);

  return null;
}
