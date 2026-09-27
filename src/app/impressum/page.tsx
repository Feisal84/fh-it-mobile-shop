import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Impressum | FH IT & Mobile Handel" },
  description: "Impressum von FH IT & Mobile Handel gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Rechtliches
        </p>

        <h1 className="mt-3 text-4xl font-black">Impressum</h1>

        <div className="mt-8 space-y-6 leading-7 text-gray-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mt-3">
              FH IT &amp; Mobile Handel
              <br />
              Inhaber: Feisal Ibrahim Hussein
              <br />
              Siebenbürger Str. 21
              <br />
              33609 Bielefeld
              <br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Kontakt</h2>
            <p className="mt-3">
              Telefon: +49 1573 0222293
              <br />
              E-Mail: info@fhhandle.de
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-3">
              Feisal Ibrahim Hussein
              <br />
              Siebenbürger Str. 21, 33609 Bielefeld
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              EU-Streitschlichtung
            </h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben. Wir sind nicht bereit
              oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
