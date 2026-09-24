import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fhhandle.de"),
  title: {
    default: "FH IT & Mobile Handel",
    template: "%s | FH IT & Mobile Handel",
  },

  description:
    "FH IT & Mobile Handel – Smartphones, IT, Elektronik, Handy-Zubehör, Refurbished und Bekleidung.",

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
    canonical: "/",
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
    locale: "de_DE",
    url: "/",
    siteName: "FH IT & Mobile Handel",
    title: "FH IT & Mobile Handel",
    description:
      "Smartphones, IT, Elektronik, Handy-Zubehör, Refurbished und Bekleidung.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <FavoritesProvider>
            <Header />

            <main>{children}</main>

            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}