"use client";

import Link from "next/link";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";

export default function CartSummary() {
  const { totalPrice } = useCart();

  const shipping = totalPrice >= 50 ? 0 : 4.99;
  const finalTotal = totalPrice + shipping;

  return (
    <div className="rounded-2xl border bg-gray-50 p-6">

      <h2 className="text-xl font-black">
        Bestellübersicht
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>Zwischensumme</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between">
          <span>Versand</span>

          <span>
            {shipping === 0
              ? "Kostenlos"
              : formatPrice(shipping)}
          </span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-black">
            <span>Gesamt</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>

      </div>

      <Link
        href="/checkout"
        className="mt-6 block rounded-xl bg-blue-600 px-5 py-4 text-center font-bold text-white hover:bg-blue-700"
      >
        Zur Kasse
      </Link>

    </div>
  );
}