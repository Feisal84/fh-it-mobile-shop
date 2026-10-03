"use client";

import { useCart } from "../../context/CartContext";
import { useI18n } from "../../context/I18nContext";
import { formatPrice } from "../../lib/utils";
import LocaleLink from "../i18n/LocaleLink";

export default function CartSummary() {
  const { totalPrice } = useCart();
  const { locale, dict } = useI18n();

  const shipping = totalPrice >= 50 ? 0 : 4.99;
  const finalTotal = totalPrice + shipping;

  return (
    <div className="rounded-2xl border bg-gray-50 p-6">

      <h2 className="text-xl font-black">
        {dict.cart.summary}
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>{dict.cart.subtotal}</span>
          <span>{formatPrice(totalPrice, locale)}</span>
        </div>

        <div className="flex justify-between">
          <span>{dict.cart.shipping}</span>

          <span>
            {shipping === 0
              ? dict.cart.free
              : formatPrice(shipping, locale)}
          </span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-black">
            <span>{dict.cart.total}</span>
            <span>{formatPrice(finalTotal, locale)}</span>
          </div>
        </div>

      </div>

      <LocaleLink
        href="/checkout"
        className="mt-6 block rounded-xl bg-blue-600 px-5 py-4 text-center font-bold text-white hover:bg-blue-700"
      >
        {dict.cart.checkout}
      </LocaleLink>

    </div>
  );
}