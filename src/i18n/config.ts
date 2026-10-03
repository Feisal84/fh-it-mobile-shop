export const locales = ["de", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  ar: "العربية",
};

const rtlLocales: readonly Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

/** BCP-47 tags used for Intl formatting (prices, numbers). */
export const intlLocales: Record<Locale, string> = {
  de: "de-DE",
  en: "en-IE",
  ar: "ar-EG",
};

/** OpenGraph locale tags. */
export const ogLocales: Record<Locale, string> = {
  de: "de_DE",
  en: "en_US",
  ar: "ar_SA",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
