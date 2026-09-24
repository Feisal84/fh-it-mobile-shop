import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Service
        </p>

        <h1 className="mt-3 text-4xl font-black">Rückgabe</h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Sie möchten einen Artikel zurückgeben? Kontaktieren Sie uns bitte vor
          der Rücksendung mit Ihrer Bestellnummer.
        </p>

        <div className="mt-10 border-y py-8">
          <h2 className="text-xl font-bold">So funktioniert die Rückgabe</h2>

          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-gray-600">
            <li>Schreiben Sie uns mit Ihrer Bestellnummer und dem Rückgabegrund.</li>
            <li>Wir informieren Sie über die nächsten Schritte zur Rücksendung.</li>
            <li>Nach Eingang und Prüfung der Ware bearbeiten wir Ihre Rückgabe.</li>
          </ol>
        </div>

        <p className="mt-8 leading-7 text-gray-600">
          Bei Fragen zu Ihrer Bestellung hilft Ihnen unser Kundenservice gerne
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