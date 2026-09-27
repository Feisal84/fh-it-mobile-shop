import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Datenschutz | FH IT & Mobile Handel" },
  description: "Datenschutzerklärung von FH IT & Mobile Handel.",
};

export default function DatenschutzPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Rechtliches
        </p>

        <h1 className="mt-3 text-4xl font-black">Datenschutzerklärung</h1>

        <div className="mt-8 space-y-6 leading-7 text-gray-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              1. Verantwortlicher
            </h2>
            <p className="mt-3">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              <br />
              FH IT &amp; Mobile Handel, Feisal Ibrahim Hussein
              <br />
              Siebenbürger Str. 21, 33609 Bielefeld, Deutschland
              <br />
              E-Mail: info@fhhandle.de
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              2. Hosting und Server-Logfiles
            </h2>
            <p className="mt-3">
              Diese Website wird bei einem externen Hosting-Anbieter
              (Vercel Inc.) gehostet. Beim Aufruf der Website werden
              automatisch Informationen wie IP-Adresse, Datum und Uhrzeit der
              Anfrage, Browsertyp und Betriebssystem in sogenannten
              Server-Logfiles erfasst. Diese Daten dienen der Sicherstellung
              eines störungsfreien Betriebs und der Sicherheit unserer
              informationstechnischen Systeme (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              3. Kundenkonto und Bestellungen
            </h2>
            <p className="mt-3">
              Wenn Sie ein Kundenkonto anlegen oder eine Bestellung
              aufgeben, verarbeiten wir die dafür notwendigen Daten (z. B.
              Name, E-Mail-Adresse, Lieferadresse, Bestelldaten) zur
              Vertragsabwicklung (Art. 6 Abs. 1 lit. b DSGVO). Die
              Verwaltung von Kundenkonten erfolgt über den Dienstleister
              Supabase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              4. Zahlungsabwicklung
            </h2>
            <p className="mt-3">
              Zur Abwicklung von Zahlungen setzen wir den Zahlungsdienstleister
              Stripe ein. Die dafür erforderlichen Zahlungsdaten werden direkt
              an Stripe übermittelt und dort gemäß den
              Datenschutzbestimmungen von Stripe verarbeitet (Art. 6 Abs. 1
              lit. b DSGVO).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              5. Ihre Rechte
            </h2>
            <p className="mt-3">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
              Löschung oder Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten sowie ein Recht auf
              Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierzu an
              die oben genannte Kontaktadresse. Ihnen steht zudem ein
              Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
