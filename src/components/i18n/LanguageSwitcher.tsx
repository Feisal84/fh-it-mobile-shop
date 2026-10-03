"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";

import { useI18n } from "../../context/I18nContext";
import { isLocale, localeNames, locales } from "../../i18n/config";

export default function LanguageSwitcher() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Strip the current locale prefix to get the locale-neutral path.
  const segments = pathname.split("/").filter(Boolean);
  const pathWithoutLocale =
    segments.length > 0 && isLocale(segments[0])
      ? `/${segments.slice(1).join("/")}`
      : pathname;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={dict.language.switchLabel}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 items-center gap-1.5 rounded-lg px-2 text-slate-700 hover:bg-slate-100"
      >
        <Globe className="h-5 w-5" />
        <span className="hidden text-sm font-semibold uppercase sm:inline">
          {locale}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
          {locales.map((item) => (
            <Link
              key={item}
              href={`/${item}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-slate-50 ${
                item === locale
                  ? "font-bold text-blue-600"
                  : "font-medium text-slate-700"
              }`}
            >
              {localeNames[item]}
              {item === locale && <Check className="h-4 w-4" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
