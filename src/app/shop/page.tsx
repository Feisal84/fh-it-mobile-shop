"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { products } from "../../data/products";
import ProductGrid from "../../components/products/ProductGrid";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");

  const categories = [
    "Alle",
    ...Array.from(
      new Set(products.map((product) => product.category))
    ),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "Alle" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="container-shop py-12">

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          FH Shop
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Alle Produkte
        </h1>
      </div>

      <div className="mb-10 flex flex-col gap-4 md:flex-row">

        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Produkte suchen..."
            className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="rounded-xl border bg-white px-5 py-3 outline-none focus:border-blue-500"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

      </div>

      <p className="mb-6 text-sm text-gray-500">
        {filteredProducts.length} Produkte
      </p>

      <ProductGrid products={filteredProducts} />

    </div>
  );
}