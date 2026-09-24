import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { categories } from "../../../data/categories";
import { getProductsByCategory } from "../../../data/products";
import ProductGrid from "../../../components/products/ProductGrid";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const categoryProducts =
    getProductsByCategory(slug);

  return (
    <div className="container-shop py-12">

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Kategorie
        </p>

        <h1 className="mt-2 text-4xl font-black">
          {category.name}
        </h1>

        <p className="mt-3 max-w-2xl text-gray-500">
          {category.description}
        </p>
      </div>

      <ProductGrid products={categoryProducts} />

    </div>
  );
}