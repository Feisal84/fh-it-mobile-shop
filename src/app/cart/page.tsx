"use client";

import Link from "next/link";

import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-shop py-24 text-center">

        <div className="text-7xl">🛒</div>

        <h1 className="mt-6 text-3xl font-black">
          Dein Warenkorb ist leer
        </h1>

        <p className="mt-3 text-gray-500">
          Entdecke unsere Produkte und füge etwas
          zu deinem Warenkorb hinzu.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
        >
          Zum Shop
        </Link>

      </div>
    );
  }

  return (
    <div className="container-shop py-12">

      <h1 className="text-4xl font-black">
        Warenkorb
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