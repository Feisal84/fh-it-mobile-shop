import type { Product } from "../types/product";

import { supabase } from "./supabase";

type DatabaseProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_cents: number;
  old_price_cents: number | null;
  category: string;
  category_slug: string;
  image_url: string;
  condition: Product["condition"] | null;
  stock: number;
  is_featured: boolean;
};

function toProduct(product: DatabaseProduct): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price_cents / 100,
    oldPrice:
      product.old_price_cents === null
        ? undefined
        : product.old_price_cents / 100,
    category: product.category,
    categorySlug: product.category_slug,
    image: product.image_url,
    condition: product.condition ?? undefined,
    stock: product.stock,
    featured: product.is_featured,
    rating: 0,
    reviews: 0,
  };
}

function queryProducts(filters?: {
  featured?: boolean;
  slug?: string;
  categorySlug?: string;
  ids?: string[];
}) {
  let query = supabase
    .from("products")
    .select(
      "id, name, slug, description, price_cents, old_price_cents, category, category_slug, image_url, condition, stock, is_featured"
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (filters?.featured) {
    query = query.eq("is_featured", true);
  }

  if (filters?.slug) {
    query = query.eq("slug", filters.slug);
  }

  if (filters?.categorySlug) {
    query = query.eq("category_slug", filters.categorySlug);
  }

  if (filters?.ids) {
    query = query.in("id", filters.ids);
  }

  return query;
}

async function fetchProducts(filters?: {
  featured?: boolean;
  slug?: string;
  categorySlug?: string;
  ids?: string[];
}): Promise<Product[]> {
  const { data, error } = await queryProducts(filters);

  if (error) {
    console.error("Fehler beim Laden der Produkte:", error);
    return [];
  }

  return (data as DatabaseProduct[]).map(toProduct);
}

export async function getProducts(): Promise<Product[]> {
  return fetchProducts();
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return fetchProducts({ categorySlug });
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) {
    return [];
  }

  return fetchProducts({ ids });
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return fetchProducts({ featured: true });
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const { data, error } = await queryProducts({ slug }).maybeSingle();

  if (error) {
    console.error("Fehler beim Laden des Produkts:", error);
    return null;
  }

  return data ? toProduct(data as DatabaseProduct) : null;
}