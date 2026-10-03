"use client";

import Image from "next/image";
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
import { useI18n } from "../../context/I18nContext";
import { formatMessage } from "../../lib/localization";
import LocaleLink from "../i18n/LocaleLink";
import LanguageSwitcher from "../i18n/LanguageSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { totalItems } = useCart();
  const { dict, localizePath } = useI18n();

  const categories = Object.entries(dict.categories).map(
    ([slug, category]) => ({
      name: category.name,
      href: `/categories/${slug}`,
    })
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* TOP BAR */}
      <div className="hidden bg-[#0B1220] text-white md:block">
        <div className="container-shop flex h-9 items-center justify-between text-xs">
          <p>
            {dict.header.welcome}{" "}
            <span className="font-semibold">FH IT & Mobile Handel</span>
          </p>

          <div className="flex items-center gap-5">
            <LocaleLink
              href="/shipping"
              className="transition hover:text-blue-400"
            >
              {dict.header.shipping}
            </LocaleLink>

            <LocaleLink
              href="/contact"
              className="transition hover:text-blue-400"
            >
              {dict.header.contact}
            </LocaleLink>
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
                mobileMenuOpen
                  ? dict.header.closeMenuAria
                  : dict.header.openMenuAria
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
            <LocaleLink
              href="/"
              aria-label={dict.header.logoAria}
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
            </LocaleLink>

            {/* DESKTOP SEARCH */}
            <div className="mx-auto hidden w-full max-w-xl lg:block">
              <form
                action={localizePath("/shop")}
                method="GET"
                className="relative"
              >
                <input
                  type="search"
                  name="search"
                  placeholder={dict.header.searchPlaceholder}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 ps-4 pe-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  aria-label={dict.header.searchAria}
                  className="absolute end-0 top-0 flex h-11 w-12 items-center justify-center rounded-e-xl text-slate-500 hover:text-blue-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* ACTIONS */}
            <div className="ms-auto flex shrink-0 items-center gap-1 sm:gap-2">
              {/* MOBILE SEARCH */}
              <button
                type="button"
                aria-label={dict.header.openSearchAria}
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* LANGUAGE SWITCHER */}
              <LanguageSwitcher />

              {/* ACCOUNT */}
              <LocaleLink
                href="/account"
                aria-label={dict.header.accountAria}
                className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 sm:flex"
              >
                <User className="h-5 w-5" />
              </LocaleLink>

              {/* FAVORITES */}
              <LocaleLink
                href="/favorites"
                aria-label={dict.header.favoritesAria}
                className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 sm:flex"
              >
                <Heart className="h-5 w-5" />
              </LocaleLink>

              {/* CART */}
              <LocaleLink
                href="/cart"
                aria-label={formatMessage(dict.header.cartAria, {
                  count: totalItems,
                })}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <ShoppingCart className="h-5 w-5" />

                {totalItems > 0 && (
                  <span className="absolute -end-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </LocaleLink>
            </div>
          </div>

          {/* MOBILE SEARCH FIELD */}
          {searchOpen && (
            <div className="pb-4 lg:hidden">
              <form
                action={localizePath("/shop")}
                method="GET"
                className="relative"
              >
                <input
                  type="search"
                  name="search"
                  autoFocus
                  placeholder={dict.header.searchPlaceholderMobile}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 ps-4 pe-12 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  aria-label={dict.header.searchAria}
                  className="absolute end-0 top-0 flex h-11 w-12 items-center justify-center text-slate-500"
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
            <LocaleLink
              href="/shop"
              className="text-sm font-semibold text-slate-900 hover:text-blue-600"
            >
              {dict.header.shop}
            </LocaleLink>

            {categories.map((category) => (
              <LocaleLink
                key={category.href}
                href={category.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                {category.name}
              </LocaleLink>
            ))}

            <LocaleLink
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              {dict.header.about}
            </LocaleLink>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white md:hidden">
          <div className="container-shop py-4">
            <nav className="flex flex-col">
              <LocaleLink
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-base font-semibold text-slate-900"
              >
                {dict.header.shop}
              </LocaleLink>

              {categories.map((category) => (
                <LocaleLink
                  key={category.href}
                  href={category.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-slate-100 py-3 text-base font-medium text-slate-700 hover:text-blue-600"
                >
                  {category.name}
                </LocaleLink>
              ))}

              <LocaleLink
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-base font-medium text-slate-700"
              >
                {dict.header.about}
              </LocaleLink>

              <LocaleLink
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-base font-medium text-slate-700"
              >
                {dict.header.contact}
              </LocaleLink>

              <LocaleLink
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-base font-medium text-slate-700"
              >
                <User className="h-5 w-5" />
                {dict.header.myAccount}
              </LocaleLink>

              <LocaleLink
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-base font-medium text-slate-700"
              >
                <Heart className="h-5 w-5" />
                {dict.header.favoritesAria}
              </LocaleLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}