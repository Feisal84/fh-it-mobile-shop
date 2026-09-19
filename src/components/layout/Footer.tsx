import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] text-gray-300">

      <div className="container-shop py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-black text-white">
                FH
              </div>

              <div>
                <div className="font-black text-white">
                  FH IT & Mobile
                </div>

                <div className="text-[10px] uppercase tracking-wider text-gray-500">
                  Handel & Bekleidung
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              Ihr Online-Shop für Smartphones, IT,
              Elektronik, Zubehör und Bekleidung.
            </p>

            <div className="mt-5 flex gap-2">
              <button className="rounded-lg bg-white/5 p-2.5 hover:bg-white/10">
                <Share2 size={18} />
              </button>
            </div>

          </div>

          {/* Shop */}
          <div>

            <h3 className="font-bold text-white">
              Shop
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">

              <Link
                href="/shop"
                className="hover:text-white"
              >
                Alle Produkte
              </Link>

              <Link
                href="/categories/smartphones"
                className="hover:text-white"
              >
                Smartphones
              </Link>

              <Link
                href="/categories/it-computer"
                className="hover:text-white"
              >
                IT & Computer
              </Link>

              <Link
                href="/categories/elektronik"
                className="hover:text-white"
              >
                Elektronik
              </Link>

              <Link
                href="/categories/bekleidung"
                className="hover:text-white"
              >
                Bekleidung
              </Link>

              <Link
                href="/categories/refurbished"
                className="text-green-400 hover:text-green-300"
              >
                Refurbished
              </Link>

            </div>
          </div>

          {/* Service */}
          <div>

            <h3 className="font-bold text-white">
              Service
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">

              <Link
                href="/about"
                className="hover:text-white"
              >
                Über uns
              </Link>

              <Link
                href="/contact"
                className="hover:text-white"
              >
                Kontakt
              </Link>

              <Link
                href="/shipping"
                className="hover:text-white"
              >
                Versand & Rückgabe
              </Link>

              <Link
                href="/faq"
                className="hover:text-white"
              >
                FAQ
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>

            <h3 className="font-bold text-white">
              Kontakt
            </h3>

            <div className="mt-5 space-y-4 text-sm">

              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <span>
                  Deutschland
                </span>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <span>
                  E-Mail folgt
                </span>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <span>
                  Telefon folgt
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">

          <span>
            © {new Date().getFullYear()} FH IT & Mobile Handel.
            Alle Rechte vorbehalten.
          </span>

          <div className="flex gap-5">
            <Link href="/impressum">
              Impressum
            </Link>

            <Link href="/datenschutz">
              Datenschutz
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}