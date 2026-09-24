
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
  Check,
} from "lucide-react";

import { Product } from "../../types/shop";
import { formatPrice } from "../../lib/utils";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isOnSale =
    typeof product.oldPrice === "number" &&
    product.oldPrice > product.price;

  const discount = isOnSale
    ? Math.round(
        ((product.oldPrice! - product.price) /
          product.oldPrice!) *
          100
      )
    : 0;

  const productImage =
    product.image ||
    "/images/products/product-placeholder.jpg";

  const rating = product.rating || 0;

  const stock =
    typeof product.stock === "number"
      ? product.stock
      : 0;

  const isAvailable = stock > 0;
  const favorite = isFavorite(product.id);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      {/* IMAGE AREA */}
     <div className="relative aspect-square overflow-hidden bg-slate-100">
  <Link
    href={`/product/${product.slug}`}
    className="absolute inset-0"
  >
    <Image
      src={productImage}
      alt={product.name}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-cover transition duration-500 group-hover:scale-105"
    />
  </Link>

  {isOnSale && (
    <span className="absolute left-3 top-3 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
      -{discount}%
    </span>
  )}

  {product.condition && (
    <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow backdrop-blur">
      {product.condition}
    </span>
  )}

  <button
    type="button"
    aria-label={`${product.name} ${favorite ? "aus Favoriten entfernen" : "zu Favoriten hinzufügen"}`}
    aria-pressed={favorite}
    onClick={() => toggleFavorite(product)}
    className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:bg-blue-600 hover:text-white ${
      favorite ? "text-red-600" : "text-slate-600"
    }`}
  >
    <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
  </button>
</div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        {/* CATEGORY */}
        {product.category && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
            {product.category}
          </p>
        )}

        {/* PRODUCT NAME */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[48px] text-sm font-bold leading-6 text-slate-900 transition hover:text-blue-600 sm:text-base">
            {product.name}
          </h3>
        </Link>

        {/* RATING */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>

          {rating > 0 && (
            <span className="text-xs font-medium text-slate-500">
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* CONDITION / STOCK */}
        <div className="mt-3 flex items-center justify-between gap-2">
          {product.condition && (
            <span className="text-xs text-slate-500">
              Zustand:{" "}
              <span className="font-semibold text-slate-700">
                {product.condition}
              </span>
            </span>
          )}

          {isAvailable ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <Check className="h-3.5 w-3.5" />
              Auf Lager
            </span>
          ) : (
            <span className="text-xs font-semibold text-red-600">
              Nicht verfügbar
            </span>
          )}
        </div>

        {/* PRICE */}
        <div className="mt-4">
          <div className="flex items-end gap-2">
            <span className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              {formatPrice(product.price)}
            </span>

            {isOnSale && (
              <span className="mb-0.5 text-sm text-slate-400 line-through">
                {formatPrice(product.oldPrice!)}
              </span>
            )}
          </div>

          <p className="mt-1 text-[11px] text-slate-400">
            inkl. MwSt. zzgl. Versand
          </p>
        </div>

        {/* CART BUTTON */}
        <button
          type="button"
          disabled={!isAvailable}
          onClick={() => addToCart(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <ShoppingCart className="h-4 w-4" />

          {isAvailable
            ? "In den Warenkorb"
            : "Nicht verfügbar"}
        </button>
      </div>
    </article>
  );
}