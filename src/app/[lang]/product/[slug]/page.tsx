import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug } from "../../../../lib/products";
import { ProductDetail } from "../../../../components/products/ProductDetail";
import { getLocale } from "../../../../i18n/get-dictionary";

export const revalidate = 300;

type ProductPageParams = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/${locale}/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageParams) {
  const { slug } = await params;
  const locale = await getLocale();

  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail product={product} />
  );
}