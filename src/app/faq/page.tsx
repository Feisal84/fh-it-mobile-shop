import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "FAQ | FH IT & Mobile Handel" },
  description: "Häufig gestellte Fragen zu Bestellung, Versand und Rückgabe bei FH IT & Mobile Handel.",
};

const faqs = [
  {
    question: "Welche Zahlungsmethoden bietet ihr an?",
    answer:
      "Die Bezahlung erfolgt sicher über unseren Zahlungsdienstleister Stripe mit den im Bestellprozess angezeigten Zahlungsarten.",
  },
  {
    question: "Wie lange dauert der Versand?",
    answer:
      "Die Lieferzeit beträgt in der Regel 2–4 Werktage nach Zahlungseingang. Details finden Sie auf der Seite Versand & Lieferung.",
  },
  {
    question: "Kann ich einen Artikel zurückgeben?",
    answer:
      "Ja, im Rahmen unseres gesetzlichen Widerrufsrechts können Sie Artikel innerhalb von 14 Tagen zurücksenden. Details finden Sie auf der Rückgabe-Seite.",
  },
  {
    question: "Wie kann ich euch erreichen?",
    answer:
      "Über unser Kontaktformular, per E-Mail an info@fhhandle.de oder telefonisch unter +49 1573 0222293.",
  },
  {
    question: "Sind die Refurbished-Produkte geprüft?",
    answer:
      "Ja, alle Refurbished-Produkte werden vor dem Verkauf technisch geprüft und funktionstüchtig ausgeliefert.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Service
        </p>

        <h1 className="mt-3 text-4xl font-black">Häufig gestellte Fragen</h1>

        <div className="mt-10 divide-y border-y">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h2 className="text-lg font-bold text-gray-900">
                {faq.question}
              </h2>
              <p className="mt-3 leading-7 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 leading-7 text-gray-600">
          Ihre Frage war nicht dabei? Kontaktieren Sie uns gerne direkt.
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
