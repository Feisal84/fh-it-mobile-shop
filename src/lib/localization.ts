import type { Dictionary } from "../i18n/get-dictionary";

type CategoryKey = keyof Dictionary["categories"];

/**
 * Localized category name for a slug (e.g. "handy-zubehoer").
 * Falls back to the raw value stored on the product if unknown.
 */
export function localizedCategoryName(
  slug: string,
  dict: Dictionary,
  fallback?: string
): string {
  const entry = dict.categories[slug as CategoryKey];
  return entry?.name ?? fallback ?? slug;
}

/** Localized label for a product condition ("Neu" | "Refurbished" | "Gebraucht"). */
export function localizedCondition(
  condition: string | undefined,
  dict: Dictionary
): string | undefined {
  if (!condition) {
    return undefined;
  }

  return (
    dict.conditions[condition as keyof Dictionary["conditions"]] ?? condition
  );
}

/** Replaces {placeholder} tokens in a translation string. */
export function formatMessage(
  template: string,
  values: Record<string, string | number>
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template
  );
}
