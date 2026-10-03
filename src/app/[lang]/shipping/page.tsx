import Link from "next/link";
import type { Metadata } from "next";

import { getDictionary, getLocale } from "../../../i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: { absolute: dict.metadata.shippingTitle },
    description: dict.metadata.shippingDescription,
  };
}

export default async function ShippingPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.pages.shipping;

  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {t.eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-black">{t.title}</h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          {t.intro}
        </p>

        <div className="mt-10 border-y py-8">
          <h2 className="text-xl font-bold">{t.costsTitle}</h2>

          <ul className="mt-5 list-disc space-y-3 ps-5 leading-7 text-gray-600">
            {t.costs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-b py-8">
          <h2 className="text-xl font-bold">{t.deliveryTitle}</h2>

          <p className="mt-5 leading-7 text-gray-600">
            {t.deliveryText}
          </p>
        </div>

        <p className="mt-8 leading-7 text-gray-600">
          {t.helpText}
        </p>

        <Link
          href={`/${locale}/contact`}
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          {dict.common.contactCta}
        </Link>
      </div>
    </div>
  );
}
