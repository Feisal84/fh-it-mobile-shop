import type { MetadataRoute } from "next";

import { categories } from "../data/categories";
import { products } from "../data/products";
import { locales } from "../i18n/config";

const siteUrl = "https://fhhandle.de";

export const dynamic = "force-static";

type SitemapEntry = MetadataRoute.Sitemap[number];

function localizedEntries(
  path: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`])
  );

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries("", "weekly", 1),
    ...localizedEntries("/shop", "weekly", 0.9),
    ...localizedEntries("/about", "monthly", 0.5),
    ...localizedEntries("/contact", "monthly", 0.5),
    ...categories.flatMap((category) =>
      localizedEntries(`/categories/${category.slug}`, "weekly", 0.8)
    ),
    ...products.flatMap((product) =>
      localizedEntries(`/product/${product.slug}`, "weekly", 0.7)
    ),
  ];
}