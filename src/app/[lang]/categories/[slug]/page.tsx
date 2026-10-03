import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { categories } from "../../../../data/categories";
import ProductGrid from "../../../../components/products/ProductGrid";
import { getProductsByCategory } from "../../../../lib/products";
import { getDictionary, getLocale } from "../../../../i18n/get-dictionary";

export const revalidate = 300;

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

type CategoryPageParams = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  const translated =
    dict.categories[category.slug as keyof typeof dict.categories];

  return {
    title: translated?.name ?? category.name,
    description: translated?.description ?? category.description,
    alternates: {
      canonical: `/${locale}/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageParams) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary();

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const translated =
    dict.categories[category.slug as keyof typeof dict.categories];
  const categoryProducts = await getProductsByCategory(slug, locale);

  return (
    <div className="container-shop py-12">

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {dict.categoryPage.eyebrow}
        </p>

        <h1 className="mt-2 text-4xl font-black">
          {translated?.name ?? category.name}
        </h1>

        <p className="mt-3 max-w-2xl text-gray-500">
          {translated?.description ?? category.description}
        </p>
      </div>

      <ProductGrid products={categoryProducts} />

    </div>
  );
}