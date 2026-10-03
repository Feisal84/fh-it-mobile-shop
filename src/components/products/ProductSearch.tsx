"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import ProductGrid from "./ProductGrid";
import type { Product } from "../../types/product";
import { useI18n } from "../../context/I18nContext";
import {
  formatMessage,
  localizedCategoryName,
} from "../../lib/localization";

export default function ProductSearch({ products }: { products: Product[] }) {
  const { dict } = useI18n();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categorySlugs = Array.from(
    new Set(products.map((product) => product.categorySlug))
  );

  const filteredProducts = products.filter((product) => {
    const searchText = `${product.name} ${product.description}`.toLowerCase();
    return (
      searchText.includes(search.toLowerCase()) &&
      (category === "all" || product.categorySlug === category)
    );
  });

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={dict.product.searchPlaceholder}
            aria-label={dict.product.searchAria}
            className="w-full rounded-xl border bg-white py-3 ps-12 pe-4 outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label={dict.product.categoryAria}
          className="rounded-xl border bg-white px-5 py-3 outline-none focus:border-blue-500"
        >
          <option value="all">{dict.product.allCategories}</option>
          {categorySlugs.map((slug) => (
            <option key={slug} value={slug}>
              {localizedCategoryName(slug, dict)}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-6 text-sm text-gray-500">
        {formatMessage(dict.product.productsCount, {
          count: filteredProducts.length,
        })}
      </p>
      <ProductGrid products={filteredProducts} />
    </>
  );
}