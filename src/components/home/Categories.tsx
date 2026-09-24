import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Smartphone,
  Laptop,
  Cpu,
  Headphones,
  Shirt,
  RefreshCw,
} from "lucide-react";

const categories = [
  {
    name: "Smartphones",
    description: "Apple, Samsung & mehr",
    href: "/categories/smartphones",
    image: "/images/categories/smartphones.jpg",
    icon: Smartphone,
  },
  {
    name: "IT & Computer",
    description: "Laptops, PCs & Zubehör",
    href: "/categories/it-computer",
    image: "/images/categories/it-computer.jpg",
    icon: Laptop,
  },
  {
    name: "Elektronik",
    description: "Technik für deinen Alltag",
    href: "/categories/elektronik",
    image: "/images/categories/elektronik.jpg",
    icon: Cpu,
  },
  {
    name: "Handy-Zubehör",
    description: "Cases, Kabel & mehr",
    href: "/categories/handy-zubehoer",
    image: "/images/categories/handy-zubehoer.jpg",
    icon: Headphones,
  },
  {
    name: "Bekleidung",
    description: "Mode für jeden Stil",
    href: "/categories/bekleidung",
    image: "/images/categories/bekleidung.jpg",
    icon: Shirt,
  },
  {
    name: "Refurbished",
    description: "Geprüft & günstiger",
    href: "/categories/refurbished",
    image: "/images/categories/refurbished.jpg",
    icon: RefreshCw,
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-shop">
        {/* SECTION HEADER */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
              Unsere Kategorien
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Entdecke unsere Produkte
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Von Smartphones und Computern bis zu Elektronik,
              Zubehör, Mode und geprüften Refurbished-Produkten.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Alle Produkte
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.href}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-slate-100"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* ICON */}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-blue-600 shadow-lg backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-white/80 sm:text-sm">
                      {category.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-white">
                      Entdecken
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}