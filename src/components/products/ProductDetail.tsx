"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Check, Heart, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useI18n } from "../../context/I18nContext";
import { formatPrice } from "../../lib/utils";
import { formatMessage, localizedCategoryName, localizedCondition } from "../../lib/localization";
import LocaleLink from "../i18n/LocaleLink";
import type { Product } from "../../types/product";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { locale, dict } = useI18n();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const stock = product.stock;
  const isOnSale = typeof product.oldPrice === "number" && product.oldPrice > product.price;
  const discount = isOnSale
    ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
    : 0;
  const favorite = isFavorite(product.id);

  const categoryName = localizedCategoryName(product.categorySlug, dict, product.category);
  const conditionLabel = localizedCondition(product.condition, dict);

  function handleAddToCart() {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(product);
    }

    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <section className="bg-white">
      <div className="container-shop py-8 sm:py-12">
        <LocaleLink href="/shop" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600">
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
          {dict.product.backToShop}
        </LocaleLink>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            {isOnSale && <span className="absolute start-5 top-5 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow">-{discount}%</span>}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">{categoryName}</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{product.name}</h1>
            {product.reviews > 0 && (
              <p className="mt-4 text-sm text-slate-500">{formatMessage(dict.product.ratingText, { rating: product.rating.toFixed(1), reviews: product.reviews })}</p>
            )}

            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-extrabold text-slate-900">{formatPrice(product.price, locale)}</span>
              {isOnSale && <span className="mb-1 text-lg text-slate-400 line-through">{formatPrice(product.oldPrice!, locale)}</span>}
            </div>
            <p className="mt-2 text-sm text-slate-500">{dict.product.vatNote}</p>

            {conditionLabel && (
              <div className="mt-6 rounded-lg bg-slate-50 p-4">
                <span className="text-sm text-slate-500">{dict.product.condition}</span>
                <p className="mt-1 font-bold text-slate-900">{conditionLabel}</p>
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-lg font-bold text-slate-900">{dict.product.description}</h2>
              <p className="mt-3 leading-7 text-slate-600">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {stock > 0 ? <><Check className="h-5 w-5 text-green-600" /><span className="text-sm font-semibold text-green-600">{dict.product.inStock}{stock <= 5 ? ` - ${formatMessage(dict.product.onlyLeft, { count: stock })}` : ""}</span></> : <span className="font-semibold text-red-600">{dict.product.currentlyUnavailable}</span>}
            </div>

            {stock > 0 && <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-14 items-center rounded-lg border border-slate-300">
                <button type="button" onClick={() => setQuantity((current) => Math.max(current - 1, 1))} disabled={quantity <= 1} aria-label={dict.product.decreaseQuantity} className="flex h-full w-12 items-center justify-center text-slate-600 hover:text-blue-600 disabled:opacity-30"><Minus className="h-4 w-4" /></button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => Math.min(current + 1, stock))} disabled={quantity >= stock} aria-label={dict.product.increaseQuantity} className="flex h-full w-12 items-center justify-center text-slate-600 hover:text-blue-600 disabled:opacity-30"><Plus className="h-4 w-4" /></button>
              </div>
              <button type="button" onClick={handleAddToCart} className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 font-bold text-white transition hover:bg-blue-700"><ShoppingCart className="h-5 w-5" />{added ? dict.product.addedToCart : dict.product.addToCart}</button>
              <button type="button" onClick={() => toggleFavorite(product)} aria-label={favorite ? dict.product.removeFavoriteAria : dict.product.addFavoriteAria} aria-pressed={favorite} className={`flex h-14 w-14 items-center justify-center rounded-lg border border-slate-300 hover:border-blue-600 hover:text-blue-600 ${favorite ? "text-red-600" : "text-slate-600"}`}><Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} /></button>
            </div>}

            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
              <div className="flex gap-3"><Truck className="h-5 w-5 shrink-0 text-blue-600" /><div><p className="font-semibold text-slate-900">{dict.product.shippingTitle}</p><p className="mt-1 text-xs text-slate-500">{dict.product.shippingText}</p></div></div>
              <div className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" /><div><p className="font-semibold text-slate-900">{dict.product.secureTitle}</p><p className="mt-1 text-xs text-slate-500">{dict.product.secureText}</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}