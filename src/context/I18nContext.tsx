"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";

import { isRtl, type Locale } from "../i18n/config";
import type { Dictionary } from "../i18n/get-dictionary";

type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  dir: "ltr" | "rtl";
  /** Prefixes an internal path (e.g. "/shop") with the current locale. */
  localizePath: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const localizePath = useCallback(
    (path: string) => {
      if (!path.startsWith("/")) {
        return path;
      }

      if (path === "/") {
        return `/${locale}`;
      }

      return `/${locale}${path}`;
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        dict,
        dir: isRtl(locale) ? "rtl" : "ltr",
        localizePath,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
