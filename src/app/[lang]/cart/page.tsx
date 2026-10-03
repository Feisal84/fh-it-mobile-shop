"use client";

import { useCart } from "../../../context/CartContext";
import { useI18n } from "../../../context/I18nContext";
import CartItem from "../../../components/cart/CartItem";
import CartSummary from "../../../components/cart/CartSummary";
import LocaleLink from "../../../components/i18n/LocaleLink";

export default function CartPage() {
  const { items } = useCart();
  const { dict } = useI18n();

  if (items.length === 0) {
    return (
      <div className="container-shop py-24 text-center">

        <div className="text-7xl">🛒</div>

        <h1 className="mt-6 text-3xl font-black">
          {dict.cart.emptyTitle}
        </h1>

        <p className="mt-3 text-gray-500">
          {dict.cart.emptyText}
        </p>

        <LocaleLink
          href="/shop"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
        >
          {dict.common.toShop}
        </LocaleLink>

      </div>
    );
  }

  return (
    <div className="container-shop py-12">

      <h1 className="text-4xl font-black">
        {dict.cart.title}
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

        <div>
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
            />
          ))}
        </div>

        <CartSummary />

      </div>

    </div>
  );
}