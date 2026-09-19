import Link from "next/link";
import {
  ArrowRight,
  Laptop,
  Smartphone,
  Headphones,
  Cable,
  Shirt,
  RefreshCcw,
} from "lucide-react";

const categories = [
  {
    name: "Smartphones",
    slug: "smartphones",
    description: "Apple, Samsung & mehr",
    icon: Smartphone,
  },
  {
    name: "IT & Computer",
    slug: "it-computer",
    description: "Laptops, PCs & Hardware",
    icon: Laptop,
  },
  {
    name: "Elektronik",
    slug: "elektronik",
    description: "Audio & Unterhaltung",
    icon: Headphones,
  },
  {
    name: "Handy-Zubehör",
    slug: "handy-zubehoer",
    description: "Cases, Kabel & Ladegeräte",
    icon: Cable,
  },
  {
    name: "Bekleidung",
    slug: "bekleidung",
    description: "Mode für jeden Tag",
    icon: Shirt,
  },
  {
    name: "Refurbished",
    slug: "refurbished",
    description: "Geprüft & aufbereitet",
    icon: RefreshCcw,
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20">

      <div className="container-shop">

        <div className="mb-10 flex items-end justify-between gap-6">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              Kategorien
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Entdecke unser Sortiment
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Von Smartphones und IT bis hin zu
              Elektronik, Zubehör und Bekleidung.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden items-center gap-2 font-semibold text-blue-600 sm:flex"
          >
            Alle Produkte
            <ArrowRight size={18} />
          </Link>

        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shop-shadow shop-shadow-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 font-bold">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Entdecken
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}