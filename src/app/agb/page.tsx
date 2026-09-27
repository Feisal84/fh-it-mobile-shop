import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "AGB | FH IT & Mobile Handel" },
  description: "Allgemeine Geschäftsbedingungen von FH IT & Mobile Handel.",
};

export default function AgbPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Rechtliches
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Allgemeine Geschäftsbedingungen
        </h1>

        <div className="mt-8 space-y-6 leading-7 text-gray-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              1. Geltungsbereich
            </h2>
            <p className="mt-3">
              Diese Allgemeinen Geschäftsbedingungen gelten für alle
              Bestellungen, die Sie über den Onlineshop von FH IT &amp;
              Mobile Handel, Feisal Ibrahim Hussein, Siebenbürger Str. 21,
              33609 Bielefeld, tätigen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              2. Vertragsschluss
            </h2>
            <p className="mt-3">
              Die Darstellung der Produkte im Shop stellt kein rechtlich
              bindendes Angebot dar, sondern eine Aufforderung zur
              Bestellung. Mit dem Absenden der Bestellung geben Sie ein
              verbindliches Angebot zum Kauf ab. Der Kaufvertrag kommt durch
              unsere Bestätigung bzw. den Versand der Ware zustande.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              3. Preise und Versandkosten
            </h2>
            <p className="mt-3">
              Alle Preise verstehen sich inklusive der gesetzlichen
              Mehrwertsteuer. Zusätzlich anfallende Versandkosten werden im
              Bestellprozess sowie auf der Seite{" "}
              <a href="/shipping" className="text-blue-600 hover:underline">
                Versand &amp; Lieferung
              </a>{" "}
              ausgewiesen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              4. Zahlung
            </h2>
            <p className="mt-3">
              Die Zahlung erfolgt über die im Bestellprozess angebotenen
              Zahlungsarten, abgewickelt über unseren Zahlungsdienstleister
              Stripe.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              5. Widerrufsrecht
            </h2>
            <p className="mt-3">
              Als Verbraucher steht Ihnen ein gesetzliches Widerrufsrecht zu.
              Einzelheiten entnehmen Sie bitte unserer{" "}
              <a href="/widerruf" className="text-blue-600 hover:underline">
                Widerrufsbelehrung
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              6. Eigentumsvorbehalt
            </h2>
            <p className="mt-3">
              Die gelieferte Ware bleibt bis zur vollständigen Bezahlung
              unser Eigentum.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              7. Schlussbestimmungen
            </h2>
            <p className="mt-3">
              Es gilt das Recht der Bundesrepublik Deutschland unter
              Ausschluss des UN-Kaufrechts. Sollten einzelne Bestimmungen
              dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen
              Bestimmungen unberührt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
