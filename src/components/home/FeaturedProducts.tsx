import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { products } from "../../data/products";
import ProductGrid from "../../components/products/ProductGrid";

export default function FeaturedProducts() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="bg-gray-50 py-20">

      <div className="container-shop">

        <div className="mb-10 flex items-end justify-between gap-6">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              Für dich ausgewählt
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Beliebte Produkte
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Entdecke unsere aktuellen Angebote und
              beliebten Produkte.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden items-center gap-2 font-semibold text-blue-600 sm:flex"
          >
            Zum Shop
            <ArrowRight size={18} />
          </Link>

        </div>

        <ProductGrid products={featuredProducts} />

      </div>
    </section>
  );
}