"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = "fh-cart";
const EMPTY_CART: CartItem[] = [];
let cachedCart = EMPTY_CART;
let cachedCartValue: string | null = null;

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (storedCart === cachedCartValue) {
    return cachedCart;
  }

  cachedCartValue = storedCart;

  try {
    const parsedCart: unknown = storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    cachedCart = Array.isArray(parsedCart) ? parsedCart : EMPTY_CART;
  } catch (error) {
    console.error("Warenkorb konnte nicht geladen werden:", error);
    cachedCart = EMPTY_CART;
  }

  return cachedCart;
}

function subscribeToCart(callback: () => void) {
  const handleStorageChange = () => callback();

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("fh-cart-change", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("fh-cart-change", handleStorageChange);
  };
}

function saveCart(items: CartItem[]) {
  const serializedCart = JSON.stringify(items);

  cachedCart = items;
  cachedCartValue = serializedCart;
  localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  window.dispatchEvent(new Event("fh-cart-change"));
}

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToCart,
    getStoredCart,
    () => EMPTY_CART
  );

  function addToCart(product: Product) {
    const existingItem = items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      saveCart(
        items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock),
              }
            : item
        )
      );
      return;
    }

    saveCart([...items, { product, quantity: 1 }]);
  }

  function removeFromCart(productId: string) {
    saveCart(items.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    saveCart(
      items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(quantity, item.product.stock),
            }
          : item
      )
    );
  }

  function clearCart() {
    saveCart([]);
  }

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}