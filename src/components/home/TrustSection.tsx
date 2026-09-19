import {
  Headphones,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Schneller Versand",
    text: "Wir versenden Ihre Bestellung zuverlässig.",
  },
  {
    icon: ShieldCheck,
    title: "Sicher einkaufen",
    text: "Ihre Bestellung wird sicher abgewickelt.",
  },
  {
    icon: RotateCcw,
    title: "Faire Rückgabe",
    text: "Klare Informationen zu Rückgabe und Service.",
  },
  {
    icon: Headphones,
    title: "Kundenservice",
    text: "Wir helfen Ihnen bei Fragen gerne weiter.",
  },
];

export default function TrustSection() {
  return (
    <section className="border-y bg-white py-14">
      <div className="container-shop">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {benefit.text}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}