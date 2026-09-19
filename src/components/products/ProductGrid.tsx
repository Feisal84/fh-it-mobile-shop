import { Product } from "../../types/shop";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border bg-gray-50 py-20 text-center">
        <h3 className="text-xl font-bold">
          Keine Produkte gefunden
        </h3>

        <p className="mt-2 text-gray-500">
          Bitte versuche eine andere Suche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}