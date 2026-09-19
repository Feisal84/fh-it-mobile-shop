"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { CartItem as CartItemType } from "../../types/shop";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";

export default function CartItem({
  item,
}: {
  item: CartItemType;
}) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="flex gap-5 border-b py-6">

      <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-5xl">
        {item.product.categorySlug === "smartphones" && "📱"}
        {item.product.categorySlug === "it-computer" && "💻"}
        {item.product.categorySlug === "elektronik" && "🎧"}
        {item.product.categorySlug === "handy-zubehoer" && "🔌"}
        {item.product.categorySlug === "bekleidung" && "👕"}
        {item.product.categorySlug === "refurbished" && "♻️"}
      </div>

      <div className="flex flex-1 flex-col justify-between">

        <div className="flex justify-between gap-4">
          <div>
            <h3 className="font-bold">
              {item.product.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {formatPrice(item.product.price)}
            </p>
          </div>

          <button
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
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.quantity + 1
                )
              }
              className="p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="font-bold">
            {formatPrice(
              item.product.price * item.quantity
            )}
          </div>

        </div>
      </div>

    </div>
  );
}