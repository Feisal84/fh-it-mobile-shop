"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";
import type { Product } from "@/src/types/shop";

export function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const matchingProducts = products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()));
  return <><input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" aria-label="Search products" /><ProductGrid products={matchingProducts} /></>;
}