export default function ContactPage() {
  return (
    <div className="container-shop py-16">

      <div className="max-w-2xl">

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

        <form className="mt-10 space-y-5">

          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="E-Mail-Adresse"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Ihre Nachricht"
            rows={6}
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

    </div>
  );
}