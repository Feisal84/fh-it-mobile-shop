"use client";

import { Heart } from "lucide-react";

import ProductGrid from "../../../components/products/ProductGrid";
import { useFavorites } from "../../../context/FavoritesContext";
import { useI18n } from "../../../context/I18nContext";
import LocaleLink from "../../../components/i18n/LocaleLink";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { dict } = useI18n();

  return (
    <div className="container-shop py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {dict.favorites.eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-black">{dict.favorites.title}</h1>
        <p className="mt-3 text-gray-500">
          {dict.favorites.subtitle}
        </p>
      </div>

      {favorites.length > 0 ? (
        <ProductGrid products={favorites} />
      ) : (
        <div className="flex flex-col items-center border-y py-16 text-center">
          <Heart className="h-9 w-9 text-slate-300" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            {dict.favorites.emptyTitle}
          </h2>
          <p className="mt-2 text-gray-500">
            {dict.favorites.emptyText}
          </p>
          <LocaleLink
            href="/shop"
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            {dict.common.toShop}
          </LocaleLink>
        </div>
      )}
    </div>
  );
}