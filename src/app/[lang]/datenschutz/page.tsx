import type { Metadata } from "next";

import { getDictionary } from "../../../i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: { absolute: dict.metadata.datenschutzTitle },
    description: dict.metadata.datenschutzDescription,
  };
}

export default async function DatenschutzPage() {
  const dict = await getDictionary();
  const t = dict.pages.datenschutz;

  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {t.eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-black">{t.title}</h1>

        <div className="mt-8 space-y-6 leading-7 text-gray-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.s1heading}
            </h2>
            <p className="mt-3">
              {t.s1pre}
              <br />
              FH IT &amp; Mobile Handel, {dict.common.owner}
              <br />
              Siebenbürger Str. 21, 33609 Bielefeld, {dict.common.country}
              <br />
              E-Mail: info@fhhandle.de
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
              {t.s3body}
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
              {t.s5body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
