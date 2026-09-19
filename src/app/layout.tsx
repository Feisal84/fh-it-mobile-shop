import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "../context/CartContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <CartProvider>
          <Header />

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}