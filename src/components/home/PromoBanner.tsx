import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-20">

      <div className="container-shop">

        <div className="relative overflow-hidden rounded-3xl bg-[#0b1220] px-8 py-14 text-white md:px-14">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

          <div className="relative max-w-2xl">

            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles size={19} />

              <span className="text-sm font-bold uppercase tracking-wider">
                Refurbished & nachhaltig
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Gute Technik muss nicht immer neu sein.
            </h2>

            <p className="mt-4 leading-7 text-gray-300">
              Entdecke geprüfte und aufbereitete Produkte
              zu attraktiven Preisen.
            </p>

            <Link
              href="/categories/refurbished"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold hover:bg-blue-700"
            >
              Refurbished entdecken
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}