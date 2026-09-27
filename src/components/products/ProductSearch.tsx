"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import ProductGrid from "./ProductGrid";
import type { Product } from "../../types/product";

export default function ProductSearch({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const categories = [
    "Alle",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];
  const filteredProducts = products.filter((product) => {
    const searchText = `${product.name} ${product.description}`.toLowerCase();
    return (
      searchText.includes(search.toLowerCase()) &&
      (category === "Alle" || product.category === category)
    );
  });

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Produkte suchen..."
            aria-label="Produkte suchen"
            className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Kategorie auswählen"
          className="rounded-xl border bg-white px-5 py-3 outline-none focus:border-blue-500"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-6 text-sm text-gray-500">
        {filteredProducts.length} Produkte
      </p>
      <ProductGrid products={filteredProducts} />
    </>
  );
}