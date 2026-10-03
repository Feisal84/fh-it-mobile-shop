"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

import { useI18n } from "../../context/I18nContext";

/**
 * Link that automatically prefixes internal paths with the current locale,
 * e.g. "/shop" -> "/ar/shop".
 */
export default function LocaleLink({
  href,
  ...props
}: ComponentProps<typeof NextLink>) {
  const { localizePath } = useI18n();

  const localizedHref =
    typeof href === "string" ? localizePath(href) : href;

  return <NextLink href={localizedHref} {...props} />;
}
