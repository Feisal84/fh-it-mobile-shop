import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#0b1220] text-white">

      <div className="container-shop">

        <div className="grid min-h-[600px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Left */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Willkommen bei FH IT & Mobile
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Technik,
              <span className="text-blue-500"> Mobile</span>
              <br />
              & Mode.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-300 md:text-xl">
              Smartphones, IT-Produkte, Elektronik,
              Zubehör und Bekleidung – entdecken Sie
              unser Sortiment online.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                Jetzt einkaufen
                <ArrowRight size={19} />
              </Link>

              <Link
                href="/categories/refurbished"
                className="inline-flex items-center rounded-xl border border-gray-700 px-7 py-4 font-bold hover:bg-white/5"
              >
                Refurbished
              </Link>

            </div>

            {/* Benefits */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">

              <div className="flex items-center gap-3">
                <Truck className="text-blue-400" size={21} />
                <div>
                  <div className="text-sm font-bold">
                    Schneller Versand
                  </div>
                  <div className="text-xs text-gray-500">
                    Deutschlandweit
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-400" size={21} />
                <div>
                  <div className="text-sm font-bold">
                    Sicher einkaufen
                  </div>
                  <div className="text-xs text-gray-500">
                    Geschützter Einkauf
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-400" size={21} />
                <div>
                  <div className="text-sm font-bold">
                    Geprüfte Produkte
                  </div>
                  <div className="text-xs text-gray-500">
                    Qualität im Fokus
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden h-[500px] lg:block">

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/30 blur-3xl" />

            {/* Main device */}
            <div className="absolute left-1/2 top-1/2 flex h-[360px] w-[220px] -translate-x-1/2 -translate-y-1/2 rotate-6 items-center justify-center rounded-[40px] border-8 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-950 shadow-2xl">

              <div className="flex h-full w-full items-center justify-center rounded-[32px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900">
                <span className="text-8xl">📱</span>
              </div>

            </div>

            {/* Laptop card */}
            <div className="absolute bottom-6 left-0 rounded-2xl border border-gray-700 bg-gray-900/95 p-5 shadow-2xl backdrop-blur">
              <div className="text-5xl">💻</div>

              <div className="mt-3">
                <div className="text-sm font-bold">
                  IT & Computer
                </div>
                <div className="text-xs text-gray-500">
                  Für Arbeit & Alltag
                </div>
              </div>
            </div>

            {/* Clothing card */}
            <div className="absolute right-0 top-10 rounded-2xl border border-gray-700 bg-gray-900/95 p-5 shadow-2xl backdrop-blur">
              <div className="text-5xl">👕</div>

              <div className="mt-3">
                <div className="text-sm font-bold">
                  Bekleidung
                </div>
                <div className="text-xs text-gray-500">
                  FH Collection
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}