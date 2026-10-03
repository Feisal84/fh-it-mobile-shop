"use client";

import LocaleLink from "../i18n/LocaleLink";
import { useI18n } from "../../context/I18nContext";

export function MobileMenu() {
  const { dict } = useI18n();

  return (
    <nav className="mobile-menu">
      <LocaleLink href="/shop">{dict.header.shop}</LocaleLink>
      <LocaleLink href="/cart">{dict.cart.title}</LocaleLink>
    </nav>
  );
}