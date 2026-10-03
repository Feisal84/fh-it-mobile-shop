import { lang } from "next/root-params";
import { notFound } from "next/navigation";

import type { Locale } from "./config";

const dictionaries = {
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["de"]>>;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

/** Current locale resolved from the [lang] root parameter. */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();

  if (!hasLocale(locale)) {
    notFound();
  }

  return locale;
}

/** Dictionary for the current locale (Server Components only). */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
