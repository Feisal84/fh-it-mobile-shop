import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container-shop py-16">

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Kontakt
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Kontaktieren Sie uns
          </h1>

          <p className="mt-5 text-gray-600">
            Haben Sie Fragen zu unseren Produkten oder
            Ihrer Bestellung? Schreiben Sie uns.
          </p>

          <form
            action="mailto:info@fhhandle.de"
            method="post"
            encType="text/plain"
            className="mt-10 space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="E-Mail-Adresse"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <textarea
              name="message"
              placeholder="Ihre Nachricht"
              rows={6}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Nachricht senden
            </button>

          </form>
        </div>

        <aside className="border-t pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="text-xl font-bold">Direkt erreichen</h2>

          <div className="mt-6 space-y-5 text-sm text-gray-600">
            <div className="flex gap-3">
              <MapPin className="shrink-0 text-blue-600" size={20} />
              <address className="not-italic">
                Siebenbürger Str. 21<br />
                33609 Bielefeld
              </address>
            </div>

            <div className="flex gap-3">
              <Mail className="shrink-0 text-blue-600" size={20} />
              <a href="mailto:info@fhhandle.de" className="hover:text-blue-600">
                info@fhhandle.de
              </a>
            </div>

            <div className="flex gap-3">
              <Phone className="shrink-0 text-blue-600" size={20} />
              <a href="tel:+4915730222293" className="hover:text-blue-600">
                +49 1573 0222293
              </a>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
}