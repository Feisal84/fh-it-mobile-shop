"use client";

import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Product } from "../../types/shop";
import { formatPrice } from "../../lib/utils";
import { useCart } from "../../context/CartContext";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shop-shadow shop-shadow-hover">

      {/* Image */}
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gray-50">

        <Link
          href={`/product/${product.slug}`}
          className="flex h-full w-full items-center justify-center"
        >
          <div className="text-8xl transition duration-300 group-hover:scale-110">
            {product.categorySlug === "smartphones" && "📱"}
            {product.categorySlug === "it-computer" && "💻"}
            {product.categorySlug === "elektronik" && "🎧"}
            {product.categorySlug === "handy-zubehoer" && "🔌"}
            {product.categorySlug === "bekleidung" && "👕"}
            {product.categorySlug === "refurbished" && "♻️"}
          </div>
        </Link>

        {/* Condition */}
        {product.condition && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${
              product.condition === "Refurbished"
                ? "bg-green-100 text-green-700"
                : product.condition === "Gebraucht"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-white text-gray-700"
            }`}
          >
            {product.condition}
          </span>
        )}

        {/* Discount */}
        {product.oldPrice && (
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
            Angebot
          </span>
        )}

        {/* Favorite */}
        <button
          onClick={(event) => {
            event.preventDefault();
          }}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
          aria-label="Zu Favoriten"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Information */}
      <div className="p-5">

        <div className="text-xs font-medium text-gray-400">
          {product.brand || product.category}
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 min-h-[48px] line-clamp-2 font-bold leading-6 text-gray-900 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1.5">

          <div className="flex items-center gap-0.5 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
          </div>

          <span className="text-xs font-semibold text-gray-600">
            {product.rating}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviews})
          </span>

        </div>

        {/* Price */}
        <div className="mt-5 flex items-end justify-between gap-3">

          <div>
            <div className="text-xl font-black text-gray-950">
              {formatPrice(product.price)}
            </div>

            {product.oldPrice && (
              <div className="mt-0.5 text-sm text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
            aria-label="In den Warenkorb"
          >
            <ShoppingCart size={19} />
          </button>

        </div>

        {/* Stock */}
        <div className="mt-4 flex items-center gap-2 text-xs">

          <span
            className={`h-2 w-2 rounded-full ${
              product.stock > 0
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          <span className="text-gray-500">
            {product.stock > 0
              ? `${product.stock} auf Lager`
              : "Nicht verfügbar"}
          </span>

        </div>

      </div>
    </article>
  );
}