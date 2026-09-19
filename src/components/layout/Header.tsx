"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

import { useCart } from "../../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* Top information bar */}
      <div className="hidden bg-[#0b1220] text-white md:block">
        <div className="container-shop flex h-9 items-center justify-between text-xs">
          <span>
            Willkommen bei FH IT & Mobile Handel
          </span>

          <div className="flex gap-6">
            <span>✓ Sichere Bestellung</span>
            <span>✓ Schneller Versand</span>
            <span>✓ Kundenservice</span>
          </div>
        </div>
      </div>

      <div className="container-shop">

        {/* Main header */}
        <div className="flex min-h-[76px] items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/logo.svg"
              alt="FH IT & Mobile - Handel & Bekleidung"
              width={360}
              height={72}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </Link>

          {/* Desktop search */}
          <div className="hidden max-w-xl flex-1 lg:block">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                placeholder="Was suchst du heute?"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-xl p-2.5 hover:bg-gray-100 lg:hidden"
              aria-label="Suche öffnen"
            >
              <Search size={21} />
            </button>

            <Link
              href="/about"
              className="hidden rounded-xl p-2.5 hover:bg-gray-100 sm:block"
              aria-label="Konto"
            >
              <User size={21} />
            </Link>

            <button
              className="hidden rounded-xl p-2.5 hover:bg-gray-100 sm:block"
              aria-label="Favoriten"
            >
              <Heart size={21} />
            </button>

            <Link
              href="/cart"
              className="relative rounded-xl p-2.5 hover:bg-gray-100"
              aria-label="Warenkorb"
            >
              <ShoppingCart size={22} />

              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl p-2.5 hover:bg-gray-100 lg:hidden"
              aria-label="Menü"
            >
              {menuOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="pb-4 lg:hidden">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                autoFocus
                type="search"
                placeholder="Produkte suchen..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Desktop navigation */}
        <nav className="hidden h-12 items-center gap-8 border-t lg:flex">

          <Link
            href="/"
            className="text-sm font-semibold text-gray-900 hover:text-blue-600"
          >
            Startseite
          </Link>

          <Link
            href="/shop"
            className="text-sm font-semibold text-gray-900 hover:text-blue-600"
          >
            Shop
          </Link>

          <Link
            href="/categories/smartphones"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Smartphones
          </Link>

          <Link
            href="/categories/it-computer"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            IT & Computer
          </Link>

          <Link
            href="/categories/elektronik"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Elektronik
          </Link>

          <Link
            href="/categories/handy-zubehoer"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Zubehör
          </Link>

          <Link
            href="/categories/bekleidung"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Bekleidung
          </Link>

          <Link
            href="/categories/refurbished"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Refurbished
          </Link>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="border-t py-5 lg:hidden">
            <div className="flex flex-col gap-1">

              {[
                ["Startseite", "/"],
                ["Shop", "/shop"],
                ["Smartphones", "/categories/smartphones"],
                ["IT & Computer", "/categories/it-computer"],
                ["Elektronik", "/categories/elektronik"],
                ["Handy-Zubehör", "/categories/handy-zubehoer"],
                ["Bekleidung", "/categories/bekleidung"],
                ["Refurbished", "/categories/refurbished"],
                ["Über uns", "/about"],
                ["Kontakt", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  {label}
                </Link>
              ))}

            </div>
          </nav>
        )}
      </div>
    </header>
  );
}