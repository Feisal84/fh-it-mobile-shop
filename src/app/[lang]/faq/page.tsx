import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary, getLocale } from "../../../i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: { absolute: dict.metadata.faqTitle },
    description: dict.metadata.faqDescription,
  };
}

export default async function FaqPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.pages.faq;

  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {t.eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-black">{t.title}</h1>

        <div className="mt-10 divide-y border-y">
          {t.items.map((faq) => (
            <div key={faq.question} className="py-6">
              <h2 className="text-lg font-bold text-gray-900">
                {faq.question}
              </h2>
              <p className="mt-3 leading-7 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 leading-7 text-gray-600">
          {t.notFound}
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
