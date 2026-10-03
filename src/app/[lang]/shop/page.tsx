import type { Metadata } from "next";
import Link from "next/link";

import ProductGrid from "../../../components/products/ProductGrid";
import { getProducts } from "../../../lib/products";
import { getDictionary, getLocale } from "../../../i18n/get-dictionary";
import { formatMessage } from "../../../lib/localization";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: { absolute: dict.metadata.shopTitle },
    description: dict.metadata.shopDescription,
  };
}

export default async function ShopPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const products = await getProducts(locale);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container-shop py-10 md:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              FH IT &amp; Mobile Handel
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {dict.shop.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              {dict.shop.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="container-shop py-10 md:py-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {dict.shop.allProducts}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {formatMessage(
                products.length === 1
                  ? dict.shop.productCount_one
                  : dict.shop.productCount_other,
                { count: products.length }
              )}
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto max-w-md">
              <h2 className="text-xl font-semibold text-slate-900">
                {dict.shop.emptyTitle}
              </h2>
              <p className="mt-3 text-slate-600">
                {dict.shop.emptyText}
              </p>
              <Link
                href={`/${locale}`}
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {dict.common.toHome}
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}