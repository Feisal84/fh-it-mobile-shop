import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Versand & Lieferung | FH IT & Mobile Handel" },
  description:
    "Informationen zu Versandkosten, Lieferzeiten und Versandarten bei FH IT & Mobile Handel.",
};

export default function ShippingPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Service
        </p>

        <h1 className="mt-3 text-4xl font-black">Versand &amp; Lieferung</h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Wir versenden Ihre Bestellung zuverlässig und so schnell wie
          möglich. Hier finden Sie alle wichtigen Informationen zu
          Versandkosten und Lieferzeiten.
        </p>

        <div className="mt-10 border-y py-8">
          <h2 className="text-xl font-bold">Versandkosten</h2>

          <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-gray-600">
            <li>Versandkostenpauschale: 4,99 € pro Bestellung</li>
            <li>Kostenloser Versand ab einem Bestellwert von 100 €</li>
            <li>Versand ausschließlich innerhalb Deutschlands</li>
          </ul>
        </div>

        <div className="mt-8 border-b py-8">
          <h2 className="text-xl font-bold">Lieferzeit</h2>

          <p className="mt-5 leading-7 text-gray-600">
            Die Lieferzeit beträgt in der Regel 2–4 Werktage nach
            Zahlungseingang. Sobald Ihre Bestellung versendet wurde, erhalten
            Sie eine Versandbestätigung per E-Mail.
          </p>
        </div>

        <p className="mt-8 leading-7 text-gray-600">
          Bei Fragen zu Ihrer Lieferung hilft Ihnen unser Kundenservice gerne
          weiter.
        </p>

        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </div>
  );
}
