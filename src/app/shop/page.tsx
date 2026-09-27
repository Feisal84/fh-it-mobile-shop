import type { Metadata } from "next";
import Link from "next/link";

import ProductGrid from "../../components/products/ProductGrid";
import { getProducts } from "../../lib/products";

export const metadata: Metadata = {
  title: { absolute: "Shop | FH IT & Mobile Handel" },
  description:
    "IT, Smartphones, Elektronik, Handy-Zubehör, Refurbished-Produkte und Bekleidung bei FH IT & Mobile Handel.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container-shop py-10 md:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              FH IT &amp; Mobile Handel
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Unser Shop
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              Entdecke unsere Auswahl an Smartphones, IT-Produkten,
              Elektronik, Handy-Zubehör, Refurbished-Produkten und
              Bekleidung.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shop py-10 md:py-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Alle Produkte
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {products.length} {products.length === 1 ? "Produkt" : "Produkte"}
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto max-w-md">
              <h2 className="text-xl font-semibold text-slate-900">
                Aktuell keine Produkte verfügbar
              </h2>
              <p className="mt-3 text-slate-600">
                Zurzeit sind keine aktiven Produkte in unserem Sortiment
                vorhanden.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}