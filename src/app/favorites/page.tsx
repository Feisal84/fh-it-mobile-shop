"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import ProductGrid from "../../components/products/ProductGrid";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="container-shop py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Merkliste
        </p>
        <h1 className="mt-2 text-4xl font-black">Favoriten</h1>
        <p className="mt-3 text-gray-500">
          Produkte, die Sie fuer spaeter gespeichert haben.
        </p>
      </div>

      {favorites.length > 0 ? (
        <ProductGrid products={favorites} />
      ) : (
        <div className="flex flex-col items-center border-y py-16 text-center">
          <Heart className="h-9 w-9 text-slate-300" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Noch keine Favoriten
          </h2>
          <p className="mt-2 text-gray-500">
            Speichern Sie Produkte mit dem Herz-Symbol auf Ihrer Merkliste.
          </p>
          <Link
            href="/shop"
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Zum Shop
          </Link>
        </div>
      )}
    </div>
  );
}