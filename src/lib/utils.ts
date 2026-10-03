import { intlLocales, type Locale } from "../i18n/config";

export function formatPrice(price: number, locale: Locale = "de") {
  return new Intl.NumberFormat(intlLocales[locale], {
    style: "currency",
    currency: "EUR",
  }).format(price);
}