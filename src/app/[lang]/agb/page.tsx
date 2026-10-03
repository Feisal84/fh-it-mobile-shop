import type { Metadata } from "next";

import { getDictionary, getLocale } from "../../../i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: { absolute: dict.metadata.agbTitle },
    description: dict.metadata.agbDescription,
  };
}

export default async function AgbPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.pages.agb;

  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {t.eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {t.title}
        </h1>

        <div className="mt-8 space-y-6 leading-7 text-gray-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s1heading}
            </h2>
            <p className="mt-3">
              {t.s1body}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s2heading}
            </h2>
            <p className="mt-3">
              {t.s2body}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s3heading}
            </h2>
            <p className="mt-3">
              {t.s3pre}{" "}
              <a href={`/${locale}/shipping`} className="text-blue-600 hover:underline">
                {t.s3link}
              </a>{" "}
              {t.s3post}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s4heading}
            </h2>
            <p className="mt-3">
              {t.s4body}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s5heading}
            </h2>
            <p className="mt-3">
              {t.s5pre}{" "}
              <a href={`/${locale}/widerruf`} className="text-blue-600 hover:underline">
                {t.s5link}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s6heading}
            </h2>
            <p className="mt-3">
              {t.s6body}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s7heading}
            </h2>
            <p className="mt-3">
              {t.s7body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
