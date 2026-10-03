import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductGrid from "../products/ProductGrid";
import { getFeaturedProducts } from "../../lib/products";
import { getDictionary, getLocale } from "../../i18n/get-dictionary";

export default async function FeaturedProducts() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.home.featured;
  const featuredProducts = await getFeaturedProducts(locale);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container-shop">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
              {t.eyebrow}
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.title}
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              {t.subtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            {dict.common.allProducts}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>

        {/* PRODUCTS */}
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-semibold text-slate-700">
              {t.emptyTitle}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {t.emptyText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}