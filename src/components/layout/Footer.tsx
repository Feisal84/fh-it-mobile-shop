import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  ThumbsUp,
} from "lucide-react";

const shopLinks = [
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Smartphones",
    href: "/categories/smartphones",
  },
  {
    label: "IT & Computer",
    href: "/categories/it-computer",
  },
  {
    label: "Elektronik",
    href: "/categories/elektronik",
  },
  {
    label: "Handy-Zubehör",
    href: "/categories/handy-zubehoer",
  },
  {
    label: "Bekleidung",
    href: "/categories/bekleidung",
  },
  {
    label: "Refurbished",
    href: "/categories/refurbished",
  },
];

const serviceLinks = [
  {
    label: "Über uns",
    href: "/about",
  },
  {
    label: "Kontakt",
    href: "/contact",
  },
  {
    label: "Versand & Lieferung",
    href: "/shipping",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Rückgabe",
    href: "/returns",
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0B1220] text-white">
      {/* MAIN FOOTER */}
      <div className="container-shop py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center"
              aria-label="FH IT & Mobile Handel"
            >
              <div className="rounded-xl bg-white px-4 py-3">
                <Image
                  src="/logo.svg"
                  alt="FH IT & Mobile Handel"
                  width={250}
                  height={67}
                  className="h-auto w-[210px]"
                />
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-slate-300">
              Technik, Mobile, IT, Elektronik und Bekleidung –
              zuverlässig, modern und zu fairen Preisen.
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Inhaber:{" "}
              <span className="font-medium text-slate-200">
                Feisal Ibrahim Hussein
              </span>
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <Camera className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <ThumbsUp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Shop
            </h3>

            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICE */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Service
            </h3>

            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-slate-300 transition hover:text-blue-400"
                >
                  Impressum
                </Link>
              </li>

              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-slate-300 transition hover:text-blue-400"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Kontakt
            </h3>

            <div className="space-y-4">
              {/* ADDRESS */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

                <div className="text-sm leading-6 text-slate-300">
                  <p className="font-medium text-white">
                    FH IT & Mobile Handel
                  </p>

                  <p>Siebenbürger Str. 21</p>
                  <p>33609 Bielefeld</p>
                  <p>Deutschland</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-blue-400" />

                <a
                  href="tel:+4915730222293"
                  className="text-sm text-slate-300 transition hover:text-blue-400"
                >
                  +49 1573 0222293
                </a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-blue-400" />

                <a
                  href="mailto:info@fhhandle.de"
                  className="break-all text-sm text-slate-300 transition hover:text-blue-400"
                >
                  info@fhhandle.de
                </a>
              </div>
            </div>

            {/* CUSTOMER SERVICE BOX */}
            <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <p className="text-sm font-semibold text-white">
                Persönlicher Kundenservice
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Bei Fragen zu Produkten, Bestellungen oder
                Lieferungen kannst du uns gerne kontaktieren.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800">
        <div className="container-shop flex flex-col gap-3 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} FH IT & Mobile Handel.
            Alle Rechte vorbehalten.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/impressum"
              className="hover:text-white"
            >
              Impressum
            </Link>

            <Link
              href="/datenschutz"
              className="hover:text-white"
            >
              Datenschutz
            </Link>

            <Link
              href="/agb"
              className="hover:text-white"
            >
              AGB
            </Link>

            <Link
              href="/widerruf"
              className="hover:text-white"
            >
              Widerruf
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}