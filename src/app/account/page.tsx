import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Kundenservice
        </p>
        <h1 className="mt-3 text-4xl font-black">Mein Konto</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Ein Kundenkonto mit Anmeldung und Bestelluebersicht wird derzeit
          vorbereitet. Bei Fragen zu einer Bestellung hilft Ihnen unser
          Kundenservice weiter.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Kundenservice kontaktieren
        </Link>
      </div>
    </div>
  );
}