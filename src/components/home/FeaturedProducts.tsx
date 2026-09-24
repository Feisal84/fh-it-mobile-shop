import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductGrid from "../products/ProductGrid";
import { getFeaturedProducts } from "../../lib/products";

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container-shop">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
              Unsere Empfehlungen
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Beliebte Produkte
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Entdecke ausgewählte Produkte aus unserem Sortiment.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Alle Produkte
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* PRODUCTS */}
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-semibold text-slate-700">
              Produkte werden bald verfügbar sein.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Wir bauen gerade unser Sortiment für dich auf.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}