import type { Product } from "../types/product";
import type { Locale } from "../i18n/config";
import { supabase } from "./supabase";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  price_cents: number;
  old_price_cents: number | null;
  image?: string | null;
  image_url?: string | null;
  category: string;
  category_slug: string;
  condition: Product["condition"] | null;
  rating?: number | null;
  review_count?: number | null;
  reviews?: number | null;
  stock: number | null;
  is_featured?: boolean | null;
  featured?: boolean | null;
  description: string;
  // Optional translations (fall back to the German base columns)
  name_en?: string | null;
  name_ar?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  category_en?: string | null;
  category_ar?: string | null;
};

function mapProduct(row: ProductRow, locale: Locale = "de"): Product {
  const translatedName =
    locale === "en" ? row.name_en : locale === "ar" ? row.name_ar : null;
  const translatedDescription =
    locale === "en"
      ? row.description_en
      : locale === "ar"
        ? row.description_ar
        : null;
  const translatedCategory =
    locale === "en"
      ? row.category_en
      : locale === "ar"
        ? row.category_ar
        : null;

  return {
    id: row.id,
    name: translatedName || row.name,
    slug: row.slug,
    price: Number(row.price_cents) / 100,
    oldPrice:
      row.old_price_cents != null
        ? Number(row.old_price_cents) / 100
        : undefined,
    image:
      row.image ||
      row.image_url ||
      "/images/products/product-placeholder.jpg",
    category: translatedCategory || row.category,
    categorySlug: row.category_slug,
    condition: row.condition ?? undefined,
    rating:
      row.rating != null
        ? Number(row.rating)
        : 0,
    reviews: Number(row.review_count ?? row.reviews ?? 0),
    stock: Number(row.stock ?? 0),
    featured: Boolean(row.is_featured ?? row.featured),
    description: translatedDescription || row.description,
  };
}

export async function getProducts(locale: Locale = "de"): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Fehler beim Laden der Produkte:",
      error
    );

    return [];
  }

  return (data ?? []).map((row) => mapProduct(row, locale));
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .in("id", ids);

  if (error) {
    console.error("Fehler beim Laden der Produkte nach IDs:", error);
    return [];
  }

  // Always returns the base (German) data; used by the checkout API route.
  return (data ?? []).map((row) => mapProduct(row));
}

export async function getFeaturedProducts(locale: Locale = "de"): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Fehler beim Laden der Featured-Produkte:",
      error
    );

    return [];
  }

  return (data ?? []).map((row) => mapProduct(row, locale));
}

export async function getProductBySlug(
  slug: string,
  locale: Locale = "de"
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error(
      "Fehler beim Laden des Produkts:",
      error
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return mapProduct(data, locale);
}

export async function getProductsByCategory(
  categorySlug: string,
  locale: Locale = "de"
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("category_slug", categorySlug)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Fehler beim Laden der Kategorie:",
      error
    );

    return [];
  }

  return (data ?? []).map((row) => mapProduct(row, locale));
}