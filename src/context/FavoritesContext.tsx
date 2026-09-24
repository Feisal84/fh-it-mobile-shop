"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";

const FAVORITES_STORAGE_KEY = "fh-favorites";
const EMPTY_FAVORITES: Product[] = [];
let cachedFavorites = EMPTY_FAVORITES;
let cachedFavoritesValue: string | null = null;

function getStoredFavorites(): Product[] {
  if (typeof window === "undefined") {
    return EMPTY_FAVORITES;
  }

  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (storedFavorites === cachedFavoritesValue) {
    return cachedFavorites;
  }

  cachedFavoritesValue = storedFavorites;

  try {
    const parsedFavorites: unknown = storedFavorites
      ? JSON.parse(storedFavorites)
      : EMPTY_FAVORITES;
    cachedFavorites = Array.isArray(parsedFavorites)
      ? parsedFavorites
      : EMPTY_FAVORITES;
  } catch (error) {
    console.error("Favoriten konnten nicht geladen werden:", error);
    cachedFavorites = EMPTY_FAVORITES;
  }

  return cachedFavorites;
}

function subscribeToFavorites(callback: () => void) {
  const handleStorageChange = () => callback();

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("fh-favorites-change", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("fh-favorites-change", handleStorageChange);
  };
}

function saveFavorites(items: Product[]) {
  const serializedFavorites = JSON.stringify(items);

  cachedFavorites = items;
  cachedFavoritesValue = serializedFavorites;
  localStorage.setItem(FAVORITES_STORAGE_KEY, serializedFavorites);
  window.dispatchEvent(new Event("fh-favorites-change"));
}

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useSyncExternalStore(
    subscribeToFavorites,
    getStoredFavorites,
    () => EMPTY_FAVORITES
  );

  function toggleFavorite(product: Product) {
    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === product.id
    );

    saveFavorites(
      alreadyFavorite
        ? favorites.filter((favorite) => favorite.id !== product.id)
        : [...favorites, product]
    );
  }

  function isFavorite(productId: string) {
    return favorites.some((favorite) => favorite.id === productId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}