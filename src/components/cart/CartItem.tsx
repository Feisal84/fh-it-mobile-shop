"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem as CartItemType } from "../../context/CartContext";
import { useCart } from "../../context/CartContext";
import { useI18n } from "../../context/I18nContext";
import { formatPrice } from "../../lib/utils";
import LocaleLink from "../i18n/LocaleLink";

export default function CartItem({
  item,
}: {
  item: CartItemType;
}) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { locale, dict } = useI18n();

  return (
    <div className="flex gap-5 border-b py-6">

      <LocaleLink href={`/product/${item.product.slug}`} className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image src={item.product.image} alt={item.product.name} fill sizes="112px" className="object-cover" />
      </LocaleLink>

      <div className="flex flex-1 flex-col justify-between">

        <div className="flex justify-between gap-4">
          <div>
            <LocaleLink href={`/product/${item.product.slug}`} className="font-bold hover:text-blue-600">
              {item.product.name}
            </LocaleLink>

            <p className="mt-1 text-sm text-gray-500">
              {formatPrice(item.product.price, locale)}
            </p>
          </div>

          <button
            type="button"
            aria-label={dict.product.removeFromCart}
            onClick={() =>
              removeFromCart(item.product.id)
            }
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 size={19} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center rounded-lg border">
            <button
              type="button"
              aria-label={dict.product.decreaseQuantity}
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.quantity - 1
                )
              }
              className="p-2 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-10 text-center">
              {item.quantity}
            </span>

            <button
              type="button"
              aria-label={dict.product.increaseQuantity}
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.quantity + 1
                )
              }
              disabled={item.quantity >= item.product.stock}
              className="p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="font-bold">
            {formatPrice(
              item.product.price * item.quantity,
              locale
            )}
          </div>

        </div>
      </div>

    </div>
  );
}