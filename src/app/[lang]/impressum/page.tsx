import type { Metadata } from "next";

import { getDictionary } from "../../../i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: { absolute: dict.metadata.impressumTitle },
    description: dict.metadata.impressumDescription,
  };
}

export default async function ImpressumPage() {
  const dict = await getDictionary();
  const t = dict.pages.impressum;

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
              {t.legalHeading}
            </h2>
            <p className="mt-3">
              FH IT &amp; Mobile Handel
              <br />
              {dict.footer.ownerLabel} {dict.common.owner}
              <br />
              Siebenbürger Str. 21
              <br />
              33609 Bielefeld
              <br />
              {dict.common.country}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">{t.contactHeading}</h2>
            <p className="mt-3">
              Telefon: +49 1573 0222293
              <br />
              E-Mail: info@fhhandle.de
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.responsibleHeading}
            </h2>
            <p className="mt-3">
              {dict.common.owner}
              <br />
              Siebenbürger Str. 21, 33609 Bielefeld
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t.euHeading}
            </h2>
            <p className="mt-3">{t.euText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
