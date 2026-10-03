import type { Metadata } from "next";
import "../globals.css";

import { AuthProvider } from "../../context/AuthContext";
import { CartProvider } from "../../context/CartContext";
import { FavoritesProvider } from "../../context/FavoritesContext";
import { I18nProvider } from "../../context/I18nContext";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { getDictionary, getLocale } from "../../i18n/get-dictionary";
import { isRtl, locales, ogLocales } from "../../i18n/config";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();

  return {
    metadataBase: new URL("https://fhhandle.de"),
    title: {
      default: dict.metadata.title,
      template: "%s | FH IT & Mobile Handel",
    },
    description: dict.metadata.description,
    keywords: [
      "Smartphones",
      "IT",
      "Elektronik",
      "Handy Zubehör",
      "Refurbished",
      "Bekleidung",
      "FH IT Mobile",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        ar: "/ar",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url: `/${locale}`,
      siteName: dict.metadata.title,
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
    >
      <body>
        <I18nProvider locale={locale} dict={dict}>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <Header />

                <main>{children}</main>

                <Footer />
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}