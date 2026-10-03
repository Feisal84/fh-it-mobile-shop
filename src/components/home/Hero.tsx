import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { getDictionary, getLocale } from "../../i18n/get-dictionary";

export default async function Hero() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.home.hero;

  return (
    <section className="relative overflow-hidden bg-[#0B1220]">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute -end-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -start-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container-shop relative">
        <div className="grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              {t.badge}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.title1}
              <br />
              <span className="text-blue-500">{t.title2}</span>
              <br />
              {t.title3}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
              {t.subtitle}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/shop`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                {t.ctaShop}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>

              <Link
                href={`/${locale}/categories/refurbished`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:border-blue-500 hover:bg-blue-500/10"
              >
                {t.ctaRefurbished}
              </Link>
            </div>

            {/* BENEFITS */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-medium text-slate-300">
                  {t.benefitShipping}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-medium text-slate-300">
                  {t.benefitSecure}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-medium text-slate-300">
                  {t.benefitReturns}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
              <Image
                src="/fh-it-mobile-shop.png"
                alt={t.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent" />

              {/* FLOATING CARD */}
              <div className="absolute bottom-5 start-5 end-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:start-6 sm:end-6 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-blue-300">
                      {t.cardEyebrow}
                    </p>

                    <p className="mt-1 text-sm font-bold text-white sm:text-base">
                      {t.cardTitle}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* SMALL DECORATIVE CARD */}
            <div className="absolute -bottom-5 -start-3 hidden rounded-2xl border border-slate-700 bg-white p-4 shadow-xl sm:block">
              <p className="text-xs font-medium text-slate-500">
                {t.discoverNow}
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {t.ourOffers}
              </p>
            </div>

            {/* BLUE DECORATION */}
            <div className="absolute -end-3 -top-3 h-20 w-20 rounded-2xl bg-blue-600/90 shadow-xl shadow-blue-600/20" />
          </div>
        </div>
      </div>
    </section>
  );
}