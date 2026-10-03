import {
  Headphones,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import { getDictionary } from "../../i18n/get-dictionary";

const icons = [Truck, ShieldCheck, RotateCcw, Headphones];

export default async function TrustSection() {
  const dict = await getDictionary();
  const benefits = dict.home.trust.items.map((benefit, index) => ({
    ...benefit,
    icon: icons[index % icons.length],
  }));

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