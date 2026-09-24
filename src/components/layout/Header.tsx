"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const categories = [
  {
    name: "Smartphones",
    href: "/categories/smartphones",
  },
  {
    name: "IT & Computer",
    href: "/categories/it-computer",
  },
  {
    name: "Elektronik",
    href: "/categories/elektronik",
  },
  {
    name: "Handy-Zubehör",
    href: "/categories/handy-zubehoer",
  },
  {
    name: "Bekleidung",
    href: "/categories/bekleidung",
  },
  {
    name: "Refurbished",
    href: "/categories/refurbished",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* TOP BAR */}
      <div className="hidden bg-[#0B1220] text-white md:block">
        <div className="container-shop flex h-9 items-center justify-between text-xs">
          <p>
            Willkommen bei <span className="font-semibold">FH IT & Mobile Handel</span>
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/shipping"
              className="transition hover:text-blue-400"
            >
              Versand & Lieferung
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-blue-400"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b border-slate-100 bg-white">
        <div className="container-shop">
          <div className="flex h-[76px] items-center gap-4">
            {/* MOBILE MENU */}
            <button
              type="button"
              aria-label={
                mobileMenuOpen ? "Menü schließen" : "Menü öffnen"
              }
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* LOGO */}
            <Link
              href="/"
              aria-label="FH IT & Mobile Handel Startseite"
              className="flex shrink-0 items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/logo.svg"
                alt="FH IT & Mobile Handel"
                width={270}
                height={72}
                priority
                className="h-auto w-[185px] sm:w-[220px] md:w-[250px]"
              />
            </Link>

            {/* DESKTOP SEARCH */}
            <div className="mx-auto hidden w-full max-w-xl lg:block">
              <form
                action="/shop"
                method="GET"
                className="relative"
              >
                <input
                  type="search"
                  name="search"
                  placeholder="Was suchst du?"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  aria-label="Suchen"
                  className="absolute right-0 top-0 flex h-11 w-12 items-center justify-center rounded-r-xl text-slate-500 hover:text-blue-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* ACTIONS */}
            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              {/* MOBILE SEARCH */}
              <button
                type="button"
                aria-label="Suche öffnen"
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* ACCOUNT */}
              <Link
                href="/account"
                aria-label="Mein Konto"
                className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 sm:flex"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* FAVORITES */}
              <Link
                href="/favorites"
                aria-label="Favoriten"
                className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 sm:flex"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* CART */}
              <Link
                href="/cart"
                aria-label={`Warenkorb, ${totalItems} Artikel`}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <ShoppingCart className="h-5 w-5" />

                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* MOBILE SEARCH FIELD */}
          {searchOpen && (
            <div className="pb-4 lg:hidden">
              <form
                action="/shop"
                method="GET"
                className="relative"
              >
                <input
                  type="search"
                  name="search"
                  autoFocus
                  placeholder="Produkte suchen..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-12 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  aria-label="Suchen"
                  className="absolute right-0 top-0 flex h-11 w-12 items-center justify-center text-slate-500"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden border-b border-slate-100 bg-white md:block">
        <div className="container-shop">
          <div className="flex h-12 items-center justify-center gap-7">
            <Link
              href="/shop"
              className="text-sm font-semibold text-slate-900 hover:text-blue-600"
            >
              Shop
            </Link>

            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                {category.name}
              </Link>
            ))}

            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Über uns
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white md:hidden">
          <div className="container-shop py-4">
            <nav className="flex flex-col">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-base font-semibold text-slate-900"
              >
                Shop
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-slate-100 py-3 text-base font-medium text-slate-700 hover:text-blue-600"
                >
                  {category.name}
                </Link>
              ))}

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-base font-medium text-slate-700"
              >
                Über uns
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-base font-medium text-slate-700"
              >
                Kontakt
              </Link>

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-base font-medium text-slate-700"
              >
                <User className="h-5 w-5" />
                Mein Konto
              </Link>

              <Link
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-base font-medium text-slate-700"
              >
                <Heart className="h-5 w-5" />
                Favoriten
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}