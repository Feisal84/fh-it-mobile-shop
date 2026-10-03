import type { Product } from "../types/product";
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
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
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
    category: row.category,
    categorySlug: row.category_slug,
    condition: row.condition ?? undefined,
    rating:
      row.rating != null
        ? Number(row.rating)
        : 0,
    reviews: Number(row.review_count ?? row.reviews ?? 0),
    stock: Number(row.stock ?? 0),
    featured: Boolean(row.is_featured ?? row.featured),
    description: row.description,
  };
}

export async function getProducts(): Promise<Product[]> {
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

  return (data ?? []).map(mapProduct);
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

  return (data ?? []).map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
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

  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(
  slug: string
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

  return mapProduct(data);
}

export async function getProductsByCategory(
  categorySlug: string
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

  return (data ?? []).map(mapProduct);
}